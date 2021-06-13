const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    sendPasswordToken,
    resetPassword,
    updatePhone,
    sendVerifyToken,
    verifyPhoneToken,
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



async function sendPasswordToken(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error();
    if (!user.phone.verified) throw new Error();
    const token = Math.floor(100000 + Math.random() * 900000);
    user.reset = {token};
    await user.save();
    const message = await sendSMSReset(user.phone.number, `Your infrastructure reset token code is: ${token}`);
    res.json(message);
  } catch(err) {
    console.log(err);
    res.status(400).json('Bad Phone Number');
  }
}

async function updatePhone(req, res) {
  try {
    req.user.phone.number = req.body.phone;
    const user = await User.findByIdAndUpdate(req.user._id, req.user, {new: true});
    res.json(user); 
  } catch(err) {
    console.log(err);
    res.status(400).json('the phone number you provided caused an error');
  }
}

async function sendVerifyToken(req, res) {
  try {
    let user = await User.findById(req.user._id);
    const token = Math.floor(100000 + Math.random() * 900000);
    user.phone.token = token;
    await user.save();
    await sendSMSReset(user.phone.number, `Your phone number verification token code is: ${user.phone.token}`);
    res.json('token sent');
  } catch(err) {
    console.log(err);
    res.status(400).json('the phone number you provided caused an error');
  }
}

async function verifyPhoneToken(req, res) {
  try {
    const user = await User.findOne({'phone.token': req.body.token});
    if (!user) throw new Error();
    // confirm that the token hasn't "expired" (thirty minutes since created);  
    let expiration = (user.phone.updatedAt.getTime() + 30 * 60000);
    let valid = expiration > new Date();
    if (!valid) throw new Error();
    user.phone.verified = true;
    // remove the verification token so that it cannot be used again
    user.phone.token = null;
    await user.save();
    console.log(user);
    res.json(user);
  } catch(err) {
    console.log(err);
    res.status(400).json('Bad Reset Token');
  }
}

async function resetPassword(req, res) {
  try {
    const user = await User.findOne({'reset.token': req.body.token});
    if (!user) throw new Error();
    // confirm that the token hasn't "expired" (thirty minutes since created);  
    let expiration = (user.reset.createdAt.getTime() + 30 * 60000);
    let valid = expiration > new Date();
    if (!valid) throw new Error();
    user.password = req.body.password;
    // remove the reset token so that it cannot be used again
    user.reset = null;
    await user.save();
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

async function sendSMSReset(phone, body) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  try {
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_NUMBER,
      to: phone,
    });
    return message;
  } catch(err) {
    throw new Error(err);
  }
}