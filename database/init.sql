-- Création des tables
CREATE TABLE etablissements (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    client_token VARCHAR(255),
    access_token VARCHAR(255)
);

CREATE TABLE produits_mews (
    id VARCHAR(255) PRIMARY KEY,
    nom VARCHAR(255),
    type_repas VARCHAR(50),
    etablissement_id INTEGER REFERENCES etablissements(id)
);

CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    type_repas VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    nombre INTEGER NOT NULL,
    source VARCHAR(50) NOT NULL,
    etablissement_id INTEGER REFERENCES etablissements(id)
);
