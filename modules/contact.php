<?php
if (!defined('DIR_CLASS_SYS')) {
    die('Accès direct interdit');
}

// Initialisation des variables
$success = false;
$errors = [];
$formData = [
    'name' => '',
    'email' => '',
    'subject' => '',
    'message' => ''
];

// Traitement du formulaire
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération et nettoyage des données
    $formData = [
        'name' => filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING),
        'email' => filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL),
        'subject' => filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING),
        'message' => filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING)
    ];

    // Validation
    if (empty($formData['name'])) {
        $errors['name'] = 'Le nom est requis';
    }

    if (empty($formData['email'])) {
        $errors['email'] = 'L\'email est requis';
    } elseif (!filter_var($formData['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'L\'email n\'est pas valide';
    }

    if (empty($formData['subject'])) {
        $errors['subject'] = 'Le sujet est requis';
    }

    if (empty($formData['message'])) {
        $errors['message'] = 'Le message est requis';
    }

    // Si pas d'erreurs, envoi du mail
    if (empty($errors)) {
        $to = $config['services']['mail_server']['user'];
        $subject = "Nouveau message de contact: " . $formData['subject'];
        
        $message = "Nouveau message de contact:\n\n";
        $message .= "Nom: " . $formData['name'] . "\n";
        $message .= "Email: " . $formData['email'] . "\n";
        $message .= "Sujet: " . $formData['subject'] . "\n\n";
        $message .= "Message:\n" . $formData['message'];

        $headers = [
            'From' => $formData['email'],
            'Reply-To' => $formData['email'],
            'X-Mailer' => 'PHP/' . phpversion()
        ];

        if (mail($to, $subject, $message, $headers)) {
            $success = true;
            $formData = ['name' => '', 'email' => '', 'subject' => '', 'message' => '']; // Reset form
        } else {
            $errors['mail'] = 'Une erreur est survenue lors de l\'envoi du message';
        }
    }
}
?>

<!-- En-tête de la page -->
<div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
    <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">Contactez-nous</h1>
        <p class="text-xl text-blue-100">Nous sommes là pour répondre à vos questions</p>
    </div>
</div>

<!-- Section principale -->
<div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
        <!-- Informations de contact -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div class="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div class="inline-block p-4 bg-blue-100 rounded-full text-blue-600 mb-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold mb-2 dark:text-white">Téléphone</h3>
                <p class="text-gray-600 dark:text-gray-300">01 23 45 67 89</p>
            </div>

            <div class="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div class="inline-block p-4 bg-blue-100 rounded-full text-blue-600 mb-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold mb-2 dark:text-white">Email</h3>
                <p class="text-gray-600 dark:text-gray-300">contact@sqte.com</p>
            </div>

            <div class="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div class="inline-block p-4 bg-blue-100 rounded-full text-blue-600 mb-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold mb-2 dark:text-white">Adresse</h3>
                <p class="text-gray-600 dark:text-gray-300">123 Rue Example, 75000 Paris</p>
            </div>
        </div>

        <!-- Messages de succès/erreur -->
        <?php if ($success): ?>
            <div class="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                <p>Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.</p>
            </div>
        <?php endif; ?>

        <?php if (isset($errors['mail'])): ?>
            <div class="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                <p><?php echo htmlspecialchars($errors['mail']); ?></p>
            </div>
        <?php endif; ?>

        <!-- Formulaire de contact -->
        <div class="bg-white rounded-lg shadow-lg p-8 dark:bg-gray-800">
            <form id="contact-form" method="POST" class="space-y-6">
                <!-- Nom -->
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nom complet <span class="text-red-500">*</span>
                    </label>
                    <input type="text" 
                           id="name" 
                           name="name" 
                           value="<?php echo htmlspecialchars($formData['name']); ?>"
                           class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                           required>
                    <?php if (isset($errors['name'])): ?>
                        <p class="mt-1 text-sm text-red-600"><?php echo htmlspecialchars($errors['name']); ?></p>
                    <?php endif; ?>
                </div>

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email <span class="text-red-500">*</span>
                    </label>
                    <input type="email" 
                           id="email" 
                           name="email" 
                           value="<?php echo htmlspecialchars($formData['email']); ?>"
                           class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                           required>
                    <?php if (isset($errors['email'])): ?>
                        <p class="mt-1 text-sm text-red-600"><?php echo htmlspecialchars($errors['email']); ?></p>
                    <?php endif; ?>
                </div>

                <!-- Sujet -->
                <div>
                    <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Sujet <span class="text-red-500">*</span>
                    </label>
                    <input type="text" 
                           id="subject" 
                           name="subject" 
                           value="<?php echo htmlspecialchars($formData['subject']); ?>"
                           class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                           required>
                    <?php if (isset($errors['subject'])): ?>
                        <p class="mt-1 text-sm text-red-600"><?php echo htmlspecialchars($errors['subject']); ?></p>
                    <?php endif; ?>
                </div>

                <!-- Message -->
                <div>
                    <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Message <span class="text-red-500">*</span>
                    </label>
                    <textarea id="message" 
                              name="message" 
                              rows="6"
                              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              required><?php echo htmlspecialchars($formData['message']); ?></textarea>
                    <?php if (isset($errors['message'])): ?>
                        <p class="mt-1 text-sm text-red-600"><?php echo htmlspecialchars($errors['message']); ?></p>
                    <?php endif; ?>
                </div>

                <!-- Bouton d'envoi -->
                <div>
                    <button type="submit" 
                            class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                        Envoyer le message
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Map Section -->
<div class="mt-12">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647874587201!5m2!1sfr!2sfr" 
            width="100%" 
            height="450" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy">
    </iframe>
</div>

<!-- Script de validation -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Validation du nom
        if (name.value.trim().length < 2) {
            isValid = false;
            showError(name, 'Le nom doit contenir au moins 2 caractères');
        } else {
            removeError(name);
        }
        
        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            isValid = false;
            showError(email, 'Veuillez entrer une adresse email valide');
        } else {
            removeError(email);
        }
        
        // Validation du sujet
        if (subject.value.trim().length < 3) {
            isValid = false;
            showError(subject, 'Le sujet doit contenir au moins 3 caractères');
        } else {
            removeError(subject);
        }
        
        // Validation du message
        if (message.value.trim().length < 10) {
            isValid = false;
            showError(message, 'Le message doit contenir au moins 10 caractères');
        } else {
            removeError(message);
        }
        
        if (!isValid) {
            e.preventDefault();
        }
    });
    
    function showError(input, message) {
        const errorDiv = input.nextElementSibling || document.createElement('p');
        errorDiv.className = 'mt-1 text-sm text-red-600';
        errorDiv.textContent = message;
        if (!input.nextElementSibling) {
            input.parentNode.appendChild(errorDiv);
        }
        input.classList.add('border-red-500');
    }
    
    function removeError(input) {
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.className.includes('text-red-600')) {
            errorDiv.remove();
        }
        input.classList.remove('border-red-500');
    }
});
</script>