<?php if (!defined('DIR_ROOT')) die('Accès direct interdit'); ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo SITE_NAME; ?></title>
    <link rel="stylesheet" href="<?php echo SITE_URL; ?>/assets/css/main.css">
    <link rel="stylesheet" href="<?php echo SITE_URL; ?>/assets/css/menu.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-black text-white">
    <header class="relative">
        <!-- Top Bar -->
        <div class="bg-gray-900 text-white py-2">
            <div class="container mx-auto px-4">
                <div class="flex justify-between items-center text-sm">
                    <div class="flex items-center space-x-4">
                        <a href="tel:+33123456789" class="hover:text-blue-400 transition-colors">
                            01 23 45 67 89
                        </a>
                        <a href="mailto:contact@sqte.com" class="hover:text-blue-400 transition-colors">
                            contact@sqte.com
                        </a>
                    </div>
                    <div class="flex items-center space-x-4">
                        <?php if (isset($_SESSION['user_logged_in'])): ?>
                            <a href="<?php echo SITE_URL; ?>/admin" class="hover:text-blue-400">Administration</a>
                            <a href="<?php echo SITE_URL; ?>/logout" class="hover:text-blue-400">Déconnexion</a>
                        <?php else: ?>
                            <a href="<?php echo SITE_URL; ?>/login" class="hover:text-blue-400">Connexion</a>
                            <a href="<?php echo SITE_URL; ?>/register" class="hover:text-blue-400">Inscription</a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Navigation -->
        <nav class="bg-black relative">
            <div class="container mx-auto px-4 py-4">
                <div class="flex justify-between items-center">
                    <a href="<?php echo SITE_URL; ?>" class="text-2xl font-bold text-white">SQTE</a>
                    
                    <!-- Menu principal -->
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="<?php echo SITE_URL; ?>/actualites" class="text-white hover:text-blue-400 transition-colors">
                            ACTUALITÉS
                        </a>
                        
                        <!-- Menu déroulant Pôles -->
                        <div class="relative group">
                            <button class="text-white hover:text-blue-400 transition-colors flex items-center gap-2 py-2 font-bold">
                                PÔLES
                                <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>
                            <div class="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                                <a href="<?php echo SITE_URL; ?>/pole-audiovisuel" class="flex items-center px-6 py-4 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100">
                                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                    </svg>
                                    Pôle Audiovisuel
                                </a>
                                <a href="<?php echo SITE_URL; ?>/pole-media" class="flex items-center px-6 py-4 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100">
                                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                                    </svg>
                                    Pôle Média
                                </a>
                                <a href="<?php echo SITE_URL; ?>/pole-musique" class="flex items-center px-6 py-4 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                                    </svg>
                                    Pôle Musique
                                </a>
                            </div>
                        </div>

                        <a href="<?php echo SITE_URL; ?>/evenements" class="text-white hover:text-blue-400 transition-colors">
                            ÉVÉNEMENTS
                        </a>
                        <a href="<?php echo SITE_URL; ?>/contact" class="text-white hover:text-blue-400 transition-colors">
                            CONTACT
                        </a>
                    </div>

                    <!-- Menu mobile -->
                    <div class="md:hidden">
                        <button id="mobile-menu-button" class="text-white p-2">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Menu mobile panel -->
        <div id="mobile-menu" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50">
            <div class="bg-white w-64 h-full">
                <div class="flex justify-end p-4">
                    <button id="close-mobile-menu" class="text-gray-800 p-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div class="p-4">
                    <a href="<?php echo SITE_URL; ?>/actualites" class="block py-2 text-gray-800">ACTUALITÉS</a>
                    <div class="py-2">
                        <button class="flex items-center justify-between w-full text-gray-800" onclick="this.nextElementSibling.classList.toggle('hidden')">
                            <span>PÔLES</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>
                        <div class="hidden pl-4 py-2 space-y-2">
                            <a href="<?php echo SITE_URL; ?>/pole-audiovisuel" class="block text-gray-600 hover:text-blue-600">Pôle Audiovisuel</a>
                            <a href="<?php echo SITE_URL; ?>/pole-media" class="block text-gray-600 hover:text-blue-600">Pôle Média</a>
                            <a href="<?php echo SITE_URL; ?>/pole-musique" class="block text-gray-600 hover:text-blue-600">Pôle Musique</a>
                        </div>
                    </div>
                    <a href="<?php echo SITE_URL; ?>/evenements" class="block py-2 text-gray-800">ÉVÉNEMENTS</a>
                    <a href="<?php echo SITE_URL; ?>/contact" class="block py-2 text-gray-800">CONTACT</a>
                </div>
            </div>
        </div>
    </header>
</body>
</html>