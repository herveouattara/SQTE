<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Configuration de la base de données
$db_config = [
    'host' => 'localhost',
    'dbname' => 'sqte',
    'user' => 'root',
    'password' => ''
];

try {
    $pdo = new PDO(
        "mysql:host={$db_config['host']};dbname={$db_config['dbname']};charset=utf8",
        $db_config['user'],
        $db_config['password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    die('Erreur de connexion : ' . $e->getMessage());
}

// Router simple
$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// API endpoints
if (strpos($request, '/api/') === 0) {
    header('Content-Type: application/json');
    $endpoint = substr($request, 5);

    switch ($endpoint) {
        case 'login':
            if ($method === 'POST') {
                $data = json_decode(file_get_contents('php://input'), true);
                $email = $data['email'] ?? '';
                $password = $data['password'] ?? '';
                $role = $data['role'] ?? '';

                // Vérification des identifiants (à adapter selon vos besoins)
                $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ? AND role = ?');
                $stmt->execute([$email, $role]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($user && password_verify($password, $user['password'])) {
                    $_SESSION['user'] = $user;
                    echo json_encode(['success' => true, 'user' => $user]);
                } else {
                    http_response_code(401);
                    echo json_encode(['error' => 'Identifiants incorrects']);
                }
            }
            break;

        case 'events':
            switch ($method) {
                case 'GET':
                    $stmt = $pdo->query('SELECT * FROM events ORDER BY date ASC');
                    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
                    break;

                case 'POST':
                    if (isset($_SESSION['user']) && $_SESSION['user']['role'] === 'admin') {
                        $data = json_decode(file_get_contents('php://input'), true);
                        $stmt = $pdo->prepare('INSERT INTO events (title, description, date, time, location, max_participants) VALUES (?, ?, ?, ?, ?, ?)');
                        $stmt->execute([
                            $data['title'],
                            $data['description'],
                            $data['date'],
                            $data['time'],
                            $data['location'],
                            $data['maxParticipants']
                        ]);
                        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
                    } else {
                        http_response_code(403);
                        echo json_encode(['error' => 'Non autorisé']);
                    }
                    break;
            }
            break;

        // Ajoutez d'autres endpoints selon vos besoins
    }
    exit;
}

// Servir le front-end React
$distPath = __DIR__ . '/dist';
if (file_exists($distPath . '/index.html')) {
    echo file_get_contents($distPath . '/index.html');
} else {
    http_response_code(404);
    echo 'Application non trouvée. Exécutez "npm run build" d\'abord.';
}