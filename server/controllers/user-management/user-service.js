const fs = require('fs');
function prepData (a_data) {
    return {
        firstName: a_data.firstName,
        lastName: a_data.lastName,
        email: a_data.email,
        credits: a_data.credits || 0
    };
}

function validateEmail ( req_body ) {
    // Check if email is unique
    // read json file data
    const exitingData = JSON.parse (fs.readFileSync('data.json'));
    for (let indx = 0; indx < exitingData.length; indx++) {
        const existingEmail = exitingData[indx].email;
        if (req_body.body.email === existingEmail) {
            return true;
        }
    }
    return false;
}

function getAllUsers () {
    return new Promise ( (resolve, reject ) => {
        fs.readFile('data.json', (error, data ) => {
            if (!error) {
                resolve(JSON.parse(data));
            } else {
                reject (error);
            }
        });
    } );
}

module.exports = {
    prepData : prepData,
    validateEmail: validateEmail,
    getAllUsers: getAllUsers
};