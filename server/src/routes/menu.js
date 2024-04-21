const express = require('express');
const router = express.Router();
const MenuController = require('../app/controller/MenuController');

router.post('/create', MenuController.create);
router.put('/:slug', MenuController.edit);
router.delete('/:id', MenuController.delete);
router.get('/:slug', MenuController.detail);
router.get('/', MenuController.show);

module.exports = router;
