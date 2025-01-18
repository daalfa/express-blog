const CommentDTO = require('../comment/CommentDTO');

class PostResponseWithCommentsDTO {
/**
 * @param {number} id 
 * @param {string} title 
 * @param {string} content 
 * @param {CommentDTO[]} comments 
 */
  constructor(id, title, content, comments) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.comments = comments;
  }
}

module.exports = PostResponseWithCommentsDTO;
