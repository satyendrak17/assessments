const fs = require('fs');
const commonService = require('../../commons/common-service');

function getAllHotels () {
    return JSON.parse (fs.readFileSync('hotels.json'));
}
function validateInput (req) {
    const data = req.body;
    if (
        data.hasOwnProperty('hotelName')
        && data.hasOwnProperty('hotelLocation')
        ) {
            return true;
    }
    return false;
}

function validateUser (email) {
    const existingUsers = JSON.parse (fs.readFileSync('data.json'));
    const len = existingUsers.length;
    for (let indx = 0; indx < len; indx++) {
        const existingEmail = existingUsers[indx].email;
        if (email === existingEmail) {
            return true;
        }
    }
    return false;
}

function updateBookStatus (req)  {
    const existingUsers = JSON.parse (fs.readFileSync('data.json'));
    let response = {};
    let tArray = [];
    const len = existingUsers.length;
    for (let indx = 0; indx < len; indx++) {
        const tData = existingUsers[indx];
        if (tData.email === req.userEmail) {
            const hotel = getHotelByNameLoc(req);
            if (hotel) {
                if (tData.credits >= hotel.price) {
                    if (tData.bookStatus === 'Booked') {
                        tData['details'] = 'Already Booked';
                        tData['bookedHotel'] = hotel.name;
                    } else {
                        tData['bookStatus'] = 'Booked';
                        tData['bookedHotel'] = hotel.name;
                    }
                    
                    tArray.push(tData);
                } else {
                    tData['bookStatus'] = 'PENDING APPROVAL';
                    tArray.push(tData);
                }
                response['data'] = tData;
            } else {
                response['data'] = null;
                response['message'] = 'No hotel found';
            }
        } else {
            tArray.push(tData);
        }
    }

    return commonService.writeToJson(tArray, 'data.json', response)
    
}

function getHotelByNameLoc (req) {
    const existingHotels = getAllHotels();
    const len = existingHotels.length;
    for (let indx = 0; indx < len; indx++) {
        const tData = existingHotels[indx];
        if (tData.name === req.hotelName && tData.location === req.hotelLocation) {
            return tData;
        }
    }
    return false;
}

module.exports = {
    getAllHotels: getAllHotels,
    validateInput: validateInput,
    validateUser: validateUser,
    updateBookStatus: updateBookStatus
};