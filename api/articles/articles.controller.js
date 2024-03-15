const articleService = require("./articles.service");

class ArticlesController {
  async create(req, res, next) {
    try {
      const data = { ...req.body, user: req.user._id };

      const article = await articleService.create(data);

      req.io.emit("article:create", article);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;

      if (req.user.role !== "admin") {
        res.status(400).send();
      }

      const articleModified = await articleService.update(id, data);

      req.io.emit("article:update", { id });
      res.json(articleModified);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;

      if (req.user.role !== "admin") {
        res.status(400).send();
      }

      await articleService.delete(id);
      req.io.emit("article:delete", { id });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticlesController();
