// =====================================================
// controllers/specialiteController.js
// Logique métier liée aux spécialités
// (Boucher, Plombier, Coiffeur, etc.)
// =====================================================

const { Specialite, Categorie, Artisan } = require('../models');

// -----------------------------------------------------
// GET /api/specialites
// Récupère toutes les spécialités, avec leur catégorie parente
// -----------------------------------------------------
exports.getAllSpecialites = async (req, res) => {
  try {
    const specialites = await Specialite.findAll({
      include: [{ model: Categorie, as: 'categorie' }],
      order: [['nom', 'ASC']]
    });

    res.json(specialites);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur serveur lors de la récupération des spécialités.' });
  }
};

// -----------------------------------------------------
// GET /api/specialites/:id
// Récupère une spécialité précise AVEC tous ses artisans
// -----------------------------------------------------
exports.getSpecialiteById = async (req, res) => {
  try {
    const { id } = req.params;

    const specialite = await Specialite.findByPk(id, {
      include: [
        { model: Categorie, as: 'categorie' },
        { model: Artisan, as: 'artisans' }
      ]
    });

    if (!specialite) {
      return res.status(404).json({ erreur: 'Spécialité non trouvée.' });
    }

    res.json(specialite);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur serveur lors de la récupération de la spécialité.' });
  }
};
