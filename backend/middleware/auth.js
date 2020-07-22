require('dotenv').config();
const db = require('../config/database-test');
const token = require('./getToken');

exports.admin = async (req, res, next) => {
  const userId = token.getToken(req);

  let user = await db.database.User.findOne({ where: { id: userId }})
  
  if (user.isAdmin == true) {
    return next();
  }

  return res.status(401).json({
    message: "Autorisation refusée, seuls les admins peuvent utiliser cette route",
    statusCode: 401
  });
};

exports.me = async (req, res, next) => {
  const userId = token.getToken(req);

  if (req.params.id == userId) {
    return next();
  }

  return res.status(401).json({
    message: "Aturorisation refusée, vous n'avez pas le droit d'utiliser cette route",
    statusCode: 401
  })
};

exports.adminAndMe = async (req, res, next) => {
  const userId = token.getToken(req);

  let user = await db.database.User.findOne({ where: { id: userId }})

  if ((user.isAdmin == true) || (req.params.id == userId)) {
    return next();
  }

  return res.status(401).json({
    message: "Autorisation refusée, vous n'avez pas le droit d'utiliser cette route",
    statusCode: 401
  })
};

exports.postMe = async (req,res,next) => {
  const userId = token.getToken(req);

  let post = await db.database.Post.findOne({ where: { id: req.params.id }});

  console.log(post);
  console.log(post.UserId);

  if (post.UserId == userId) {
    return next();
  }

  return res.status(401).json({
    message: "Autorisation refusée, vous n'avez pas le droit de modifier ce post",
    statusCode: 401
  })
};

exports.commentMe = async (req, res, next) => {
  const userId = token.getToken(req);

  let comment = await db.database.Comment.findOne({ where : { id: req.params.idComment }});

  if (comment.UserId == userId) {
    return next();
  }

  return res.status(401).json({
    message: "Autorisation refusée, vous n'avez pas le droit de modifier ce commentaire",
    statusCode: 401
  })
};

exports.adminAndPostMe = async (req, res, next) => {
  const userId = token.getToken(req);

  let user = await db.database.User.findOne({ where: { id: userId }});
  let post = await db.database.Post.findOne({ where: { id: req.params.id }});

  if ((user.isAdmin == true) || (post.UserId == userId)) {
    return next();
  }

  return res.status(401).json({
    message: "Autorisation refusée, vous n'avez pas le droit de supprimer ce post",
    statusCode: 401
  })
};

exports.adminAndCommentMe = async (req, res, next) => {
  const userId = token.getToken(req);

  let user = await db.database.User.findOne({ where: { id: userId }});
  let comment = await db.database.Comment.findOne({ where : { id: req.params.idComment }});

  if ((user.isAdmin == true) || (comment.UserId == userId)) {
    return next();
  }

  return res.status(401).json({
    message: "Autorisation refusée, vous n'avez pas le droit de supprimer ce commentaire",
    statusCode: 401
  })
};