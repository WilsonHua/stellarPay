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
var sourceKeys ='',sourceAcoount='';


router.post('/kInfo',function (req,res) {
        sourceKeys = req.body.Keypair;
        sourceAcoount = StellarSdk.Keypair.fromSeed(sourceKeys).accountId();
        console.log('sourceKeys'+sourceKeys);

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

  // SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7
  // GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB
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
    server.loadAccount(sourceAcoount)
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
  console.log("私钥"+sourceKeys);
  console.log("公钥"+sourceAcoount);

  server.loadAccount(sourceAcoount).then(function(account) {
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

  // var destinationId = 'GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OARMDUYEJ5';

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
      throw new Error('The destination account does not exist!');
      responseData.code = 102;
      responseData.message = 'The destination account does not exist!';
      responseData.value = error;
      res.json(responseData);
  })
  // If there was no error, load up-to-date information on your account.
  .then(function() {
      return server.loadAccount(sourceKeys.accountId());
  })
  .then(function(sourceAccount) {
      // Start building the transaction.
      var transaction = new StellarSdk.TransactionBuilder(sourceAccount)
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
    res.json(responseData);
  });

});
// router.get('/account_balance',function (req,res) {
// 	var accountId = 'GBS7IAXICCZ62XLYKVFDYG7TLLIARICSWF47QJKRNMUOZVBP24D47X4B';
// 	// the JS SDK uses promises for most actions, such as retrieving an account
// 	server.loadAccount(accountId).then(function(account) {
// 	  	  responseData.code = 1;
//         responseData.message = '成功';
//         responseData.value = account.balances;
//         res.json(responseData);
// 	});
// });

// router.get('/stream_effects',function (req,res) {
//   console.log(sourceAcoount)
//   var payments = server.payments().forAccount(sourceAcoount);
//   payments.stream({
//       onmessage: function(payment) {
//           // Record the paging token so we can start from here next time.
//           // savePagingToken(payment.paging_token);
//
//           // The payments stream includes both sent and received payments. We only
//           // want to process received payments here.
//           if (payment.to !== sourceAcoount) {
//               return;
//           }
//
//           // In Stellar’s API, Lumens are referred to as the “native” type. Other
//           // asset types have more detailed information.
//           var asset;
//           if (payment.asset_type === 'native') {
//               asset = 'lumens';
//           }
//           else {
//               asset = payment.asset_code;
//           }
//           var effects_code = {
//             amount      : payment.amount,
//             asset_code  : asset,
//             from        : payment.from
//           }
//       },
//
//       onerror: function(error) {
//         console.error('Error in payment stream');
//       }
//
//   });
//
// });
module.exports = router;
