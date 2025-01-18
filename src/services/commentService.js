const { PrismaClient } = require('@prisma/client');
const CommentDTO = require('../models/comment/CommentDTO');
const prisma = new PrismaClient();

/**
 * @param {string} commentId 
 * @param {string} postId 
 * @returns {Promise<CommentDTO>}
 */
const getCommentByIdAndPostId = async (commentId, postId) => {
  const commentIdNum = parseInt(commentId)
  const postIdNum = parseInt(postId)

  const comment = await prisma.comment.findUnique({ 
    where: { 
      id: commentIdNum, 
      postId: postIdNum 
    }
   });

  return toCommentDTO(comment);
};

/**
 * @param {string} postId 
 * @returns {Promise<CommentDTO>}
 */
const getCommentsByPostId = async (postId) => {
  const idNum = parseInt(postId)
  const comments = await prisma.comment.findMany({ 
    where: { postId: idNum } });

  return comments.map(toCommentDTO); //lambda
};

/**
 * @param {CommentDTO} commentDTO 
 * @param {String} postId 
 * @returns {Promise<CommentDTO[]>}
 */
const createComment = async (commentDTO, postId) => {

  const comment = await prisma.comment.create({
    data: { 
      postId: parseInt(postId), 
      text: commentDTO.text 
    },
  });

  return toCommentDTO(comment);
};

/**
 * @param {import('@prisma/client').Comment} comment 
 * @returns {CommentDTO}
 */
function toCommentDTO(comment) {
  if(!comment) {
    return null;
  }
  return new CommentDTO({
    id: comment.id, 
    text: comment.text
  });
}

module.exports = { getCommentByIdAndPostId, getCommentsByPostId, createComment };