
const express = require('express');
const router = express.Router();
const specialiteController = require('../controllers/specialiteController');

// GET /api/specialites  
router.get('/', specialiteController.getAllSpecialites);

// GET /api/specialites/:id 
router.get('/:id', specialiteController.getSpecialiteById);

module.exports = router;