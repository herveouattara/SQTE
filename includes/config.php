<?php
// Configuration de la base de données
define('DB_HOST', 'localhost');
define('DB_NAME', 'sqte');
define('DB_USER', 'root');
define('DB_PASS', '');

// Configuration du site
define('SITE_NAME', 'SQTE');
define('SITE_URL', 'http://localhost:8080/sqte');
define('SITE_VERSION', '1.0.0');

// Configuration des emails
define('MAIL_HOST', 'smtp.example.com');
define('MAIL_PORT', 587);
define('MAIL_USER', 'noreply@sqte.com');
define('MAIL_PASS', 'your-password');

// Configuration de la sécurité
define('HASH_ALGO', 'sha256');
define('SALT_LENGTH', 32);

// Configuration des sessions
define('SESSION_NAME', 'SQTE_SESSION');
define('SESSION_LIFETIME', 3600);

// Configuration du debug
define('DEBUG_MODE', true);
define('ERROR_REPORTING', E_ALL);
ini_set('display_errors', DEBUG_MODE ? 1 : 0);
error_reporting(ERROR_REPORTING);
?>