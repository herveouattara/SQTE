<?php
if (!defined('DIR_ROOT')) {
    die('Accès direct interdit');
}

// Configuration de la base de données
return [
    'db' => [
        'host' => DB_HOST,
        'name' => DB_NAME,
        'user' => DB_USER,
        'pass' => DB_PASS
    ],
    'site' => [
        'name' => SITE_NAME,
        'url' => SITE_URL,
        'version' => SITE_VERSION
    ],
    'security' => [
        'hash_algo' => HASH_ALGO,
        'salt_length' => SALT_LENGTH
    ],
    'session' => [
        'name' => SESSION_NAME,
        'lifetime' => SESSION_LIFETIME
    ],
    'debug' => [
        'enabled' => DEBUG_MODE,
        'error_reporting' => ERROR_REPORTING
    ]
];