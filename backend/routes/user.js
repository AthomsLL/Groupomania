const express = require('express');
const passport = require('passport');
const auth = require('../middleware/auth');
const token = require('../middleware/verifyTokenExp');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get('/', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, auth.admin, userCtrl.getAllUsers);
router.get('/:id', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, auth.me, userCtrl.getUserMe);
router.get('/profile/:username', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, userCtrl.getOneUser);
router.put('/:id', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, auth.me, userCtrl.editUserProfile);
router.put('/:id/username', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, auth.me, userCtrl.editUsername);
router.put('/:id/password', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, auth.me, userCtrl.editPassword);
router.delete('/:id', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, auth.adminAndMe, userCtrl.deleteUser);

module.exports = router;