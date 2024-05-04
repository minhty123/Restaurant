const express = require('express');
const router = express.Router();
const MenuController = require('../app/controller/MenuController');
const CategoryController = require('../app/controller/CategoryController');

router.post('/create', MenuController.create);
router.get('/create', CategoryController.showCategory);
router.put('/:slug', MenuController.edit);
router.delete('/:id', MenuController.delete);
router.get('/:slug', MenuController.detail);
router.get('/', MenuController.show);

module.exports = router;
