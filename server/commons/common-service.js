// require fs

const fs = require('fs');
function writeToJson (a_data, fileName, resp ) {
    return new Promise(function (resolve, reject ) {
        fs.writeFile(fileName, JSON.stringify(a_data), function(error) {
            if(error) {
                let respData =  {
                    'message' : 'Data could not be saved!',
                    'error_data' : error
                };
                resp['details'] = respData;
                reject(resp);
            } else {
                let respData = {
                    message : 'Data saved successfully',
                    success_data : 'Success'
                };
                resp['details'] = respData;
                resolve(resp);
            }
        });
    }); 
}

module.exports = {
    writeToJson: writeToJson
};