
const router = require('express').Router();

const hotelCntrl = require('../controllers/hotel-management/hotel-controller');

// User management api end points
router.get('/all', hotelCntrl.getHotels);
router.post('/book', hotelCntrl.bookHotel);
module.exports = {
    router: router
};
