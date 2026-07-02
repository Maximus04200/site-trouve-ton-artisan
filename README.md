# Trouve ton artisan 🔨
### Avec la région Auvergne-Rhône-Alpes

Plateforme web permettant aux particuliers de trouver facilement un artisan
de la région Auvergne-Rhône-Alpes et de le contacter via un formulaire.

---

## 📖 Sommaire

1. [Présentation du projet](#présentation)
2. [Technologies utilisées](#technologies)
3. [Architecture du projet](#architecture)
4. [Prérequis](#prérequis)
5. [Installation et lancement](#installation)
6. [Sécurité mise en place](#sécurité)
7. [Base de données](#base-de-données)
8. [Liens utiles](#liens)

---

## 📌 Présentation

Ce projet a été réalisé dans le cadre du titre professionnel
**Développeur Web** au Centre Européen de Formation (CEF).

**Le client** : La région Auvergne-Rhône-Alpes souhaitait une plateforme
permettant aux particuliers de :
- Trouver un artisan par catégorie (Bâtiment, Services, Fabrication, Alimentation)
- Rechercher un artisan par son nom
- Consulter sa fiche détaillée
- Le contacter directement par email via un formulaire

---

## 🛠️ Technologies

### Frontend
| Technologie | Version | Pourquoi | Documentation |
|---|---|---|---|
| **React** | 19 | Bibliothèque JavaScript pour créer des interfaces dynamiques. Choisi car c'est le standard du marché et demandé dans le brief. | https://react.dev |
| **Vite** | 8 | Outil de build ultra-rapide pour les projets React. Remplace Create React App (déprécié). | https://vite.dev |
| **Bootstrap** | 5.3 | Framework CSS qui fournit une grille responsive et des composants prêts à l'emploi (boutons, cards, formulaires). | https://getbootstrap.com |
| **Sass** | 1.101 | Préprocesseur CSS qui permet d'utiliser des variables, de l'imbrication, des fonctions dans le CSS. On l'utilise pour personnaliser les couleurs de Bootstrap. | https://sass-lang.com |
| **React Router** | 7 | Gestion de la navigation entre les pages sans rechargement. Permet aussi la page 404 avec `path="*"`. | https://reactrouter.com |
| **react-helmet-async** | - | Permet de modifier dynamiquement le `<title>` et les balises `<meta>` de chaque page pour le référencement (SEO). | https://github.com/staylor/react-helmet-async |

### Backend
| Technologie | Version | Pourquoi | Documentation |
|---|---|---|---|
| **Node.js** | 24 | Environnement d'exécution JavaScript côté serveur. Permet de créer l'API REST. | https://nodejs.org |
| **Express** | 5.2 | Framework minimaliste pour Node.js. Simplifie la création de routes HTTP (GET, POST...). | https://expressjs.com |
| **Sequelize** | - | ORM (Object-Relational Mapping) : traduit les requêtes JavaScript en SQL. Évite les injections SQL. | https://sequelize.org |
| **mysql2** | - | Driver technique qui connecte Node.js à MySQL/MariaDB. Utilisé par Sequelize en interne. | https://github.com/sidorares/node-mysql2 |
| **dotenv** | - | Charge les variables d'environnement depuis un fichier `.env`. Permet de ne jamais écrire les mots de passe dans le code. | https://github.com/motdotla/dotenv |
| **cors** | - | Middleware qui autorise les requêtes cross-origin. Sans lui, le navigateur bloquerait les appels du frontend vers le backend. | https://github.com/expressjs/cors |
| **helmet** | - | Ajoute automatiquement des en-têtes HTTP de sécurité (anti-clickjacking, anti-XSS...). | https://helmetjs.github.io |
| **express-validator** | - | Valide et nettoie les données reçues dans les formulaires avant de les traiter. | https://express-validator.github.io |
| **express-rate-limit** | - | Limite le nombre de requêtes par IP (100 requêtes/15 min). Protège contre le spam et les attaques brute-force. | https://github.com/express-rate-limit/express-rate-limit |
| **nodemailer** | - | Envoie des emails depuis Node.js. Utilisé pour le formulaire de contact. | https://nodemailer.com |

### Base de données
| Technologie | Pourquoi |
|---|---|
| **MySQL / MariaDB** | Base de données relationnelle. Choisi car demandé dans le brief et bien supporté par Sequelize. |

### Hébergement
| Service | Usage | URL |
|---|---|---|
| **Vercel** | Frontend React | https://site-trouve-ton-artisan-kxcm.vercel.app |
| **Railway** | Backend Node.js + BDD MySQL | https://railway.app |

### Versionning
| Outil | Pourquoi |
|---|---|
| **Git** | Système de contrôle de version. Permet de garder l'historique des modifications et de revenir en arrière. |
| **GitHub** | Hébergement du code en ligne. Permet la collaboration et est requis pour le livrable. |

---

## 📁 Architecture du projet

site-trouve-ton-artisan/
│
├── database/                    # Scripts SQL
│   ├── database.sql             # Création des 3 tables (categorie, specialite, artisan)
│   ├── seed_database.sql        # Insertion des données (4 catégories, 12 spécialités, 17 artisans)
│   ├── MCD.png                  # Modèle Conceptuel de Données
│   └── MLD.png                  # Modèle Logique de Données
│
├── backend/                     # API REST Node.js/Express
│   ├── config/
│   │   ├── database.js          # Connexion Sequelize à MySQL
│   │   └── mailer.js            # Configuration Nodemailer (envoi emails)
│   ├── models/
│   │   ├── Artisan.js           # Modèle Sequelize de la table artisan
│   │   ├── Categorie.js         # Modèle Sequelize de la table categorie
│   │   ├── Specialite.js        # Modèle Sequelize de la table specialite
│   │   └── index.js             # Relations entre les modèles (1-N)
│   ├── controllers/
│   │   ├── artisanController.js # Logique métier artisans
│   │   ├── categorieController.js
│   │   ├── specialiteController.js
│   │   └── contactController.js # Logique envoi email
│   ├── routes/
│   │   ├── artisans.js          # GET /api/artisans, /top, /search, /:id
│   │   ├── categories.js        # GET /api/categories
│   │   ├── specialites.js       # GET /api/specialites
│   │   └── contact.js           # POST /api/contact
│   ├── .env                     # Variables secrètes (NE PAS COMMITTER)
│   ├── .env.example             # Template des variables nécessaires
│   └── server.js                # Point d'entrée : middlewares + routes + démarrage
│
├── frontend/                    # Application React
│   ├── public/
│   │   ├── logo.png             # Logo du site
│   │   └── favicon.png          # Favicon (onglet navigateur)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx       # Navigation + menu dynamique BDD + recherche
│   │   │   └── Footer.jsx       # Adresse Lyon + liens légaux
│   │   ├── pages/
│   │   │   ├── Accueil.jsx      # Étapes + artisans du mois
│   │   │   ├── ListeArtisans.jsx# Cards filtrées par catégorie/recherche
│   │   │   ├── FicheArtisan.jsx # Détail artisan + formulaire contact
│   │   │   ├── NotFound.jsx     # Page 404
│   │   │   └── PageLegale.jsx   # Pages légales (en construction)
│   │   ├── services/
│   │   │   └── api.js           # Fonctions centralisées pour appeler l'API
│   │   ├── styles/
│   │   │   ├── _variables.scss  # Couleurs officielles du brief
│   │   │   └── main.scss        # Styles personnalisés + import Bootstrap
│   │   ├── App.jsx              # Router + Header + Routes + Footer
│   │   └── main.jsx             # Point d'entrée React
│   ├── .env.production          # URL API en production
│   └── vercel.json              # Config déploiement Vercel
│

---

## ⚙️ Prérequis

Avant d'installer le projet, vous devez avoir :

- **Node.js** v18 ou supérieur → https://nodejs.org
  *(Pour vérifier : `node --version` dans le terminal)*
- **npm** (installé avec Node.js)
  *(Pour vérifier : `npm --version`)*
- **MySQL ou MariaDB** → https://mariadb.org
  *(Ou utiliser Docker : `docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8.0`)*
- **Git** → https://git-scm.com

---

## 🚀 Installation et lancement

### 1. Cloner le projet

```bash
git clone https://github.com/Maximus04200/site-trouve-ton-artisan.git
cd site-trouve-ton-artisan
```

### 2. Créer la base de données

```bash
# Se connecter à MySQL
mysql -u root -p

# Dans MySQL, créer la base
CREATE DATABASE trouve_ton_artisan;
EXIT;

# Importer la structure des tables
mysql -u root -p trouve_ton_artisan < database/database.sql

# Importer les données (4 catégories, 12 spécialités, 17 artisans)
mysql -u root -p trouve_ton_artisan < database/seed_database.sql
```

### 3. Configurer et lancer le backend

```bash
cd backend

# Copier le fichier de configuration
cp .env.example .env

# Ouvrir .env et remplir les valeurs
nano .env
```

Contenu du `.env` à remplir :
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASSWORD=VOTRE_MOT_DE_PASSE_MYSQL

PORT=3000

EMAIL_USER=votre.email@gmail.com
EMAIL_PASSWORD=votre_mot_de_passe_application_gmail

FRONTEND_URL=http://localhost:5173
```

> 💡 **Comment obtenir un mot de passe d'application Gmail ?**
> 1. Activez la vérification en 2 étapes sur votre compte Google
> 2. Allez sur https://myaccount.google.com/apppasswords
> 3. Créez un mot de passe d'application, copiez le code de 16 caractères

```bash
# Installer les dépendances
npm install

# Lancer le serveur (Terminal 1)
node server.js
```

Le backend est accessible sur `http://localhost:3000`

### 4. Configurer et lancer le frontend

```bash
# Ouvrir un nouveau terminal
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement (Terminal 2)
npm run dev
```

Le site est accessible sur `http://localhost:5173`

### 5. Tester que tout fonctionne

Ouvrez `http://localhost:5173` dans votre navigateur. Vous devriez voir :
- Le menu avec les 4 catégories chargées depuis la base de données
- Les 3 artisans du mois sur la page d'accueil
- La possibilité de cliquer sur un artisan et d'envoyer un formulaire

---

## 🔐 Sécurité mise en place

### 1. Variables d'environnement (dotenv)
**Quoi ?** Les informations sensibles (mot de passe BDD, clé email) ne sont jamais écrites dans le code.
**Comment ?** Stockées dans un fichier `.env` qui est dans le `.gitignore` → jamais envoyé sur GitHub.
**Pourquoi ?** Si quelqu'un accède au code source, il ne peut pas récupérer les mots de passe.
**Source :** https://github.com/motdotla/dotenv

### 2. Helmet (en-têtes HTTP de sécurité)
**Quoi ?** Ajoute automatiquement des en-têtes HTTP qui protègent contre plusieurs attaques courantes.
**Comment ?** `app.use(helmet())` dans `server.js` — une seule ligne active toutes les protections.
**Quelles protections ?**
- `X-Frame-Options: SAMEORIGIN` → empêche le clickjacking (intégrer le site dans une iframe malveillante)
- `X-Content-Type-Options: nosniff` → empêche le navigateur de deviner le type de fichier
- `Content-Security-Policy` → limite les sources de scripts autorisées
**Source :** https://helmetjs.github.io

### 3. CORS limité (Cross-Origin Resource Sharing)
**Quoi ?** Par défaut, les navigateurs bloquent les requêtes entre deux origines différentes (frontend ≠ backend).
**Comment ?** On configure CORS pour n'autoriser QUE l'URL de notre frontend React.
**Pourquoi ?** Si quelqu'un crée un faux site qui essaie d'appeler notre API, le navigateur le bloquera.
**Source :** https://developer.mozilla.org/fr/docs/Web/HTTP/CORS

### 4. Rate Limiting (limitation de requêtes)
**Quoi ?** Chaque adresse IP est limitée à 100 requêtes toutes les 15 minutes.
**Comment ?** Middleware `express-rate-limit` appliqué à toutes les routes.
**Pourquoi ?** Protège contre le spam, les attaques par force brute, et la surcharge du serveur.
**Source :** https://github.com/express-rate-limit/express-rate-limit

### 5. Validation des données (express-validator)
**Quoi ?** Vérifie que les données envoyées par le formulaire de contact sont valides AVANT de les traiter.
**Comment ?** On vérifie que l'email a le bon format, que les champs ne sont pas vides, que le message fait entre 10 et 2000 caractères.
**Pourquoi ?** Empêche l'envoi de données malveillantes ou incomplètes au serveur.
**Source :** https://express-validator.github.io

### 6. Protection contre les injections SQL (Sequelize ORM)
**Quoi ?** Une injection SQL consiste à insérer du code SQL malveillant dans un champ de formulaire.
**Comment ?** Sequelize utilise des "requêtes préparées" (paramètres échappés automatiquement).
**Exemple :** Au lieu de `SELECT * FROM artisan WHERE nom = '${input}'`, Sequelize fait `WHERE nom = ?` et passe la valeur séparément.
**Pourquoi ?** Rend les injections SQL impossibles, même si l'utilisateur entre du code malveillant.
**Source :** https://sequelize.org/docs/v6/core-concepts/raw-queries/#replacements

### 7. HTTPS en production
**Quoi ?** Le site et l'API utilisent HTTPS (connexion chiffrée) en production.
**Comment ?** Vercel et Railway gèrent automatiquement les certificats SSL.
**Pourquoi ?** Les données échangées (formulaires, réponses API) sont chiffrées et ne peuvent pas être interceptées.

---

## 🗄️ Base de données

### Modèle Conceptuel (MCD)
3 entités avec des relations 1-N :
- Une catégorie contient plusieurs spécialités
- Une spécialité contient plusieurs artisans
- Un artisan appartient à une seule spécialité (et donc une seule catégorie)

### Tables
- **categorie** : 4 entrées (Bâtiment, Services, Fabrication, Alimentation)
- **specialite** : 12 entrées (Plombier, Électricien, Coiffeur, Boucher...)
- **artisan** : 17 entrées avec nom, note, ville, email, à propos, site web

### Routes API disponibles
| Méthode | URL | Description |
|---|---|---|
| GET | `/api/categories` | Les 4 catégories (pour le menu) |
| GET | `/api/artisans` | Tous les artisans |
| GET | `/api/artisans/top` | Les 3 artisans du mois |
| GET | `/api/artisans/search?q=nom` | Recherche par nom |
| GET | `/api/artisans/categorie/:nom` | Artisans d'une catégorie |
| GET | `/api/artisans/:id` | Un artisan précis |
| POST | `/api/contact` | Envoyer un email à un artisan |

---

## 🔗 Liens utiles

- **Site en ligne :** https://site-trouve-ton-artisan-kxcm.vercel.app
- **API en ligne :** https://site-trouve-ton-artisan-production.up.railway.app
- **Repository GitHub :** https://github.com/Maximus04200/site-trouve-ton-artisan
- **Maquettes Figma :** [Lien vers tes maquettes Figma]

---

Ce Readme as été écrit par une ia pour une meilleur explication et une meilleur Compréhension du lecteur

## 👨‍💻 Auteur

Projet réalisé dans le cadre du titre professionnel Développeur Web — CEF 2026