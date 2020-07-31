const express = require('express');
const passport = require('passport');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.get('/', passport.authenticate('jwt', { session: false }), postCtrl.getAllPosts);
router.get('/:id', passport.authenticate('jwt', { session: false }), postCtrl.getOnePost);
router.get('/users/:id', passport.authenticate('jwt', { session: false }), postCtrl.getAllPostsOfUser);
router.post('/', multer, passport.authenticate('jwt', { session: false }), postCtrl.createPost);
router.post('/:id/likes', passport.authenticate('jwt', { session: false }), postCtrl.likePost);
router.put('/:id', multer, passport.authenticate('jwt', { session: false}), auth.postMe, postCtrl.editPost);
router.delete('/:id', multer, passport.authenticate('jwt', { session: false}), auth.adminAndPostMe, postCtrl.deletePost);
router.post('/:id/comments', passport.authenticate('jwt', { session: false }), postCtrl.createComment);
router.get('/:id/comments', passport.authenticate('jwt', { session: false }), postCtrl.getAllComments);
router.post('/:id/comments/:idComment/like', passport.authenticate('jwt', { session: false }), postCtrl.likeComment);
router.put('/:id/comments/:idComment', passport.authenticate('jwt', { session: false }), auth.commentMe, postCtrl.editComment);
router.delete('/:id/comments/:idComment', passport.authenticate('jwt', { session: false }), auth.adminAndCommentMe, postCtrl.deleteComment);


module.exports = router;