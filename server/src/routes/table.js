const express = require('express');
const router = express.Router();
const TableController = require('../app/controller/TableController');
const CateTableController = require('../app/controller/CateTableController');

router.post('/create', TableController.create);
router.get('/create', CateTableController.showCate);
router.put('/edit/:slug', TableController.edit);
router.get('/edit/', CateTableController.showCate);
router.delete('/:id', TableController.delete);
router.get('/:slug', TableController.detail);
router.get('/', TableController.show);

module.exports = router;
