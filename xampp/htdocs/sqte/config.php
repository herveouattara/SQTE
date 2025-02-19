<?php
// Configuration de la base de données
define('DB_HOST', 'localhost');
define('DB_NAME', 'sqte');
define('DB_USER', 'root');
define('DB_PASS', '');

// Configuration du site
define('SITE_NAME', 'SQTE');
define('SITE_URL', 'http://localhost/sqte');
define('SITE_VERSION', '1.0.0');

// Configuration de la sécurité
define('HASH_ALGO', 'sha256');
define('SALT_LENGTH', 32);
define('SECRET_KEY', 'votre_clé_secrète_ici');

// Configuration des sessions
define('SESSION_NAME', 'SQTE_SESSION');
define('SESSION_LIFETIME', 3600);

// Configuration du debug
define('DEBUG_MODE', true);
define('ERROR_REPORTING', E_ALL);