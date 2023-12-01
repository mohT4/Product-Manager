const mongoose = require('mongoose');
const joi = require('joi');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

//make the password cpnfermation vertual
userSchema.virtual('passwordConfirmation').set(function (value) {
  this._passwordConfirmation = value;
});

// use joi for btter validation
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const userObjct = {
    name: this.name,
    email: this.email,
    password: this.password,
    passwordConfirmation: this._passwordConfirmation,
  };

  const Schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string(),
    passwordConfirmation: joi
      .string()
      .required()
      .valid(joi.ref('password'))
      .messages({ 'any.only': 'password do not match' }),
  });

  await Schema.validateAsync(userObjct);
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//hash the password when saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//compare password when logging in
userSchema.methods.comparePassword = async function (currentPD, candiatePD) {
  return await bcrypt.compare(currentPD, candiatePD);
};

//check if user changes his password the last jwt has issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return changedTimestamp > JWTTimestamp;
  }

  return false;
};

//password reset token when the password is forgetten
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('user', userSchema);
module.exports = User;
