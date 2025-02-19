<?php
session_start();

// Définition des constantes de base
define('DIR_ROOT', __DIR__);
define('DIR_INCLUDES', DIR_ROOT . '/includes');
define('DIR_MODULES', DIR_ROOT . '/modules');
define('DIR_ASSETS', DIR_ROOT . '/assets');

// Chargement de la configuration
require_once DIR_INCLUDES . '/config.php';

// Configuration des erreurs
error_reporting(ERROR_REPORTING);
ini_set('display_errors', DEBUG_MODE ? 1 : 0);

try {
    // Chargement des classes système
    require_once DIR_INCLUDES . '/System/database.php';
    require_once DIR_INCLUDES . '/System/security.php';

    // Initialisation de la base de données
    $db = Database::getInstance();
    
    if ($db->isDemoMode()) {
        // Afficher un message en mode démo
        echo '<div style="background-color: #fef3c7; border: 1px solid #f59e0b; color: #92400e; padding: 1rem; margin: 1rem; border-radius: 0.375rem;">
            Mode démonstration actif - Base de données non disponible
        </div>';
    }
    
    // Chargement de la page
    require_once DIR_INCLUDES . '/header.php';
    require_once DIR_INCLUDES . '/main.php';
    require_once DIR_INCLUDES . '/footer.php';
} catch (Exception $e) {
    if (DEBUG_MODE) {
        echo "Erreur : " . $e->getMessage();
    } else {
        error_log($e->getMessage());
        echo "Une erreur est survenue. Veuillez réessayer plus tard.";
    }
}
?>