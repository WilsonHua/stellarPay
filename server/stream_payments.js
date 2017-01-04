/**
 * Created by huazhenghao on 2016/12/6.
 */
var EventSource = require('eventsource');
var es = new EventSource('https://horizon-testnet.stellar.org/accounts/GB4LBSRZ3M2IBGBAWGGISZG34ENZZCNOU4XMIXC7X4VFVLJKMROOCBVN/transactions');
es.onmessage = function(message) {
    var result = message.data ? JSON.parse(message.data) : message;
    console.log('New payment:');
    console.log(result);
};
es.onerror = function(error) {
    console.log('An error occured!');
}