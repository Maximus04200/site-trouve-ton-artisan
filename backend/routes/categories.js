
const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');

// GET /api/categories  
router.get('/', categorieController.getAllCategories);

// GET /api/categories/:id  
router.get('/:id', categorieController.getCategorieById);

module.exports = router;
