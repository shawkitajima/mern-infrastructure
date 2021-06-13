const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/facebook/token', passport.authenticate('facebook-token', {session: false}), function(req, res) {
    const token = createJWT(req.user);
    res.json(token);
} )

module.exports = router;

function createJWT(user) {
    return jwt.sign(
      // data payload
      { user },
      process.env.SECRET,
      { expiresIn: '14 days' }
    );
}