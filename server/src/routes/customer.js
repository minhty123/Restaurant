const express = require('express');
const router = express.Router();
const CustomerController = require('../app/controller/CustomerController');
const ArrangeTable = require('../utils/arrange');

router.post('/create', CustomerController.create);
router.put('/edit/:slug', CustomerController.edit);
router.delete('/:id', CustomerController.delete);
router.get('/:slug', CustomerController.detail);
router.get('/', CustomerController.show);

module.exports = router;
