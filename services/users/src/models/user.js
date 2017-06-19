var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;

var UserSchema = Schema({
    username: { type: String, required: true },
    password:  { type: String, required: true, minlength:8, maxlength:32 },
    givenName: String,
    familyName: String
});

UserSchema.index({ username: 1 }, { unique: true });

UserSchema.pre('save', function(next) { 
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.hash(user.password, SALT_WORK_FACTOR).then(function(hash) {
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
