<?php
// Directories for class definitions
defined('DIR_CLASS_SYS') ?: define('DIR_CLASS_SYS', MAIN_DIRECTORY . '/includes/classes/System'); // Directory for system-level classes
defined('DIR_CLASS_GEN') ?: define('DIR_CLASS_GEN', MAIN_DIRECTORY . '/includes/classes/Generic'); // Directory for generic/reusable classes
defined('DIR_CLASS_SPE') ?: define('DIR_CLASS_SPE', MAIN_DIRECTORY . '/includes/classes/Specific'); // Directory for specific/project-related classes

// Directories for function definitions
defined('DIR_FUNC_SYS') ?: define('DIR_FUNC_SYS', MAIN_DIRECTORY . '/includes/functions/System'); // Directory for system-level functions
defined('DIR_FUNC_GEN') ?: define('DIR_FUNC_GEN', MAIN_DIRECTORY . '/includes/functions/Generic'); // Directory for generic/reusable functions
defined('DIR_FUNC_SPE') ?: define('DIR_FUNC_SPE', MAIN_DIRECTORY . '/includes/functions/Specific'); // Directory for specific/project-related functions

// Directory for modules
defined('DIR_MODULES') ?: define('DIR_MODULES', MAIN_DIRECTORY . '/modules'); // Directory for modules or components

// Directory for uploads
defined('DIR_UPLOADS') ?: define('DIR_UPLOADS', MAIN_DIRECTORY . '/uploads'); // Directory for uploaded files

// Directories for frontend assets
defined('AJAX') ?: define('AJAX', MAIN_DIRECTORY . '/assets/ajax'); // Directory for AJAX scripts or handlers
defined('CSS') ?: define('CSS', MAIN_DIRECTORY . '/assets/css'); // Directory for stylesheets (CSS files)
defined('IMG') ?: define('IMG', MAIN_DIRECTORY . '/assets/img'); // Directory for image assets
defined('JS') ?: define('JS', MAIN_DIRECTORY . '/assets/js'); // Directory for JavaScript files
defined('LIBS') ?: define('LIBS', MAIN_DIRECTORY . '/assets/libs'); // Directory for external libraries
defined('MEDIA') ?: define('MEDIA', MAIN_DIRECTORY . '/assets/media'); // Directory for media files (videos, audio, etc.)

// Directories for admin pannel
defined('ADMIN') ?: define('ADMIN', MAIN_DIRECTORY . '/assets/admin'); // Directory for ADMIN Panel

// File for header site
defined('HEADER') ?: define('HEADER', MAIN_DIRECTORY . '/includes/header.php');

// File for menu site
defined('MENU') ?: define('MENU', MAIN_DIRECTORY . '/includes/menu.php');

// File for main page
defined('MAIN') ?: define('MAIN', MAIN_DIRECTORY . '/includes/main.php');

// File for footer site
defined('FOOTER') ?: define('FOOTER', MAIN_DIRECTORY . '/includes/footer.php');

// Application constants
define('APP_NAME', 'SQTE');
define('APP_VERSION', '1.0.0');

// Database constants
define('DB_PREFIX', 'sqte_');

// Security constants
define('HASH_ALGO', 'sha256');
define('SALT_LENGTH', 32);

// Session constants
define('SESSION_LIFETIME', 3600); // 1 hour
define('SESSION_NAME', 'SQTE_SESSION');

// Pagination constants
define('ITEMS_PER_PAGE', 10);

// Environment constants
define('ENV_PROD', 'prod');
define('ENV_PP', 'pp');
define('ENV_DEV', 'dev');

// Debug constants
define('DEBUG_MODE', true);
define('LOG_ERRORS', true);
define('ERROR_LOG_PATH', MAIN_DIRECTORY . '/logs/error.log');