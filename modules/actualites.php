<?php
if (!defined('DIR_CLASS_SYS')) {
    die('Accès direct interdit');
}

// Récupération des actualités depuis la base de données
$actualites = [
    [
        'title' => 'Nouveau projet audiovisuel',
        'date' => '2024-02-18',
        'image' => 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
        'description' => 'Lancement d\'un nouveau projet de court-métrage avec nos talents locaux.'
    ],
    [
        'title' => 'Concert de printemps',
        'date' => '2024-02-15',
        'image' => 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=800&q=80',
        'description' => 'Préparation du grand concert de printemps avec nos musiciens.'
    ],
    [
        'title' => 'Workshop Communication',
        'date' => '2024-02-10',
        'image' => 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
        'description' => 'Retour sur le workshop communication organisé la semaine dernière.'
    ]
];
?>

<div class="min-h-screen bg-black">
    <!-- Hero Section -->
    <div class="relative h-[40vh] bg-center bg-cover"
         style="background-image: url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1920&q=80')">
        <div class="absolute inset-0 bg-black bg-opacity-50" />
        <div class="absolute inset-0 flex items-center justify-center">
            <h1 class="title text-white text-center">ACTUALITÉS</h1>
        </div>
    </div>

    <!-- Actualités -->
    <div class="container mx-auto px-4 py-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <?php foreach ($actualites as $actu): ?>
                <div class="bg-gray-900 rounded-lg overflow-hidden">
                    <div class="relative h-48 overflow-hidden">
                        <img
                            src="<?php echo htmlspecialchars($actu['image']); ?>"
                            alt="<?php echo htmlspecialchars($actu['title']); ?>"
                            class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                        />
                        <div class="absolute top-0 right-0 bg-white text-black px-4 py-2 font-bold">
                            <?php echo date('d/m/Y', strtotime($actu['date'])); ?>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-white mb-2"><?php echo htmlspecialchars($actu['title']); ?></h3>
                        <p class="text-gray-400"><?php echo htmlspecialchars($actu['description']); ?></p>
                        <a href="#" class="inline-block mt-4 text-blue-400 hover:text-blue-300">Lire la suite →</a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>