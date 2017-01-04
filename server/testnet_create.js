/**
 * Created by huazhenghao on 2016/10/10.
 */
'use strict';

var StellarSdk = require('stellar-sdk');
var pair = StellarSdk.Keypair.random();
var request = require('request');
request.get({
  url: 'https://horizon-testnet.stellar.org/friendbot',
  qs: { addr: 'GCLADUU5CDN7HFNTZYOFQUGJ2XZCWXBLUYK6JEDFJF6NIFLEQ6BH2QAZ'},
  json: true
}, function(error, response, body) {
  if (error || response.statusCode !== 200) {
    console.error('ERROR!', error || body);
  }
  else {
    console.log('SUCCESS! You have a new account :)\n', body);
    console.log(body.source_account);
  }
});
