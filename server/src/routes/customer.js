const express = require('express');
const router = express.Router();
const CustomerController = require('../app/controller/CustomerController');

router.post('/create', CustomerController.create);
router.put('/:slug', CustomerController.edit);
router.delete('/:id', CustomerController.delete);
router.get('/:slug', CustomerController.detail);
router.get('/', CustomerController.show);

module.exports = router;
