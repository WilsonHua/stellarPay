/**
 * Created by huazhenghao on 2016/10/4.
 */
var express = require("express");
var router = express.Router();

var responseData;
var StellarSdk = require('stellar-sdk')
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');


router.use(function(req,res,next){
    responseData = {
        code:0,
        message:'',
        value:''
    };
    next();
});

//账户
var sourceKeys ='',sourceAccount='';


router.post('/kInfo',function (req,res) {
        sourceKeys = StellarSdk.Keypair.fromSeed(req.body.Keypair);
        sourceAccount = sourceKeys.accountId();
        console.log("账户"+sourceAccount+"登录成功");

        responseData.code = 1;
        res.json(responseData);
});

// *****************
// ************
// creat account
// ************
// *****************
router.get('/create',function (req,res) {
  var pair = StellarSdk.Keypair.random();
  var Account = {
    public_key:pair.accountId(),
    seed:pair.seed()
  };
  responseData.code = 1;
  responseData.value = Account;

  res.json(responseData);
});

// *****************
// ************
// add Trust
// ************
// *****************

router.post('/changeTrust',function (req,res) {
  var anchor_accountId =  req.body.asset_issuer,
      asset_type = req.body.asset_code,
      limit = req.body.limit;

  // Create an object to represent the new asset
  var new_asset = new StellarSdk.Asset(asset_type, anchor_accountId);

  // First, the receiving account must trust the asset
    server.loadAccount(sourceAccount)
      .then(function(receiver) {
          var transaction = new StellarSdk.TransactionBuilder(receiver)
          // The `changeTrust` operation creates (or alters) a trustline
          // The `limit` parameter below is optional
              .addOperation(StellarSdk.Operation.changeTrust({
                  asset: new_asset,
                  limit: limit
              }))
              .build();
          transaction.sign(sourceKeys);
          return server.submitTransaction(transaction);
      })
      .then(function (result) {
        responseData.code = 1;
        responseData.message = result;
        res.json(responseData);
      });
});

// *****************
// ************
// Payment
// ************
// *****************

router.get('/loadAccount',function (req,res) {
  server.loadAccount(sourceAccount).then(function(account) {
    responseData.code = 1;
    responseData.message = '成功';
    responseData.value = account;
    res.json(responseData);
  });
});

// *****************
// ************
// Payment
// ************
// *****************

router.post('/payment',function (req,res) {

  var destinationId = req.body.address,
      amount = req.body.amount,
      new_asset = new StellarSdk.Asset( req.body.asset_code, req.body.asset_issuer ),
      amount_type = req.body.asset_code ==='XLM'? StellarSdk.Asset.native():new_asset,
      memo = req.body.memo;

  // First, check to make sure that the destination account exists.
  // You could skip this, but if the account does not exist, you will be charged
  // the transaction fee when the transaction fails.
  server.loadAccount(destinationId)
  // If the account is not found, surface a nicer error message for logging.
  .catch(StellarSdk.NotFoundError, function (error) {
      throw new Error('对方账户地址不存在');
      responseData.code = 102;
      responseData.message = '对方账户地址不存在';
      responseData.value = error;
      res.json(responseData);
  })
  .then(function() {
    console.log(sourceKeys.accountId())
        return server.loadAccount(sourceKeys.accountId());
  })
  .then(function(inAccount) {
      console.log("账户地址：..............."+inAccount)
      // Start building the transaction.
      var transaction = new StellarSdk.TransactionBuilder(inAccount)
        .addOperation(StellarSdk.Operation.payment({
          destination: destinationId,
          // Because Stellar allows transaction in many currencies, you must
          // specify the asset type. The special "native" asset represents Lumens.
          asset: amount_type,
          amount: amount
      }))
      // A memo allows you to add your own metadata to a transaction. It's
      // optional and does not affect how Stellar treats the transaction.
      .addMemo(StellarSdk.Memo.text(memo))
      .build();
      // Sign the transaction to prove you are actually the person sending it.
      transaction.sign(sourceKeys);
      // And finally, send it off to Stellar!
      return server.submitTransaction(transaction);
  })
  .then(function(result) {
    responseData.code = 1;
    responseData.message = '成功';
    responseData.value = result;
    res.json(responseData);
  })
  .catch(function(error) {
    responseData.code = 101;
    responseData.message = error;
    responseData.value = error.detail;
    console.log("错误信息:"+error)
    res.json(responseData);
  });

});

module.exports = router;
