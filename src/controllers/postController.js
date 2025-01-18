const postService = require('../services/postService');
const PostResponseWithCommentsDTO = require('../models/post/PostResponseWithCommentsDTO');
const PostRequestDTO = require('../models/post/PostRequestDTO');

const getAllPosts = async (req, res) => {
  try {
    const postResponseWithCommentsDTOs = await postService.getAllPosts();
    res.json(postResponseWithCommentsDTOs);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const postResponseWithCommentsDTO = await postService.getPostById(req.params.postId);
    if (!postResponseWithCommentsDTO) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(postResponseWithCommentsDTO);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching post' });
  }
};

const createPost = async (req, res) => {
  try {
    const postRequest = new PostRequestDTO(req.body);
    const postResponseWithId = await postService.createPost(postRequest);
    res.status(201).json(postResponseWithId);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating post' });
  }
};

module.exports = { getAllPosts, getPostById, createPost };