
const router = require('express').Router();

const userCntrl = require('../controllers/user-management/user-controller');

// User management api end points
router.post('/add', userCntrl.addUser);
router.delete('/delete', userCntrl.deleteUser);
router.put('/update', userCntrl.updateUser);
router.get('/all', userCntrl.getAllUsers);
module.exports = {
    router: router
};
