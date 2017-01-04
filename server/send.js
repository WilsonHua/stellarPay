/**
 * Created by huazhenghao on 2016/10/10.
 */
'use strict';

var StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

//获取seed和接收方的AccountID
var sourceKeys = StellarSdk.Keypair
    .fromSeed('SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4');
var destinationId = 'GB4LBSRZ3M2IBGBAWGGISZG34ENZZCNOU4XMIXC7X4VFVLJKMROOCBVN';

//用于检查一个Account是否是stellar的实际存在的账户
server.loadAccount(destinationId)
// 如果destinationId是不存在的，会显示如下报错信息
    .catch(StellarSdk.NotFoundError, function (error) {
        throw new Error('The destination account does not exist!');
    })
    // 如果没有报错，会返回Sequence number值
    .then(function() {
        return server.loadAccount(sourceKeys.accountId());
    })
    .then(function(sourceAccount) {
        // 为了生成一个Transaction，由于需要Sequence number，即sourceAccount
        var transaction = new StellarSdk.TransactionBuilder(sourceAccount)
            .addOperation(StellarSdk.Operation.payment({
                destination: destinationId,
                // 由于stellar网络允许一个transactions中包含多种货币
                // 所以，必须要指定说明是哪个资产，下面这句.native()即代表Lumens
                asset: StellarSdk.Asset.native(),
                amount: "12"
            }))
            // 在transactions中的备注字段，可添加备注，不会影响交易。
            .addMemo(StellarSdk.Memo.text('Test Transaction'))
            .build();
        // 对transactions签名，证明是本人进行操作
        transaction.sign(sourceKeys);
        // 最后，提交，发送到stellar网络
        return server.submitTransaction(transaction);
    })
    .then(function(result) {
        console.log('Success! Results:', result);
    })
    .catch(function(error) {
        console.error('Something went wrong!', error);
    });
