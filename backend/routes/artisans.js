

const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisanController');

// GET /api/artisans/top 
router.get('/top', artisanController.getTopArtisans);

// GET /api/artisans/search?q=...  → recherche par nom
router.get('/search', artisanController.searchArtisans);

// GET /api/artisans/categorie/:filtré par catégorie
router.get('/categorie/:nomCategorie', artisanController.getArtisansByCategorie);

// GET /api/artisans  → tous les artisans
router.get('/', artisanController.getAllArtisans);

// GET /api/artisans/:id  → un artisan précis 
router.get('/:id', artisanController.getArtisanById);

module.exports = router;
