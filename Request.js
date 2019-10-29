const request = require('request');

_EXTERNAL_URL='http://localhost:8080/counter';

const callExtAPIUsiReq = (callback) => {

    request(_EXTERNAL_URL, { json: true}, (err, res, body) => {
      
        if(err){
            return callback(err);
        }
        return callback (body);
    });
}
module.exports.callApi = callExtAPIUsiReq