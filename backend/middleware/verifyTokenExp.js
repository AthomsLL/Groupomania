require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.verifyTokenExp = (req, res, next) => {
    const token = req.headers.authorization.split(' ');
    const decoded = jwt.verify(token[1], `${process.env.SECRET}`);
    const exp = decoded.exp;
    const now = Date.now();

    if (now > exp) {
        next();
    } else {
        res.status(401).json({ message: "Session expirée, merci de vous reconnecter."})
    }
}