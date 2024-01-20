const jwt = require('jsonwebtoken');

const sign = process.env.JWT_SECRET;

module.exports = {
  generate: (data) => jwt.sign(data, sign, { expiresIn: '30d' }),
  verify: (token) => jwt.verify(token, sign),
};
