const userService = require('./user-service');
const commonService = require('../../commons/common-service');
const fs = require('fs');

let respData = {
    'message' : '',
    'error_data' : '',
    'success_data' : ''
};
function addUser(req, res) {
	
    req.checkBody('email', 'Email empty').notEmpty();
    req.checkBody('firstName', 'firstName can not be empty').notEmpty();
    req.checkBody('lastName', 'lastName can not be empty').notEmpty();
    let errors = req.validationErrors();
    if(errors) {
        res.status(400).json({
			error_data: errors,
			message: 'Invalid Input'
        });
        return;
    }

    // Check if email entered is correct
	const result = userService.validateEmail(req);
	if (result) {
		res.status(500).json({
			error_data: result.error,
			message: 'Email not in correct format or already used!'
        });
        return;
    }
    
    saveData(req, res);
}

function saveData(req, res) {
    var newUser = userService.prepData(req.body);
    let existingData = JSON.parse(fs.readFileSync('data.json'));
    if (existingData && existingData.length > 0)
        existingData.push(newUser);
    else
        existingData = [newUser];

    commonService.writeToJson(existingData, 'data.json', {})
    .then ( data => {
        respData = {
            message : 'Data saved successfully',
            success_data : 'User added'
        };
        res.status(200).json(respData);
    })
    .catch (err => {
        respData =  {
            'message' : 'Data could not be saved!',
            'error_data' : error
        };
        res.status(500).json(respData);
        return;
    });
}

function getAllUsers (req, res) {
    userService.getAllUsers()
    .then (data => {
        respData = {
            message : 'Data fetched successfully',
            success_data : 'success'
        };
        res.status(200).json(data);
    })
    .catch (err => {
        respData =  {
            'message' : 'Data could not be fetched!',
            'error_data' : 'error'
        };
        res.status(500).json(err);
        return;
    });

}

module.exports = {
    addUser: addUser,
    getAllUsers: getAllUsers
};