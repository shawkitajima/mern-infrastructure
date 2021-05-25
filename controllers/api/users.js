const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    resetRequest,
    resetPassword,
};
  
async function create(req, res) {
    try {
      // Add the user to the database
      const user = await User.create(req.body);
      // token will be a string
      const token = createJWT(user);
      // Yes, we can use res.json to send back just a string
      // The client code take this into consideration
      res.json(token);
    } catch (err) {
      // Client will check for non-2xx status code 
      // 400 = Bad Request
      res.status(400).json(err);
    }
}

async function login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (!user) throw new Error();
      const match = await bcrypt.compare(req.body.password, user.password);
      console.log(match);
      if (!match) throw new Error();
      res.json(createJWT(user));
    } catch {
      res.status(400).json('Bad Credentials');
    }
}

async function resetRequest(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error();
    const token = Math.floor(100000 + Math.random() * 900000);
    user.reset = {token};
    await user.save();
    const message = await sendSMSReset(token, req.body.phone);
    res.json(message);
  } catch(err) {
    console.log(err);
    res.status(400).json('Bad Phone Number');
  }
}

async function resetPassword(req, res) {
  try {
    const user = await User.findOne({'reset.token': req.body.token});
    if (!user) throw new Error();
    res.json(user);
  } catch(err) {
    console.log(err);
    res.status(400).json('Bad Reset Token');
  }
}
/*-- Helper Functions --*/

function createJWT(user) {
    return jwt.sign(
      // data payload
      { user },
      process.env.SECRET,
      { expiresIn: '14 days' }
    );
}

async function sendSMSReset(token, phone) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  try {
    const message = await client.messages.create({
      body: `Your infrastructure reset token code is: ${token}`,
      from: process.env.TWILIO_NUMBER,
      to: `+1${phone}`,
    });
    return message;
  } catch(err) {
    console.log(err);
    return err;
  }
}