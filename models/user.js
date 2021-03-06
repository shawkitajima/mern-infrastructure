const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 6;

const phoneSchema = new Schema({
    number: {type: String, required: false},
    verified: {type: Boolean, default: false},
    token: {type: Number, required: false},
    remind: {type: Boolean, default: true},
}, {
    timestamps: true,
})

const resetSchema = new Schema ({
    token: {type: Number, required: true},
}, {
    timestamps: true,
})


const userSchema = new Schema({
    name: {type: String, required: true},
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        required: function() {return !this.facebookId}
    },
    phone: phoneSchema,
    reset: resetSchema,
    facebookId: String,
}, {
    timestamps: true,
    toJSON : {
        transform: function(doc, ret) {
            delete ret.password;
            delete ret.reset;
            delete ret.facebookId;
            if (ret.phone) delete ret.phone.token;
            return ret;
        }
    }
});

userSchema.pre('save', function(next) {
    // Save the reference to the user doc
    const user = this;
    if (!user.isModified('password')) return next();
    // password has been changed - salt and hash it
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
      if (err) return next(err);
      // Update the password property with the hash
      user.password = hash;
      return next();
    });
  });

module.exports = mongoose.model('User', userSchema);