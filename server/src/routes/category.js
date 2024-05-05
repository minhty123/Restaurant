const express = require('express');
const router = express.Router();
const CategoryController = require('../app/controller/CategoryController');

router.get('/', CategoryController.showCategory);

module.exports = router;
