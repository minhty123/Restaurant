const Table = require('../models/Table');
const CateTable = require('../models/CateTable')

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
    const catetable = new CateTable(req.body); // Tạo một đối tượng Catetable từ dữ liệu trong req.body

    try {
      await table.save();
      await catetable.save(); // Lưu dữ liệu Catetable vào cơ sở dữ liệu

      res.status(201).json({ success: true, message: 'Successful' });
    } catch (err) {
      res.status(400).json({ success: false, message: err });
    }
  }
  async cate(req, res) {
    CateTable.find({})
      .then((catetable) => {
        res.status(200).json({ success: true, catetable });
      })
      .catch((err) => {
        res.status(500).json({ success: false, err });
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
