var StellarSdk = require('stellar-sdk');
var pair = StellarSdk.Keypair.random();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// the JS SDK uses promises for most actions, such as retrieving an account
server.loadAccount('GBS43BF24ENNS3KPACUZVKK2VYPOZVBQO2CISGZ777RYGOPYC2FT6S3K').then(function(account) {
  console.log('Balaces for account: ' + pair.accountId());
  account.balances.forEach(function(balance) {
    console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
  });
});
