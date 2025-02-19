<?php
session_start();

// Vérification de la connexion admin
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administration SQTE</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/admin.css">
</head>
<body class="bg-gray-100">
    <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="w-64 bg-gray-900 text-white">
            <div class="p-6 border-b border-gray-800">
                <h1 class="text-2xl font-bold">SQTE Admin</h1>
                <p class="text-gray-400 text-sm">Panneau d'administration</p>
            </div>
            
            <nav class="mt-6">
                <div class="px-4 space-y-2">
                    <a href="?section=dashboard" class="flex items-center px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors <?php echo (!isset($_GET['section']) || $_GET['section'] === 'dashboard') ? 'bg-blue-600' : ''; ?>">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                        </svg>
                        Tableau de bord
                    </a>
                    <a href="?section=users" class="flex items-center px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors <?php echo (isset($_GET['section']) && $_GET['section'] === 'users') ? 'bg-blue-600' : ''; ?>">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        Utilisateurs
                    </a>
                    <a href="?section=events" class="flex items-center px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors <?php echo (isset($_GET['section']) && $_GET['section'] === 'events') ? 'bg-blue-600' : ''; ?>">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        Événements
                    </a>
                    <a href="?section=pages" class="flex items-center px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors <?php echo (isset($_GET['section']) && $_GET['section'] === 'pages') ? 'bg-blue-600' : ''; ?>">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        Pages
                    </a>
                    <a href="?section=media" class="flex items-center px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors <?php echo (isset($_GET['section']) && $_GET['section'] === 'media') ? 'bg-blue-600' : ''; ?>">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        Médias
                    </a>
                    <a href="?section=settings" class="flex items-center px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors <?php echo (isset($_GET['section']) && $_GET['section'] === 'settings') ? 'bg-blue-600' : ''; ?>">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        Paramètres
                    </a>
                </div>
            </nav>

            <div class="absolute bottom-0 w-64 p-6 border-t border-gray-800">
                <a href="logout.php" class="flex items-center text-red-400 hover:text-red-300 transition-colors">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    Déconnexion
                </a>
            </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 overflow-auto">
            <header class="bg-white shadow-sm">
                <div class="px-6 py-4">
                    <h2 class="text-xl font-semibold text-gray-800">
                        <?php
                        $section = $_GET['section'] ?? 'dashboard';
                        $titles = [
                            'dashboard' => 'Tableau de bord',
                            'users' => 'Gestion des utilisateurs',
                            'events' => 'Gestion des événements',
                            'pages' => 'Gestion des pages',
                            'media' => 'Bibliothèque de médias',
                            'settings' => 'Paramètres'
                        ];
                        echo $titles[$section] ?? 'Tableau de bord';
                        ?>
                    </h2>
                </div>
            </header>

            <main class="p-6">
                <?php
                $section_file = "sections/{$section}.php";
                if (file_exists($section_file)) {
                    include $section_file;
                } else {
                    echo '<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Section non trouvée</div>';
                }
                ?>
            </main>
        </div>
    </div>

    <script src="assets/js/admin.js"></script>
</body>
</html>