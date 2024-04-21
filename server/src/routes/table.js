const express = require('express');
const router = express.Router();
const TableController = require('../app/controller/TableController');

router.post('/create', TableController.create);
router.put('/:slug', TableController.edit);
router.delete('/:id', TableController.delete);
router.get('/:slug', TableController.detail);
router.get('/', TableController.show);

module.exports = router;
