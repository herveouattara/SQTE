-- Base de données SQTE
CREATE DATABASE IF NOT EXISTS sqte;
USE sqte;

-- Table des utilisateurs
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'responsable', 'collaborateur', 'membre') NOT NULL,
    pole VARCHAR(50),
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des actualités
CREATE TABLE news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    date DATE NOT NULL,
    author_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

-- Table des événements
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    max_participants INT NOT NULL,
    image_url VARCHAR(255),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Table des inscriptions aux événements
CREATE TABLE event_registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'pending',
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_registration (event_id, user_id)
);

-- Table des menus
CREATE TABLE menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    link VARCHAR(255) NOT NULL,
    parent_id INT,
    position INT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES menu(id)
);

-- Insertion des données de base
INSERT INTO users (email, password, first_name, last_name, role, is_active) VALUES
('admin@sqte.fr', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'SQTE', 'admin', 1);

-- Insertion des menus
INSERT INTO menu (title, link, parent_id, position) VALUES
('Actualités', '/actualites', NULL, 1),
('Pôles', '#', NULL, 2),
('Pôle Audiovisuel', '/pole-audiovisuel', 2, 1),
('Pôle Média', '/pole-media', 2, 2),
('Pôle Musique', '/pole-musique', 2, 3),
('Événements', '/evenements', NULL, 3),
('Contact', '/contact', NULL, 4);

-- Insertion des actualités de démonstration
INSERT INTO news (title, content, image_url, date) VALUES
('Nouveau projet audiovisuel', 'Lancement d\'un nouveau projet de court-métrage avec nos talents locaux.', 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4', '2024-02-18'),
('Concert de printemps', 'Préparation du grand concert de printemps avec nos musiciens.', 'https://images.unsplash.com/photo-1501612780327-45045538702b', '2024-02-15'),
('Workshop Communication', 'Retour sur le workshop communication organisé la semaine dernière.', 'https://images.unsplash.com/photo-1557804506-669a67965ba0', '2024-02-10');