const { body, param, validationResult } = require('express-validator');

const validatePostId = [
  param('postId')
    .isInt({ min: 1 })
    .withMessage('Post ID must be a positive integer')
]

const validateCommentId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Comment ID must be a positive integer')
]

const validateCreatePost = [
  body('title')
    .isString()
    .isLength({ min: 3, max: 255 })
    .trim()
    .withMessage('Title must be between 3 and 255 characters'),
  body('content')
    .isString()
    .notEmpty()
    .trim()
    .withMessage('Content is required and cannot be empty'),
];

const validateCreateComment = [
  body('text')
    .isString()
    .notEmpty()
    .trim()
    .withMessage('text is required and cannot be empty'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validatePostId, validateCommentId, validateCreatePost, validateCreateComment, handleValidationErrors };