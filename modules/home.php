<?php if (!defined('DIR_ROOT')) die('Accès direct interdit'); ?>

<!-- Hero Section -->
<div class="relative h-screen">
    <div class="absolute inset-0">
        <img 
            src="https://images.unsplash.com/photo-1540655037529-dec987208707?auto=format&fit=crop&w=1920&q=80"
            alt="Background"
            class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black bg-opacity-60"></div>
    </div>
    
    <div class="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h1 class="text-6xl md:text-8xl font-bold mb-6">ASSOCIATION</h1>
        <h2 class="text-8xl md:text-9xl font-bold mb-8">SQTE</h2>
        <p class="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Créativité, Innovation et Passion
        </p>
    </div>
</div>

<!-- Sections des Pôles -->
<div class="container mx-auto px-4 py-20">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Pôle Audiovisuel -->
        <div class="group relative overflow-hidden">
            <div class="aspect-w-16 aspect-h-9 mb-4">
                <img 
                    src="https://images.unsplash.com/photo-1601506521793-dc748fc80b67?auto=format&fit=crop&w=800&q=80"
                    alt="Pôle Audiovisuel"
                    class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="text-center">
                    <i class="fas fa-film text-4xl mb-4"></i>
                    <h3 class="text-2xl font-bold text-white">PÔLE AUDIOVISUEL</h3>
                </div>
            </div>
        </div>

        <!-- Autres pôles similaires... -->
    </div>
</div>