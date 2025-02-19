<?php
if (!defined('DIR_CLASS_SYS')) {
    die('Accès direct interdit');
}

// Traitement du formulaire
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $errors = [];
    
    // Validation des champs
    if (empty($_POST['firstname'])) $errors['firstname'] = 'Le prénom est requis';
    if (empty($_POST['lastname'])) $errors['lastname'] = 'Le nom est requis';
    if (empty($_POST['email'])) {
        $errors['email'] = 'L\'email est requis';
    } elseif (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'L\'email n\'est pas valide';
    }
    if (empty($_POST['pole'])) $errors['pole'] = 'Veuillez sélectionner un pôle';
    
    // Si pas d'erreurs, enregistrement dans la base de données
    if (empty($errors)) {
        try {
            $db->insert('registrations', 
                ['firstname', 'lastname', 'email', 'phone', 'pole', 'message'],
                [
                    $_POST['firstname'],
                    $_POST['lastname'],
                    $_POST['email'],
                    $_POST['phone'],
                    $_POST['pole'],
                    $_POST['message']
                ]
            );
            
            $success = true;
        } catch (Exception $e) {
            $errors['db'] = 'Une erreur est survenue lors de l\'inscription';
        }
    }
}
?>

<div class="min-h-screen bg-black">
    <!-- Hero Section -->
    <div class="relative h-[40vh] bg-center bg-cover"
         style="background-image: url('https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1920&q=80')">
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        <div class="absolute inset-0 flex items-center justify-center">
            <h1 class="title text-white text-center">INSCRIPTION</h1>
        </div>
    </div>

    <!-- Registration Form -->
    <div class="container mx-auto px-4 py-16">
        <div class="max-w-2xl mx-auto">
            <?php if (isset($success)): ?>
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    Votre inscription a été enregistrée avec succès.
                </div>
            <?php endif; ?>

            <?php if (!empty($errors['db'])): ?>
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    <?php echo htmlspecialchars($errors['db']); ?>
                </div>
            <?php endif; ?>

            <form method="POST" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-gray-400 mb-2">Prénom</label>
                        <input
                            type="text"
                            name="firstname"
                            value="<?php echo isset($_POST['firstname']) ? htmlspecialchars($_POST['firstname']) : ''; ?>"
                            class="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                        />
                        <?php if (isset($errors['firstname'])): ?>
                            <p class="text-red-500 text-sm mt-1"><?php echo htmlspecialchars($errors['firstname']); ?></p>
                        <?php endif; ?>
                    </div>
                    <div>
                        <label class="block text-gray-400 mb-2">Nom</label>
                        <input
                            type="text"
                            name="lastname"
                            value="<?php echo isset($_POST['lastname']) ? htmlspecialchars($_POST['lastname']) : ''; ?>"
                            class="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                        />
                        <?php if (isset($errors['lastname'])): ?>
                            <p class="text-red-500 text-sm mt-1"><?php echo htmlspecialchars($errors['lastname']); ?></p>
                        <?php endif; ?>
                    </div>
                </div>

                <div>
                    <label class="block text-gray-400 mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>"
                        class="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                    />
                    <?php if (isset($errors['email'])): ?>
                        <p class="text-red-500 text-sm mt-1"><?php echo htmlspecialchars($errors['email']); ?></p>
                    <?php endif; ?>
                </div>

                <div>
                    <label class="block text-gray-400 mb-2">Téléphone</label>
                    <input
                        type="tel"
                        name="phone"
                        value="<?php echo isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : ''; ?>"
                        class="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                    />
                </div>

                <div>
                    <label class="block text-gray-400 mb-2">Pôle d'intérêt</label>
                    <select name="pole" 
                            class="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300">
                        <option value="" class="bg-black">Sélectionnez un pôle</option>
                        <option value="audiovisuel" class="bg-black" <?php echo isset($_POST['pole']) && $_POST['pole'] === 'audiovisuel' ? 'selected' : ''; ?>>
                            Pôle Audiovisuel
                        </option>
                        <option value="communication" class="bg-black" <?php echo isset($_POST['pole']) && $_POST['pole'] === 'communication' ? 'selected' : ''; ?>>
                            Pôle Communication
                        </option>
                        <option value="musique" class="bg-black" <?php echo isset($_POST['pole']) && $_POST['pole'] === 'musique' ? 'selected' : ''; ?>>
                            Pôle Musique
                        </option>
                    </select>
                    <?php if (isset($errors['pole'])): ?>
                        <p class="text-red-500 text-sm mt-1"><?php echo htmlspecialchars($errors['pole']); ?></p>
                    <?php endif; ?>
                </div>

                <div>
                    <label class="block text-gray-400 mb-2">Message de motivation</label>
                    <textarea
                        name="message"
                        rows="4"
                        class="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                    ><?php echo isset($_POST['message']) ? htmlspecialchars($_POST['message']) : ''; ?></textarea>
                </div>

                <div class="flex items-center">
                    <input type="checkbox" id="terms" name="terms" class="mr-2" required />
                    <label for="terms" class="text-gray-400">
                        J'accepte les conditions d'utilisation et la politique de confidentialité
                    </label>
                </div>

                <button
                    type="submit"
                    class="w-full bg-white text-black py-3 font-bold hover:bg-gray-200 transition-colors"
                >
                    S'INSCRIRE
                </button>
            </form>
        </div>
    </div>
</div>