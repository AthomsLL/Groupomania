const express = require('express');
const passport = require('passport');
const auth = require('../middleware/auth');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.get('/', passport.authenticate('jwt', { session: false }), postCtrl.getAllPosts);
router.get('/:id', passport.authenticate('jwt', { session: false }), postCtrl.getOnePost);
router.get('/users/:id', passport.authenticate('jwt', { session: false }), postCtrl.getAllPostsOfUser);
router.post('/', passport.authenticate('jwt', { session: false }), postCtrl.createPost);
router.get('/:id/likes/:userId', passport.authenticate('jwt', { session: false }), postCtrl.getLikePost);
router.post('/:id/likes', passport.authenticate('jwt', { session: false }), postCtrl.likePost);
router.delete('/:id/likes/:userId', passport.authenticate('jwt', { session: false }), postCtrl.unlikePost);
router.put('/:id', passport.authenticate('jwt', { session: false }), auth.postMe, postCtrl.editPost);
router.delete('/:id', passport.authenticate('jwt', { session: false }), auth.adminAndPostMe, postCtrl.deletePost);
router.post('/:id/comments', passport.authenticate('jwt', { session: false }), postCtrl.createComment);
router.get('/:id/comments', passport.authenticate('jwt', { session: false }), postCtrl.getAllComments);
router.get('/:id/comments/:commentId/likes/:userId', passport.authenticate('jwt', { session: false }), postCtrl.getLikeComment);
router.post('/:id/comments/:commentId/likes', passport.authenticate('jwt', { session: false }), postCtrl.likeComment);
router.delete('/:id/comments/:commentId/likes/:userId', passport.authenticate('jwt', { session : false }), postCtrl.unlikeComment);
router.put('/:id/comments/:commentId', passport.authenticate('jwt', { session: false }), auth.commentMe, postCtrl.editComment);
router.delete('/:id/comments/:commentId', passport.authenticate('jwt', { session: false }), auth.adminAndCommentMe, postCtrl.deleteComment);


module.exports = router;