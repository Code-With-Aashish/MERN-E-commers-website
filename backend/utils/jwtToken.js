const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d', // Set a default expiration time
  });

  // Options for the cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
