const express = require('express');
const router = express.Router();
const CateTableController = require('../app/controller/CateTableController');

router.get('/', CateTableController.showCate);

module.exports = router;
