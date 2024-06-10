const express = require('express');
const router = express.Router();
const CateTableController = require('../app/controller/CateTableController');

router.post('/create', CateTableController.create);
router.put('/edit/:slug', CateTableController.edit);
router.delete('/:id', CateTableController.delete);
router.get('/:slug', CateTableController.detail);
router.get('/', CateTableController.show);


module.exports = router;
