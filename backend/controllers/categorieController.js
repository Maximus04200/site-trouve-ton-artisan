

const { Categorie, Specialite } = require('../models');


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      order: [['nom', 'ASC']]
    });

    res.json(categories);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur serveur lors de la récupération des catégories.' });
  }
};

exports.getCategorieById = async (req, res) => {
  try {
    const { id } = req.params;

    const categorie = await Categorie.findByPk(id, {
      include: [{ model: Specialite, as: 'specialites' }]
    });

    if (!categorie) {
      return res.status(404).json({ erreur: 'Catégorie non trouvée.' });
    }

    res.json(categorie);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur serveur lors de la récupération de la catégorie.' });
  }
};
