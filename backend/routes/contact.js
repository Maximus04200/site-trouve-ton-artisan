
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const contactController = require('../controllers/contactController');

const regleValidation = [
  body('artisanId')
    .notEmpty().withMessage('L\'identifiant de l\'artisan est requis.')
    .isInt().withMessage('L\'identifiant de l\'artisan doit être un nombre.'),

  body('nom')
    .trim()
    .notEmpty().withMessage('Le nom est requis.')
    .isLength({ min: 2, max: 100 }).withMessage('Le nom doit contenir entre 2 et 100 caractères.'),

  body('email')
    .trim()
    .notEmpty().withMessage('L\'email est requis.')
    .isEmail().withMessage('L\'email n\'est pas valide.'),

  body('objet')
    .trim()
    .notEmpty().withMessage('L\'objet est requis.')
    .isLength({ min: 3, max: 150 }).withMessage('L\'objet doit contenir entre 3 et 150 caractères.'),

  body('message')
    .trim()
    .notEmpty().withMessage('Le message est requis.')
    .isLength({ min: 10, max: 2000 }).withMessage('Le message doit contenir entre 10 et 2000 caractères.')
];

function verifierValidation(req, res, next) {
  const erreurs = validationResult(req);

  if (!erreurs.isEmpty()) {
    // On renvoie un 400 (Bad Request) avec le détail des erreurs
    return res.status(400).json({ erreurs: erreurs.array() });
  }

  next(); 
}

router.post('/', regleValidation, verifierValidation, contactController.envoyerContact);

module.exports = router;
