const express = require('express');
const bouncer = require('express-bouncer')(10000, 900000, 3); // Protection contre les attaques Bruteforce
const router = express.Router();

const authCtrl = require('../controllers/auth');

router.post('/signup', authCtrl.signup);
router.post('/login', bouncer.block, authCtrl.login);

module.exports = router;