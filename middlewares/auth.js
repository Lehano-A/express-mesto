require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_SECRET_CODE } = process.env;

module.exports.auth = (req, res, next) => {

  if (!req.user.payload) {
    console.log('sdcdscs')
  }

  const tokenFromCookie = req.headers.cookie.replace('jwt=', '');
  let payload;
  try {
    payload = jwt.verify(tokenFromCookie, JWT_SECRET_CODE);
  }
  catch (err) { console.log('401', err) }

  req.user = payload;
  next();
};
