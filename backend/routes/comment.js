const express = require('express');
const passport = require('passport');
const token = require('../middleware/verifyTokenExp');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

router.get('/users/:id', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, commentCtrl.getAllCommentsOfUser);

module.exports = router;