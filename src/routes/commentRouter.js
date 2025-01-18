const express = require('express');
const router = express.Router();
const { validatePostId, validateCommentId, validateCreateComment, handleValidationErrors } = require('../middleware/validation');

const commentController = require('../controllers/commentController');

router.get('/:postId/comments/:id', 
    validatePostId,
    validateCommentId,
    handleValidationErrors,
    commentController.getCommentById
);
router.get('/:postId/comments', 
    validatePostId,
    handleValidationErrors,
    commentController.getCommentsByPostId
);
router.post('/:postId/comments',
    validatePostId,
    validateCreateComment,
    handleValidationErrors, 
    commentController.createComment
);

module.exports = router;