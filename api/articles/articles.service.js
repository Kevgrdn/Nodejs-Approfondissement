const Article = require("./articles.schema");

class ArticlesService {
  create(data) {
    const article = new Article(data);
    return article.save();
  }

  update(id, data) {
    return Article.findByIdAndUpdate(id, data, { new: true });
  }

  getArticlesByUser(id) {
      const articles =  Article.find({ user: id }).populate('user', '-password');
      return articles;
  }

  delete(id) {
    return Article.deleteOne({ _id: id });
  }
}

module.exports = new ArticlesService();
