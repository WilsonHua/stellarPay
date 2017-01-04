var request = require('request');

request.post({
    url: 'http://localhost:8001/payment',
    form: {
        amount: '1',
        asset_code: 'XLM',
        asset_issuer: 'GB5FKPXQCCLLNCEE4GJIYHBOEUBKMUAKYMPJBGKTGM3B2DWT37KEQJBZ',
        destination: 'GALRODKRXQF2ELH65GIPBF6OVK2K37PTXIQKWPYTNGUCXVWZMEQZ7ZWB',
        source: 'SCUXHQVR7KMQA4PHJVL2FCHFXLGJVUSBDEUD7YAPQXUK3BEY5HTG2AJP'
    }
}, function(error, response, body) {
    if (error || response.statusCode !== 200) {
        console.error('ERROR!', error || body);
    }
    else {
        console.log('SUCCESS!', body);
    }
});