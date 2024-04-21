const Table = require('../models/Table');

class TableController {
  //[GET] /tables/
  async show(req, res) {
    Table.find({})
      .then((table) => {
        res.status(200).json({ success: true, table });
      })
      .catch((err) => {
        res.status(500).json({ success: false, err });
      });
  }
  //[GET] /tables/:slug
  async detail(req, res) {
    Table.findOne({ slug: req.params.slug })
      .then((table) => {
        res.status(200).json({ success: true, table });
      })
      .catch((err) => {
        res.status(500).json({ success: false, err });
      });
  }
  //[POST] /tables/create
  async create(req, res) {
    const table = new Table(req.body);
    table
      .save()
      .then(() => {
        res.status(201).json({ success: true, message: 'successfull' });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err });
      });
  }
  //[PUT] /tables
  async edit(req, res) {
    Table.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true
    })
      .then(() => {
        res.status(200).json({ success: true, message: 'successfully' });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err });
      });
  }
  //[DELETE] /tables/:id
  async delete(req, res) {
    Table.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({ success: true, message: 'successfully' });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err });
      });
  }
}

module.exports = new TableController();
