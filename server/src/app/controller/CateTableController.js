const CateTable = require('../models/CateTable');
class CateTableController {
  async showCate(req, res) {
    CateTable.find({})
      .then((catetable) => {
        res.status(200).json({ success: true, catetable });
      })
      .catch((err) => {
        res.status(500).json({ success: false, err });
      });
  }
}
module.exports = new CateTableController();
