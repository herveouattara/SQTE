<?php
if (!defined('DIR_CLASS_SYS')) {
    die('Accès direct interdit');
}
?>
<!-- Hero Section -->
<section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
    <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between">
            <div class="md:w-1/2 mb-10 md:mb-0">
                <h1 class="text-4xl md:text-5xl font-bold mb-6">
                    Solutions innovantes pour votre entreprise
                </h1>
                <p class="text-xl mb-8 text-blue-100">
                    Transformez votre vision en réalité avec nos solutions sur mesure
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href="<?php echo BASE_URL; ?>/services" 
                       class="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                        Découvrir nos services
                    </a>
                    <a href="<?php echo BASE_URL; ?>/contact" 
                       class="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                        Nous contacter
                    </a>
                </div>
            </div>
            <div class="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                     alt="Innovation et technologie" 
                     class="rounded-lg shadow-xl">
            </div>
        </div>
    </div>
</section>

<!-- Services Section -->
<section class="py-20 bg-gray-50 dark:bg-gray-800">
    <div class="container mx-auto px-4">
        <div class="text-center mb-16">
            <h2 class="text-3xl font-bold mb-4 dark:text-white">Nos Services</h2>
            <p class="text-gray-600 dark:text-gray-300">Des solutions adaptées à vos besoins</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Service 1 -->
            <div class="bg-white dark:bg-gray-700 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div class="text-blue-600 mb-4">
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold mb-3 dark:text-white">Développement Web</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">
                    Solutions web personnalisées et performantes pour votre entreprise
                </p>
                <a href="<?php echo BASE_URL; ?>/services/web" class="text-blue-600 hover:text-blue-700 font-medium">
                    En savoir plus →
                </a>
            </div>

            <!-- Service 2 -->
            <div class="bg-white dark:bg-gray-700 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div class="text-blue-600 mb-4">
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold mb-3 dark:text-white">Conseil IT</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">
                    Expertise et accompagnement dans votre transformation digitale
                </p>
                <a href="<?php echo BASE_URL; ?>/services/consulting" class="text-blue-600 hover:text-blue-700 font-medium">
                    En savoir plus →
                </a>
            </div>

            <!-- Service 3 -->
            <div class="bg-white dark:bg-gray-700 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div class="text-blue-600 mb-4">
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold mb-3 dark:text-white">Solutions Cloud</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">
                    Infrastructure cloud sécurisée et évolutive
                </p>
                <a href="<?php echo BASE_URL; ?>/services/cloud" class="text-blue-600 hover:text-blue-700 font-medium">
                    En savoir plus →
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Statistiques Section -->
<section class="py-20 bg-white dark:bg-gray-900">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center">
                <div class="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div class="text-gray-600 dark:text-gray-300">Clients satisfaits</div>
            </div>
            <div class="text-center">
                <div class="text-4xl font-bold text-blue-600 mb-2">1000+</div>
                <div class="text-gray-600 dark:text-gray-300">Projets réalisés</div>
            </div>
            <div class="text-center">
                <div class="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div class="text-gray-600 dark:text-gray-300">Experts</div>
            </div>
            <div class="text-center">
                <div class="text-4xl font-bold text-blue-600 mb-2">15+</div>
                <div class="text-gray-600 dark:text-gray-300">Années d'expérience</div>
            </div>
        </div>
    </div>
</section>

<!-- Call to Action -->
<section class="py-20 bg-blue-600">
    <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-8">Prêt à démarrer votre projet ?</h2>
        <a href="<?php echo BASE_URL; ?>/contact" 
           class="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Contactez-nous maintenant
        </a>
    </div>
</section>

<!-- Script pour les animations -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Animation des statistiques
    const stats = document.querySelectorAll('.text-4xl');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    stats.forEach(stat => {
        stat.style.opacity = 0;
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'all 0.6s ease-out';
        observer.observe(stat);
    });
});
</script>