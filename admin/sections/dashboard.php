<?php
// Statistiques de base
$stats = [
    'users' => 156,  // Exemple de données
    'events' => 12,
    'pages' => 24,
    'media' => 89
];

// Dernières activités
$recent_activities = [
    ['type' => 'user', 'description' => 'Nouveau membre : Marie Dupont', 'created_at' => '2024-02-20 14:30:00'],
    ['type' => 'event', 'description' => 'Nouvel événement : Festival de Courts Métrages', 'created_at' => '2024-02-19 16:45:00'],
    ['type' => 'page', 'description' => 'Mise à jour : Page Pôle Audiovisuel', 'created_at' => '2024-02-19 11:20:00']
];
?>

<div class="space-y-6 bg-white p-6 rounded-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h2>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-white/20">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-white/80 text-sm">Utilisateurs</p>
                    <h3 class="text-3xl font-bold"><?php echo $stats['users']; ?></h3>
                </div>
            </div>
        </div>

        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-white/20">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-white/80 text-sm">Événements</p>
                    <h3 class="text-3xl font-bold"><?php echo $stats['events']; ?></h3>
                </div>
            </div>
        </div>

        <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-white/20">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-white/80 text-sm">Pages</p>
                    <h3 class="text-3xl font-bold"><?php echo $stats['pages']; ?></h3>
                </div>
            </div>
        </div>

        <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-white/20">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-white/80 text-sm">Médias</p>
                    <h3 class="text-3xl font-bold"><?php echo $stats['media']; ?></h3>
                </div>
            </div>
        </div>
    </div>

    <!-- Recent Activity -->
    <div class="mt-8">
        <h3 class="text-xl font-bold text-gray-800 mb-6">Activités récentes</h3>
        <div class="bg-white rounded-lg shadow-lg border border-gray-200">
            <div class="divide-y divide-gray-200">
                <?php foreach ($recent_activities as $activity): ?>
                    <div class="p-4 hover:bg-gray-50 transition-colors">
                        <div class="flex items-center">
                            <?php
                            $icon_colors = [
                                'user' => 'text-blue-600 bg-blue-100',
                                'event' => 'text-green-600 bg-green-100',
                                'page' => 'text-purple-600 bg-purple-100'
                            ];
                            $icon_color = $icon_colors[$activity['type']] ?? 'text-gray-600 bg-gray-100';
                            ?>
                            <div class="p-2 rounded-full <?php echo $icon_color; ?>">
                                <?php if ($activity['type'] === 'user'): ?>
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                <?php elseif ($activity['type'] === 'event'): ?>
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                <?php else: ?>
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                    </svg>
                                <?php endif; ?>
                            </div>
                            <div class="ml-4 flex-1">
                                <p class="text-gray-900 font-medium"><?php echo htmlspecialchars($activity['description']); ?></p>
                                <p class="text-sm text-gray-500"><?php echo date('d/m/Y H:i', strtotime($activity['created_at'])); ?></p>
                            </div>
                            <button class="text-gray-400 hover:text-gray-600">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <!-- Quick Actions -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <button class="p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Nouvel événement
        </button>
        <button class="p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Nouvelle page
        </button>
        <button class="p-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
            Ajouter des médias
        </button>
    </div>
</div>