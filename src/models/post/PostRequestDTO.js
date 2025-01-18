
class PostRequestDTO {
  /**
   *
   * @param {{title: string, content: string}} data
   */
  constructor(data) {
    this.title = data.title;
    this.content = data.content;
  }
}

module.exports = PostRequestDTO;
