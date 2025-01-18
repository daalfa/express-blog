
class CommentDTO {
  /**
   * @param {{id: number, text: string}} data
   */
  constructor(data) {
    this.id = data.id;
    this.text = data.text;
  }
}
module.exports = CommentDTO;
