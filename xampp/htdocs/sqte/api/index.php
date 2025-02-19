<?php
require_once '../config.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    die(json_encode(['error' => 'Erreur de connexion à la base de données']));
}

$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Extraire le endpoint de l'URL
$path = parse_url($request, PHP_URL_PATH);
$endpoint = str_replace('/sqte/api/', '', $path);

switch ($endpoint) {
    case 'login':
        if ($method === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            $email = $data['email'] ?? '';
            $password = $data['password'] ?? '';
            $role = $data['role'] ?? '';

            $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ? AND role = ?');
            $stmt->execute([$email, $role]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                echo json_encode([
                    'success' => true,
                    'user' => [
                        'id' => $user['id'],
                        'email' => $user['email'],
                        'firstName' => $user['first_name'],
                        'lastName' => $user['last_name'],
                        'role' => $user['role']
                    ]
                ]);
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
                break;

            case 'PUT':
                $data = json_decode(file_get_contents('php://input'), true);
                $id = $data['id'] ?? null;
                if ($id) {
                    $stmt = $pdo->prepare('UPDATE events SET title = ?, description = ?, date = ?, time = ?, location = ?, max_participants = ? WHERE id = ?');
                    $stmt->execute([
                        $data['title'],
                        $data['description'],
                        $data['date'],
                        $data['time'],
                        $data['location'],
                        $data['maxParticipants'],
                        $id
                    ]);
                    echo json_encode(['success' => true]);
                }
                break;

            case 'DELETE':
                $id = $_GET['id'] ?? null;
                if ($id) {
                    $stmt = $pdo->prepare('DELETE FROM events WHERE id = ?');
                    $stmt->execute([$id]);
                    echo json_encode(['success' => true]);
                }
                break;
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint non trouvé']);
        break;
}