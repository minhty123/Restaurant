const express = require('express');
const router = express.Router();
const EmployeeController = require('../app/controller/EmployeeController');

router.post('/create', EmployeeController.create);
router.post('/check-phone', EmployeeController.checkPhone);
router.put('/edit/:slug', EmployeeController.edit);
router.delete('/:id', EmployeeController.delete);
router.get('/:slug', EmployeeController.detail);
router.get('/', EmployeeController.show);

module.exports = router;
