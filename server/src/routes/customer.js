const express = require('express');
const router = express.Router();
const CustomerController = require('../app/controller/CustomerController');
const ArrangeTable = require('../utils/arrange');

router.get('/:slug', CustomerController.detail);

// router.get('/arrange', CustomerController.arrange);
router.get('/', CustomerController.show);
router.post('/filter', CustomerController.filter);
router.post('/check-phone', CustomerController.checkPhone);
router.post('/create', CustomerController.create);
router.put('/edit/:slug', CustomerController.edit);
router.delete('/:id', CustomerController.delete);

module.exports = router;
