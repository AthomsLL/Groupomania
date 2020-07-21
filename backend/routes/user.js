const express = require('express');
const passport = require('passport');
const auth = require('../middleware/auth');
const multerAvatars = require('../middleware/multer-config-avatars');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get('/', passport.authenticate('jwt', { session: false }), auth.admin, userCtrl.getAllUsers);
router.get('/:id', passport.authenticate('jwt', { session: false }), userCtrl.getOneUser);
router.put('/:id', multerAvatars, passport.authenticate('jwt', { session: false }), auth.me, userCtrl.editUserProfile);
router.put('/:id/username', passport.authenticate('jwt', { session: false }), auth.me, userCtrl.editUsername);
router.put('/:id/password', passport.authenticate('jwt', { session: false }), auth.me, userCtrl.editPassword);
router.delete('/:id', multerAvatars, passport.authenticate('jwt', { session: false }), auth.adminAndMe, userCtrl.deleteUser);

module.exports = router;