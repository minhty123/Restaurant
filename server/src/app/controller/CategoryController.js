const Category = require('../models/Category');
class CategoryController {
  async showCategory(req, res) {
    Category.find({})
      .then((cate) => {
        res.status(200).json({ success: true, cate });
      })
      .catch((err) => {
        res.status(500).json({ success: false, err });
      });
  }
}
module.exports = new CategoryController();
