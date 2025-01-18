const CommentDTO = require('../models/comment/CommentDTO');
const commentService = require('../services/commentService');

const getCommentById = async (req, res) => {
  try {
    const comment = await commentService.getCommentByIdAndPostId(req.params.id, req.params.postId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

const getCommentsByPostId = async (req, res) => {
  try {
    const comments = await commentService.getCommentsByPostId(req.params.postId);
    res.json(comments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

const createComment = async (req, res) => {
  try {
    const comment = new CommentDTO(req.body);
    const newComment = await commentService.createComment(comment, req.params.postId);
    res.status(201).json(newComment);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating comment' });
  }
};

module.exports = { getCommentById, getCommentsByPostId, createComment };