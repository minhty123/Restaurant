const CateTable = require('../models/CateTable');
class CateTableController {
  async show(req, res) {
    CateTable.find({})
      .then((catetable) => {
        res.status(200).json({ success: true, catetable });
      })
      .catch((err) => {
        res.status(500).json({ success: false, err });
      });
  }
  //[GET] /catetables/:slug
  async detail(req, res) {
    CateTable.findOne({ slug: req.params.slug })
      .then((catetable) => {
        res.status(200).json({ success: true, catetable });
      })
      .catch((err) => {
        res.status(500).json({ success: false, err });
      });
  }
  //[POST] /catetables/create
  async create(req, res) {
    const catetable = new CateTable(req.body);
    catetable
      .save()
      .then(() => {
        res.status(201).json({ success: true, message: 'successfull' });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err });
      });
  }
  //[PUT] /catetables
  async edit(req, res) {
    CateTable.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true
    })
      .then(() => {
        res.status(200).json({ success: true, message: 'successfully' });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err });
      });
  }
  //[DELETE] /catetables/:id
  async delete(req, res) {
    CateTable.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({ success: true, message: 'successfully' });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err });
      });
  }
}
module.exports = new CateTableController();
