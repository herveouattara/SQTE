#!/bin/bash

# Répertoire racine du projet
base_dir=~/Developpement/www/SQTE

# Fonction pour créer un fichier index.php vide avec protection
create_protected_index() {
    echo "<?php header('HTTP/1.0 403 Forbidden'); exit('Accès direct interdit'); ?>" > "$1/index.php"
}

# Créer le répertoire principal
mkdir -p "$base_dir"
cd "$base_dir"

# Structure des assets
declare -a asset_dirs=(
    "assets/css"
    "assets/js"
    "assets/img/logos/main"
    "assets/img/logos/partners"
    "assets/img/logos/social"
    "assets/img/banners"
    "assets/img/products"
    "assets/img/misc"
    "assets/img/icons"
    "assets/img/responsive/logos"
    "assets/img/responsive/banners"
    "assets/ajax"
    "assets/libs"
    "assets/media/videos"
    "assets/media/audio"
)

# Structure des includes
declare -a include_dirs=(
    "includes"
    "includes/classes/System"
    "includes/classes/Generic"
    "includes/classes/Specific"
    "includes/functions/System"
    "includes/functions/Generic"
    "includes/functions/Specific"
)

# Structure admin
declare -a admin_dirs=(
    "admin/assets/css"
    "admin/assets/js"
    "admin/assets/img/logos/main"
    "admin/assets/img/logos/partners"
    "admin/assets/img/logos/social"
    "admin/assets/img/banners"
    "admin/assets/img/products"
    "admin/assets/img/misc"
    "admin/assets/img/icons"
    "admin/assets/img/responsive/logos"
    "admin/assets/img/responsive/banners"
    "admin/assets/ajax"
    "admin/assets/media/videos"
    "admin/assets/media/audio"
    "admin/includes"
    "admin/classes/System"
    "admin/classes/Generic"
    "admin/classes/Specific"
    "admin/sections"
)

# Structure uploads
declare -a upload_dirs=(
    "uploads/images"
    "uploads/documents"
    "uploads/media/videos"
    "uploads/media/audio"
)

# Créer tous les répertoires
for dir in "${asset_dirs[@]}" "${include_dirs[@]}" "${admin_dirs[@]}" "${upload_dirs[@]}" "modules"; do
    mkdir -p "$base_dir/$dir"
    create_protected_index "$base_dir/$dir"
done

# Créer les fichiers principaux
touch "$base_dir/index.php"
touch "$base_dir/.htaccess"
touch "$base_dir/admin/admin.php"

# Définir les permissions
find "$base_dir" -type d -exec chmod 755 {} \;
find "$base_dir" -type f -exec chmod 644 {} \;

# Permissions spéciales pour les dossiers d'upload
chmod 775 "$base_dir/uploads"
find "$base_dir/uploads" -type d -exec chmod 775 {} \;

# Créer le fichier .htaccess dans le dossier uploads
cat > "$base_dir/uploads/.htaccess" << 'EOL'
# Désactiver l'exécution des scripts
<FilesMatch "\.(php|php3|php4|php5|phtml|pl|py|jsp|asp|htm|html|shtml|sh|cgi)$">
    Deny from all
</FilesMatch>

# Autoriser seulement les types de fichiers spécifiques
<FilesMatch "\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx|txt)$">
    Allow from all
</FilesMatch>
EOL

echo "Structure de répertoires créée avec succès dans $base_dir"
echo "Permissions configurées pour la sécurité"