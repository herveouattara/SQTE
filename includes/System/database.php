<?php
if (!defined('DIR_ROOT')) {
    die('Accès direct interdit');
}

class Database {
    private static $instance = null;
    private $pdo = null;
    private $demoMode = true; // Mode démo par défaut

    private function __construct() {
        if (!$this->demoMode) {
            try {
                $this->pdo = new PDO(
                    "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8",
                    DB_USER,
                    DB_PASS,
                    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
                );
            } catch (PDOException $e) {
                throw new Exception("Erreur de connexion à la base de données : " . $e->getMessage());
            }
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function isDemoMode() {
        return $this->demoMode;
    }

    public function select($table, $columns = '*', $where = null, $params = []) {
        if ($this->demoMode) {
            return $this->getDemoData($table);
        }

        // Code pour la base de données réelle
        $query = "SELECT $columns FROM $table";
        if ($where) {
            $query .= " WHERE $where";
        }
        
        try {
            $stmt = $this->pdo->prepare($query);
            $stmt->execute($params);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Exception("Erreur lors de la requête : " . $e->getMessage());
        }
    }

    private function getDemoData($table) {
        // Données de démonstration
        $demoData = [
            'events' => [
                [
                    'id' => 1,
                    'title' => 'Festival de Courts Métrages',
                    'description' => 'Projection des meilleurs courts métrages de l\'année',
                    'date' => '2024-03-15',
                    'time' => '19:00',
                    'location' => 'Salle Principale',
                    'max_participants' => 100,
                    'image_url' => 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80'
                ],
                [
                    'id' => 2,
                    'title' => 'Concert Live',
                    'description' => 'Performance live des artistes du pôle musique',
                    'date' => '2024-03-22',
                    'time' => '20:30',
                    'location' => 'Auditorium',
                    'max_participants' => 150,
                    'image_url' => 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=800&q=80'
                ]
            ],
            'menu' => [
                [
                    'id' => 1,
                    'title' => 'Accueil',
                    'link' => '/',
                    'position' => 1
                ],
                [
                    'id' => 2,
                    'title' => 'Événements',
                    'link' => '/evenements',
                    'position' => 2
                ]
            ]
        ];

        return $demoData[$table] ?? [];
    }

    // Empêcher la sérialisation
    public function __sleep() {
        throw new Exception("La sérialisation n'est pas autorisée");
    }

    // Empêcher la désérialisation
    public function __wakeup() {
        throw new Exception("La désérialisation n'est pas autorisée");
    }
}
?>