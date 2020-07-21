const express = require('express');
const passport = require('passport');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

router.get('/users/:id', passport.authenticate('jwt', { session: false }), commentCtrl.getAllCommentsOfUser);

module.exports = router;