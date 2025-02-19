<?php
if (!defined('DIR_CLASS_SYS')) {
    die('Accès direct interdit');
}
?>

<div class="min-h-screen bg-black">
    <div class="container mx-auto px-4 py-16">
        <h1 class="text-3xl font-bold text-white mb-8">Informations</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Horaires -->
            <div class="bg-gray-900 p-8 rounded-lg">
                <h2 class="text-xl font-bold text-white mb-4">Horaires d'ouverture</h2>
                <div class="space-y-2 text-gray-400">
                    <p>Lundi - Vendredi : 9h00 - 18h00</p>
                    <p>Samedi : 10h00 - 16h00</p>
                    <p>Dimanche : Fermé</p>
                </div>
            </div>

            <!-- Contact -->
            <div class="bg-gray-900 p-8 rounded-lg">
                <h2 class="text-xl font-bold text-white mb-4">Coordonnées</h2>
                <div class="space-y-2 text-gray-400">
                    <p>Adresse : 123 Rue de l'Association, 78711 Mantes-la-Ville</p>
                    <p>Téléphone : 01 23 45 67 89</p>
                    <p>Email : contact@sqte.fr</p>
                </div>
            </div>

            <!-- Accès -->
            <div class="bg-gray-900 p-8 rounded-lg">
                <h2 class="text-xl font-bold text-white mb-4">Comment nous rejoindre</h2>
                <div class="space-y-2 text-gray-400">
                    <p><strong>En transport en commun :</strong></p>
                    <p>Bus : Lignes X, Y, Z - Arrêt "Association"</p>
                    <p>Train : Gare de Mantes-la-Ville (10 min à pied)</p>
                    
                    <p class="mt-4"><strong>En voiture :</strong></p>
                    <p>Parking gratuit disponible sur place</p>
                </div>
            </div>

            <!-- Adhésion -->
            <div class="bg-gray-900 p-8 rounded-lg">
                <h2 class="text-xl font-bold text-white mb-4">Adhésion</h2>
                <div class="space-y-2 text-gray-400">
                    <p><strong>Tarifs annuels :</strong></p>
                    <p>Adulte : 50€</p>
                    <p>Étudiant : 30€</p>
                    <p>- de 18 ans : 25€</p>
                    
                    <p class="mt-4">L'adhésion donne accès à toutes nos activités et événements.</p>
                </div>
            </div>
        </div>

        <!-- Carte -->
        <div class="mt-8">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647874587201!5m2!1sfr!2sfr"
                width="100%"
                height="450"
                style="border:0;"
                allowfullscreen=""
                loading="lazy">
            </iframe>
        </div>
    </div>
</div>