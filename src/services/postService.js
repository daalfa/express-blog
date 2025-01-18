const { PrismaClient } = require('@prisma/client');
const PostResponseWithCommentsDTO = require('../models/post/PostResponseWithCommentsDTO');
const PostResponseDTO = require('../models/post/PostResponseDTO');
const PostRequestDTO = require('../models/post/PostRequestDTO');

const CommentDTO = require('../models/comment/CommentDTO');

const prisma = new PrismaClient();

/**
 * @returns {Promise<PostResponseWithCommentsDTO[]>} 
 */
const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: { comments: true }
  });

  return posts.map(toPostResponseWithCommentsDTO); //lambda
};

/**
 * @param {string} postId 
 * @returns {Promise<PostResponseWithCommentsDTO>}
 */
const getPostById = async (postId) => {
  const idNum = parseInt(postId);

  const post = await prisma.post.findUnique({
    where: { id: idNum },
    include: { comments: true }
  });

  return toPostResponseWithCommentsDTO(post);
};

/**
 * @param {PostRequestDTO} postRequestDto 
 * @returns {Promise<PostResponseDTO>}
 */
const createPost = async (postRequestDto) => {

  const post = await prisma.post.create({
    data: { 
      title: postRequestDto.title, 
      content: postRequestDto.content 
    }
  });

  return toPostResponseDTO(post);
};

/**
 * @param {import('@prisma/client').Post} post 
 * @returns {PostResponseWithCommentsDTO}
 */
function toPostResponseWithCommentsDTO(post) {

  const postDto = new PostResponseWithCommentsDTO(
    post.id,
    post.title,
    post.content,
    (post.comments ?? []).map((comment) => new CommentDTO({
      id: comment.id,
      text: comment.text
    }))
  );
  return postDto
}

/**
 * @param {import('@prisma/client').Post} post 
 * @returns {PostResponseWithIdDTO}
 */
function toPostResponseDTO(post) {
  const postDto = new PostResponseDTO(
    post.id,
    post.title,
    post.content
  );
  return postDto
}

module.exports = { getAllPosts, getPostById, createPost };