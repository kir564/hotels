module.exports = (comment) => ({
  author: comment.author?.login,
  content: comment.content,
  id: comment._id,
  publishedAt: comment.createdAt,
});
