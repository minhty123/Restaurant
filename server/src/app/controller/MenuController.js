const Menu = require('../models/Menu');

class MenuController {
  //[GET] /menus/
  async show(req, res) {
    Menu.find({})
      .then((menu) => {
        res.status(200).json({ success: true, menu });
      })
      .catch((err) => {
        res.status(500).json({ success: false, err });
      });
  }
  //[GET] /menus/:slug
  async detail(req, res) {
    Menu.findOne({ slug: req.params.slug })
      .then((menu) => {
        res.status(200).json({ success: true, menu });
      })
      .catch((err) => {
        res.status(500).json({ success: false, err });
      });
  }
  //[POST] /menus/create
  async create(req, res) {
    const menu = new Menu(req.body);
    menu
      .save()
      .then(() => {
        res.status(201).json({ success: true, message: 'successfull' });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err });
      });
  }
  //[PUT] /menus
  async edit(req, res) {
    Menu.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true
    })
      .then(() => {
        res.status(200).json({ success: true, message: 'successfully' });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err });
      });
  }
  //[DELETE] /menus/:id
  async delete(req, res) {
    Menu.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({ success: true, message: 'successfully' });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err });
      });
  }
}

module.exports = new MenuController();
