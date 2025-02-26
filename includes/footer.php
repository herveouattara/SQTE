<?php if (!defined('DIR_ROOT')) die('Accès direct interdit'); ?>
    <footer class="bg-gray-900 py-8">
        <div class="container mx-auto px-4">
            <!-- Logo et description -->
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-white mb-2">SQTE</h2>
                <p class="text-gray-400">Association culturelle à Mantes-la-Ville</p>
            </div>

            <!-- Grille d'informations -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <!-- Contact -->
                <div>
                    <h3 class="text-white font-bold mb-4">Contact</h3>
                    <ul class="text-gray-400 space-y-2">
                        <li>123 Rue de l'Association</li>
                        <li>78711 Mantes-la-Ville</li>
                        <li>Tél : 01 23 45 67 89</li>
                        <li>Email : contact@sqte.fr</li>
                    </ul>
                </div>

                <!-- Liens rapides -->
                <div>
                    <h3 class="text-white font-bold mb-4">Liens rapides</h3>
                    <ul class="text-gray-400 space-y-2">
                        <li><a href="<?php echo SITE_URL; ?>/actualites" class="hover:text-white">Actualités</a></li>
                        <li><a href="<?php echo SITE_URL; ?>/evenements" class="hover:text-white">Événements</a></li>
                        <li><a href="<?php echo SITE_URL; ?>/contact" class="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                <!-- Pôles -->
                <div>
                    <h3 class="text-white font-bold mb-4">Nos pôles</h3>
                    <ul class="text-gray-400 space-y-2">
                        <li><a href="<?php echo SITE_URL; ?>/pole-audiovisuel" class="hover:text-white">Pôle Audiovisuel</a></li>
                        <li><a href="<?php echo SITE_URL; ?>/pole-media" class="hover:text-white">Pôle Média</a></li>
                        <li><a href="<?php echo SITE_URL; ?>/pole-musique" class="hover:text-white">Pôle Musique</a></li>
                    </ul>
                </div>

                <!-- Informations légales -->
                <div>
                    <h3 class="text-white font-bold mb-4">Informations</h3>
                    <ul class="text-gray-400 space-y-2">
                        <li><a href="<?php echo SITE_URL; ?>/mentions-legales" class="hover:text-white">Mentions légales</a></li>
                        <li><a href="<?php echo SITE_URL; ?>/informations" class="hover:text-white">Informations</a></li>
                    </ul>
                </div>
            </div>

            <!-- Réseaux sociaux -->
            <div class="flex justify-center space-x-6 mb-8">
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                    </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
                    </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                </a>
            </div>

            <!-- Copyright -->
            <div class="text-center text-gray-400 text-sm">
                <p>&copy; <?php echo date('Y'); ?> <?php echo SITE_NAME; ?>. Tous droits réservés.</p>
            </div>
        </div>
    </footer>

    <script>
        // Menu mobile
        document.getElementById('mobile-menu-button')?.addEventListener('click', () => {
            document.getElementById('mobile-menu')?.classList.remove('hidden');
        });

        document.getElementById('close-mobile-menu')?.addEventListener('click', () => {
            document.getElementById('mobile-menu')?.classList.add('hidden');
        });
    </script>
</body>
</html>