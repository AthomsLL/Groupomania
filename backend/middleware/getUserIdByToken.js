require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.getUserIdByToken = (req) => {
    const token = req.headers.authorization.split(' ');
    const decoded = jwt.verify(token[1], `${process.env.SECRET}`);
    const userId = decoded.userId;
  
    return userId;
}