var StellarBase = require("stellar-base");

var keypair = StellarBase.Keypair.fromSeed('SCU36VV2OYTUMDSSU4EIVX4UUHY3XC7N44VL4IJ26IOG6HVNC7DY5UJO');
var account = new StellarBase.Account(keypair.accountId(), "713226564141056");

var transaction = new StellarBase.TransactionBuilder(account)
    .addOperation(StellarBase.Operation.payment({
        destination: StellarBase.Keypair.random().accountId(),
        asset: StellarBase.Asset.native(),
        amount: "100"
    }))
    .addSigner(keypair)
    .build();

console.log(transaction.toEnvelope().toXDR().toString("base64"));