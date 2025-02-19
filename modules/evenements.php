<?php
if (!defined('DIR_CLASS_SYS')) {
    die('Accès direct interdit');
}

// Récupération des événements depuis la base de données
$events = $db->select('*', 'events', [
    'order_by' => ['start_date ASC'],
    'limit' => 6
]);
?>

<div class="min-h-screen bg-black">
    <!-- Hero Section -->
    <div class="relative h-[40vh] bg-center bg-cover"
         style="background-image: url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80')">
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        <div class="absolute inset-0 flex items-center justify-center">
            <h1 class="title text-white text-center">ÉVÉNEMENTS</h1>
        </div>
    </div>

    <!-- Events List -->
    <div class="container mx-auto px-4 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <?php foreach ($events as $event): ?>
                <div class="bg-gray-900 rounded-lg overflow-hidden group">
                    <div class="relative h-48 overflow-hidden">
                        <img
                            src="<?php echo htmlspecialchars($event['image']); ?>"
                            alt="<?php echo htmlspecialchars($event['title']); ?>"
                            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                        <div class="absolute top-0 right-0 bg-white text-black px-4 py-2 font-bold">
                            <?php echo date('d M Y', strtotime($event['start_date'])); ?>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2"><?php echo htmlspecialchars($event['title']); ?></h3>
                        <p class="text-gray-400 mb-4"><?php echo htmlspecialchars($event['description']); ?></p>
                        <div class="flex justify-between items-center text-sm text-gray-500">
                            <span><?php echo htmlspecialchars($event['location']); ?></span>
                            <span><?php echo date('H:i', strtotime($event['start_date'])); ?></span>
                        </div>
                        <form method="POST" action="inscription-evenement.php">
                            <input type="hidden" name="event_id" value="<?php echo $event['id']; ?>">
                            <button type="submit" 
                                    class="mt-4 w-full bg-white text-black py-2 font-bold hover:bg-gray-200 transition-colors">
                                S'INSCRIRE
                            </button>
                        </form>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>