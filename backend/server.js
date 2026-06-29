const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { sequelize } = require('./models');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(helmet());


const originsAutorisees = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {

    if (!origin || originsAutorisees.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origine non autorisée par CORS'));
    }
  }
}));


const limiteur = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { erreur: 'Trop de requêtes, merci de réessayer plus tard.' }
});
app.use(limiteur);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "API Trouve ton artisan - en ligne !" });
});


app.use((req, res) => {
  res.status(404).json({ erreur: 'Route non trouvée' });
});


async function demarrerServeur() {
  try {

    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données réussie.');

    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Impossible de démarrer le serveur :', error.message);
    process.exit(1);
  }
}

demarrerServeur();
