
const router = require('express').Router();

const userCntrl = require('../controllers/user-management/user-controller');

// User management api end points
router.post('/add', userCntrl.addUser);
router.get('/all', userCntrl.getAllUsers);
module.exports = {
    router: router
};
