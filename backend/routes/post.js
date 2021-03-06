const express = require('express');
const passport = require('passport');
const auth = require('../middleware/auth');
const token = require('../middleware/verifyTokenExp');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.get('/', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, postCtrl.getAllPosts);
router.get('/:id', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, postCtrl.getOnePost);
router.get('/users/:id', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, postCtrl.getAllPostsOfUser);
router.post('/', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, postCtrl.createPost);
router.get('/:id/likes/:userId', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, postCtrl.getLikePost);
router.post('/:id/likes', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, postCtrl.likePost);
router.delete('/:id/likes/:userId', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, postCtrl.unlikePost);
router.put('/:id', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, auth.postMe, postCtrl.editPost);
router.delete('/:id', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, auth.adminAndPostMe, postCtrl.deletePost);
router.post('/:id/comments', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, postCtrl.createComment);
router.get('/:id/comments', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, postCtrl.getAllComments);
router.get('/:id/comments/:commentId/likes/:userId', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, postCtrl.getLikeComment);
router.post('/:id/comments/:commentId/likes', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, postCtrl.likeComment);
router.delete('/:id/comments/:commentId/likes/:userId', passport.authenticate('jwt', { session : false }), token.verifyTokenExp, postCtrl.unlikeComment);
router.put('/:id/comments/:commentId', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, auth.commentMe, postCtrl.editComment);
router.delete('/:id/comments/:commentId', passport.authenticate('jwt', { session: false }), token.verifyTokenExp, auth.adminAndCommentMe, postCtrl.deleteComment);


module.exports = router;