const express = require('express');
const router = express.Router();
const { validatePostId, validateCreatePost, handleValidationErrors } = require('../middleware/validation');

const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);
router.get('/:postId', 
    validatePostId,
    handleValidationErrors,
    postController.getPostById
);
router.post('/', 
    validateCreatePost, 
    handleValidationErrors, 
    postController.createPost
);

module.exports = router;