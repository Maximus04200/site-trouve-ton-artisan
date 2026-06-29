
USE trouve_ton_artisan;

-- Nettoyage des données existantes 
DELETE FROM artisan;
DELETE FROM specialite;
DELETE FROM categorie;

-- Réinitialisation des compteurs 
ALTER TABLE artisan AUTO_INCREMENT = 1;
ALTER TABLE specialite AUTO_INCREMENT = 1;
ALTER TABLE categorie AUTO_INCREMENT = 1;


-- INSERTION DES CATÉGORIES (4)
INSERT INTO categorie (nom) VALUES
  ('Bâtiment'),
  ('Services'),
  ('Fabrication'),
  ('Alimentation');


-- INSERTION DES SPÉCIALITÉS 
INSERT INTO specialite (nom, id_categorie) VALUES
  -- Bâtiment (id_categorie = 1)
  ('Chauffagiste', 1),
  ('Electricien', 1),
  ('Menuisier', 1),
  ('Plombier', 1),
  -- Services (id_categorie = 2)
  ('Coiffeur', 2),
  ('Fleuriste', 2),
  ('Toiletteur', 2),
  ('Webdesign', 2),
  -- Fabrication (id_categorie = 3)
  ('Bijoutier', 3),
  ('Couturier', 3),
  ('Ferronier', 3),
  -- Alimentation (id_categorie = 4)
  ('Boucher', 4),
  ('Boulanger', 4),
  ('Chocolatier', 4),
  ('Traiteur', 4);

-- INSERTION DES ARTISANS (17)

SET @lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.';

-- ALIMENTATION
INSERT INTO artisan (nom, note, ville, apropos, email, site_web, top, id_specialite) VALUES
  ('Boucherie Dumont', 4.5, 'Lyon', @lorem, 'boucherie.dumond@gmail.com', NULL, FALSE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Boucher')),

  ('Au pain chaud', 4.8, 'Montélimar', @lorem, 'aupainchaud@hotmail.com', NULL, TRUE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Boulanger')),

  ('Chocolaterie Labbé', 4.9, 'Lyon', @lorem, 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', TRUE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Chocolatier')),

  ('Traiteur Truchon', 4.1, 'Lyon', @lorem, 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', FALSE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Traiteur'));

-- BÂTIMENT
INSERT INTO artisan (nom, note, ville, apropos, email, site_web, top, id_specialite) VALUES
  ('Orville Salmons', 5.0, 'Evian', @lorem, 'o-salmons@live.com', NULL, TRUE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Chauffagiste')),

  ('Mont Blanc Eléctricité', 4.5, 'Chamonix', @lorem, 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', FALSE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Electricien')),

  ('Boutot & fils', 4.7, 'Bourg-en-bresse', @lorem, 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', FALSE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Menuisier')),

  ('Vallis Bellemare', 4.0, 'Vienne', @lorem, 'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', FALSE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Plombier'));

-- FABRICATION
INSERT INTO artisan (nom, note, ville, apropos, email, site_web, top, id_specialite) VALUES
  ('Claude Quinn', 4.2, 'Aix-les-bains', @lorem, 'claude.quinn@gmail.com', NULL, FALSE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Bijoutier')),

  ('Amitee Lécuyer', 4.5, 'Annecy', @lorem, 'a.amitee@hotmail.com', 'https://lecuyer-couture.com', FALSE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Couturier')),

  ('Ernest Carignan', 5.0, 'Le Puy-en-Velay', @lorem, 'e-carigan@hotmail.com', NULL, FALSE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Ferronier'));

-- SERVICES
INSERT INTO artisan (nom, note, ville, apropos, email, site_web, top, id_specialite) VALUES
  ('Royden Charbonneau', 3.8, 'Saint-Priest', @lorem, 'r.charbonneau@gmail.com', NULL, FALSE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Coiffeur')),

  ('Leala Dennis', 3.8, 'Chambéry', @lorem, 'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', FALSE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Coiffeur')),

  ("C'est sup'hair", 4.1, 'Romans-sur-Isère', @lorem, 'sup-hair@gmail.com', 'https://sup-hair.fr', FALSE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Coiffeur')),

  ('Le monde des fleurs', 4.6, 'Annonay', @lorem, 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', FALSE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Fleuriste')),

  ('Valérie Laderoute', 4.5, 'Valence', @lorem, 'v-laredoute@gmail.com', NULL, FALSE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Toiletteur')),

  ('CM Graphisme', 4.4, 'Valence', @lorem, 'contact@cm-graphisme.com', 'https://cm-graphisme.com', FALSE,
    (SELECT id_specialite FROM specialite WHERE nom = 'Webdesign'));


-- VÉRIFICATION DES DONNÉES INSÉRÉES

SELECT 'Catégories' AS Table_, COUNT(*) AS Nombre FROM categorie
UNION ALL
SELECT 'Spécialités', COUNT(*) FROM specialite
UNION ALL
SELECT 'Artisans', COUNT(*) FROM artisan
UNION ALL
SELECT 'Artisans TOP', COUNT(*) FROM artisan WHERE top = TRUE;

-- Affichage des 3 artisans du mois (top = TRUE)
SELECT
  a.nom AS Artisan,
  a.note AS Note,
  a.ville AS Ville,
  s.nom AS Specialite,
  c.nom AS Categorie
FROM artisan a
JOIN specialite s ON a.id_specialite = s.id_specialite
JOIN categorie c ON s.id_categorie = c.id_categorie
WHERE a.top = TRUE
ORDER BY a.note DESC;
