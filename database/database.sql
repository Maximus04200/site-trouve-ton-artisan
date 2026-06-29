
-- Suppression si existe déjà (pour réinitialiser)
DROP DATABASE IF EXISTS trouve_ton_artisan;

-- Création de la base de données avec encodage UTF-8 (caractères accentués)
CREATE DATABASE trouve_ton_artisan
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

-- TABLE : categorie
-- 4 catégories : Bâtiment, Services, Fabrication, Alimentation
CREATE TABLE categorie (
  id_categorie INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- TABLE : specialite

CREATE TABLE specialite (
  id_specialite INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  id_categorie INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- TABLE : artisan

CREATE TABLE artisan (
  id_artisan INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  note DECIMAL(2,1) CHECK (note >= 0 AND note <= 5),
  ville VARCHAR(100) NOT NULL,
  apropos TEXT,
  email VARCHAR(150) NOT NULL,
  site_web VARCHAR(255) DEFAULT NULL,
  top BOOLEAN DEFAULT FALSE,
  id_specialite INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_specialite) REFERENCES specialite(id_specialite)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_artisan_nom ON artisan(nom);
CREATE INDEX idx_artisan_top ON artisan(top);
CREATE INDEX idx_artisan_specialite ON artisan(id_specialite);
CREATE INDEX idx_specialite_categorie ON specialite(id_categorie);
