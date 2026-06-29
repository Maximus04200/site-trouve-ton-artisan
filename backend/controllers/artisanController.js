

const { Artisan, Specialite, Categorie } = require('../models');
const { Op } = require('sequelize'); // Op = "Operators", pour les recherches type LIKE

exports.getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: [
        {
          model: Specialite,
          as: 'specialite',
          include: [{ model: Categorie, as: 'categorie' }]
        }
      ],
      order: [['nom', 'ASC']] // tri alphabétique
    });

    res.json(artisans);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur serveur lors de la récupération des artisans.' });
  }
};

exports.getTopArtisans = async (req, res) => {
  try {
    const topArtisans = await Artisan.findAll({
      where: { top: true },
      include: [
        {
          model: Specialite,
          as: 'specialite',
          include: [{ model: Categorie, as: 'categorie' }]
        }
      ],
      order: [['note', 'DESC']]
    });

    res.json(topArtisans);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur serveur lors de la récupération des artisans du mois.' });
  }
};

exports.searchArtisans = async (req, res) => {
  try {
    const { q } = req.query; // ?q=dumont → req.query.q = "dumont"

    if (!q || q.trim() === '') {
      return res.status(400).json({ erreur: 'Le paramètre de recherche "q" est requis.' });
    }

    const resultats = await Artisan.findAll({
      where: {
        nom: { [Op.like]: `%${q}%` } // LIKE '%dumont%' → recherche partielle, insensible à la position
      },
      include: [
        {
          model: Specialite,
          as: 'specialite',
          include: [{ model: Categorie, as: 'categorie' }]
        }
      ]
    });

    res.json(resultats);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur serveur lors de la recherche.' });
  }
};


exports.getArtisansByCategorie = async (req, res) => {
  try {
    const { nomCategorie } = req.params;

    const artisans = await Artisan.findAll({
      include: [
        {
          model: Specialite,
          as: 'specialite',
          required: true, 
          include: [
            {
              model: Categorie,
              as: 'categorie',
              required: true,
              where: { nom: nomCategorie } 
            }
          ]
        }
      ]
    });

    res.json(artisans);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur serveur lors de la récupération par catégorie.' });
  }
};


exports.getArtisanById = async (req, res) => {
  try {
    const { id } = req.params;

    const artisan = await Artisan.findByPk(id, {
      include: [
        {
          model: Specialite,
          as: 'specialite',
          include: [{ model: Categorie, as: 'categorie' }]
        }
      ]
    });

    if (!artisan) {
      return res.status(404).json({ erreur: 'Artisan non trouvé.' });
    }

    res.json(artisan);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur serveur lors de la récupération de l\'artisan.' });
  }
};
