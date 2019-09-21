const hotelService = require('./hotel-service');
const fs = require('fs');
const ResponseClass = require('../response-model/response-model');

function getHotels(req, res) {
    // Check if email entered is correct
    getHotelsData(req, res);
}

function getHotelsData(req, res) {
    const allHotels = hotelService.getAllHotels();
    if (allHotels) {
        res.status(200).json(ResponseClass.success('Success', null, allHotels));
    } else {
        const msg = 'Hotels not found of this name: '+ req.body.hotelName +' and location: ' +req.body.hotelLocation;
        
        res.status(404).json(ResponseClass.error(msg, 'Hotels not found', null));
        return;
    }
}

function bookHotel (req, res) {
    const result = hotelService.validateInput(req);
	if (!result) {
        const msg = 'Hotel Name (hotelName) and Location (hotelLocaton) is required';
		res.status(402).json(
            ResponseClass.error(msg, 'Invalid Input', null)
            );
        return;
    }

    const isValidUser = hotelService.validateUser(req.body.userEmail);
    if (!isValidUser) {
        res.status(404).json(
            ResponseClass.error('User email does not exist or invalid', 'Invalid Input', null)
        );
        
        return;
    }

    hotelService.updateBookStatus(req.body)
    .then ( ( respData ) => {
        res.status(200).json(
            ResponseClass.success('Success', null, respData)
        );
        return;
    })
    .catch ( err => {
        res.status(500).json(
            ResponseClass.error('Fail', err, null)
        );
        return;
    });
}

module.exports = {
    getHotels: getHotels,
    bookHotel: bookHotel
};