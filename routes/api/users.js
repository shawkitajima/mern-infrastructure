const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

// require the authorization middleware function to protect routes
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/users
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.post('/requestReset', usersCtrl.resetRequest);

module.exports = router;