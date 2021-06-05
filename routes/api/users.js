const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

// require the authorization middleware function to protect routes
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/users
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.post('/password/token', usersCtrl.sendPasswordToken);
router.put('/password', usersCtrl.resetPassword);
router.get('/phone/token', usersCtrl.sendVerifyToken);
router.put('/phone/verify', usersCtrl.verifyPhoneToken);
router.put('/phone/update', usersCtrl.updatePhone);

module.exports = router;