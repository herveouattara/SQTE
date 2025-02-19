<?php
if (!defined('DIR_CLASS_SYS')) {
    die('Accès direct interdit');
}

// Traitement du formulaire de don
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $errors = [];
    
    // Validation des champs
    if (empty($_POST['amount']) || !is_numeric($_POST['amount'])) {
        $errors['amount'] = 'Veuillez entrer un montant valide';
    }
    if (empty($_POST['firstname'])) $errors['firstname'] = 'Le prénom est requis';
    if (empty($_POST['lastname'])) $errors['lastname'] = 'Le nom est requis';
    if (empty($_POST['email'])) {
        $errors['email'] = 'L\'email est requis';
    } elseif (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'L\'email n\'est pas valide';
    }
    
    // Si pas d'erreurs, enregistrement dans la base de données
    if (empty($errors)) {
        try {
            $db->insert('donations', 
                ['amount', 'firstname', 'lastname', 'email', 'message', 'anonymous'],
                [
                    $_POST['amount'],
                    $_POST['firstname'],
                    $_POST['lastname'],
                    $_POST['email'],
                    $_POST['message'],
                    isset($_POST['anonymous']) ? 1 : 0
                ]
            );
            
            $success = true;
        } catch (Exception $e) {
            $errors['db'] = 'Une erreur est survenue lors de l\'enregistrement du don';
        }
    }
}

$predefinedAmounts = ['5', '10', '20', '50', '100'];
?>

<div class="min-h-screen bg-black">
    <!-- Hero Section -->
    <div class="relative h-[40vh] bg-center bg-cover"
         style="background-image: url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1920&q=80')">
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        <div class="absolute inset-0 flex items-center justify-center">
            <h1 class="title text-white text-center">FAIRE UN DON</h1>
        </div>
    </div>

    <!-- Donation Content -->
    <div class="container mx-auto px-4 py-16">
        <div class="max-w-2xl mx-auto text-center">
            <?php if (isset($success)): ?>
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    Merci pour votre don ! Un reçu vous sera envoyé par email.
                </div>
            <?php endif; ?>

            <?php if (!empty($errors['db'])): ?>
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    <?php echo htmlspecialchars($errors['db']); ?>
                </div>
            <?php endif; ?>

            <h2 class="subtitle mb-6">Soutenez nos projets</h2>
            <p class="text-gray-300 mb-12">
                Votre don nous aide à continuer notre mission de création et de partage artistique.
                Chaque contribution compte et nous permet de réaliser des projets toujours plus ambitieux.
            </p>

            <form method="POST" class="space-y-6">
                <div class="mb-12">
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                        <?php foreach ($predefinedAmounts as $amount): ?>
                            <button
                                type="button"
                                onclick="document.getElementById('amount').value='<?php echo $amount; ?>'"
                                class="py-3 font-bold transition-colors bg-transparent text-white border-2 border-white hover:bg-white hover:text-black"
                            >
                                <?php echo $amount; ?>€
                            </button>
                        <?php endforeach; ?>
                    </div>

                    <div class="relative">
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value="<?php echo isset($_POST['amount']) ? htmlspecialchars($_POST['amount']) : ''; ?>"
                            placeholder="Autre montant"
                            class="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                        />
                        <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">€</span>
                        <?php if (isset($errors['amount'])): ?>
                            <p class="text-red-500 text-sm mt-1"><?php echo htmlspecialchars($errors['amount']); ?></p>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="Prénom"
                            value="<?php echo isset($_POST['firstname']) ? htmlspecialchars($_POST['firstname']) : ''; ?>"
                            class="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                        />
                        <?php if (isset($errors['firstname'])): ?>
                            <p class="text-red-500 text-sm mt-1"><?php echo htmlspecialchars($errors['firstname']); ?></p>
                        <?php endif; ?>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Nom"
                            value="<?php echo isset($_POST['lastname']) ? htmlspecialchars($_POST['lastname']) : ''; ?>"
                            class="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                        />
                        <?php if (isset($errors['lastname'])): ?>
                            <p class="text-red-500 text-sm mt-1"><?php echo htmlspecialchars($errors['lastname']); ?></p>
                        <?php endif; ?>
                    </div>
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>"
                        class="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                    />
                    <?php if (isset($errors['email'])): ?>
                        <p class="text-red-500 text-sm mt-1"><?php echo htmlspecialchars($errors['email']); ?></p>
                    <?php endif; ?>
                </div>

                <div>
                    <textarea
                        name="message"
                        placeholder="Message (optionnel)"
                        rows="4"
                        class="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                    ><?php echo isset($_POST['message']) ? htmlspecialchars($_POST['message']) : ''; ?></textarea>
                </div>

                <div class="flex items-center">
                    <input 
                        type="checkbox" 
                        id="anonymous" 
                        name="anonymous" 
                        class="mr-2"
                        <?php echo isset($_POST['anonymous']) ? 'checked' : ''; ?>
                    />
                    <label for="anonymous" class="text-gray-400">
                        Je souhaite faire un don anonyme
                    </label>
                </div>

                <button
                    type="submit"
                    class="w-full bg-white text-black py-3 font-bold hover:bg-gray-200 transition-colors"
                >
                    FAIRE UN DON
                </button>
            </form>

            <p class="mt-8 text-sm text-gray-400">
                Les dons sont sécurisés et vous recevrez un reçu fiscal par email.
            </p>
        </div>
    </div>
</div>