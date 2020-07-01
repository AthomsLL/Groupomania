const express = require('express');
const bouncer = require('express-bouncer')(10000, 900000, 2); // Protection contre les attaques Bruteforce
const router = express.Router();

const authCtrl = require('../controllers/auth');

router.post('/signup', authCtrl.signup);
//router.post('/login', bouncer.block, authCtrl.login);
//router.post('/login/forgot', authCtrl.forgot);
//router.post('/login/recover', authCtrl.recover);

module.exports = router;