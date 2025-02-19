<?php
if (!defined('DIR_CLASS_SYS')) {
    die('Accès direct interdit');
}

// Configuration de la table et des colonnes
$table = 'menu';
$columns = '*';
$params = [
    'order_by' => [
        'position ASC' // Tri par position en ordre croissant
    ]
];

// Récupération des menus depuis la base de données
$menu = $db->select($columns, $table, $params);

// Organisation des menus par parent
$menuTree = [];
foreach ($menu as $item) {
    if (!$item['parent_id']) {
        $menuTree[$item['id']] = $item;
        $menuTree[$item['id']]['children'] = [];
    } else {
        $menuTree[$item['parent_id']]['children'][] = $item;
    }
}
?>

<!-- Menu principal -->
<nav class="hidden md:flex items-center space-x-6">
    <?php foreach ($menuTree as $item): ?>
        <?php if (empty($item['children'])): ?>
            <a href="<?php echo SITE_URL . $item['link']; ?>" class="text-white hover:text-gray-300 transition-colors">
                <?php echo htmlspecialchars($item['title']); ?>
            </a>
        <?php else: ?>
            <div class="relative group">
                <button class="text-white hover:text-gray-300 transition-colors flex items-center gap-2">
                    <?php echo htmlspecialchars($item['title']); ?>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>
                <div class="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <?php foreach ($item['children'] as $child): ?>
                        <a href="<?php echo SITE_URL . $child['link']; ?>" 
                           class="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
                            <?php echo htmlspecialchars($child['title']); ?>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>
    <?php endforeach; ?>
</nav>

<!-- Menu mobile -->
<div class="md:hidden">
    <button id="mobile-menu-button" class="text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
    </button>
    
    <div id="mobile-menu" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50">
        <div class="bg-gray-900 w-64 h-full">
            <div class="p-4">
                <button id="close-mobile-menu" class="text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            
            <nav class="px-4">
                <?php foreach ($menuTree as $item): ?>
                    <?php if (empty($item['children'])): ?>
                        <a href="<?php echo SITE_URL . $item['link']; ?>" 
                           class="block py-2 text-white hover:text-gray-300">
                            <?php echo htmlspecialchars($item['title']); ?>
                        </a>
                    <?php else: ?>
                        <div class="py-2">
                            <button class="text-white hover:text-gray-300 w-full text-left flex items-center justify-between"
                                    onclick="this.nextElementSibling.classList.toggle('hidden')">
                                <?php echo htmlspecialchars($item['title']); ?>
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>
                            <div class="hidden pl-4 mt-2 space-y-2">
                                <?php foreach ($item['children'] as $child): ?>
                                    <a href="<?php echo SITE_URL . $child['link']; ?>" 
                                       class="block py-2 text-gray-300 hover:text-white">
                                        <?php echo htmlspecialchars($child['title']); ?>
                                    </a>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    <?php endif; ?>
                <?php endforeach; ?>
            </nav>
        </div>
    </div>
</div>