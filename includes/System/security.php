<?php
if (!defined('DIR_ROOT')) {
    die('Accès direct interdit');
}

class Security {
    private $initialized = false;
    private $config;

    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        $this->config = require DIR_ROOT . '/includes/System/config.php';
        $this->initialized = true;
    }

    public function sanitizeInput($data) {
        if (is_array($data)) {
            return array_map([$this, 'sanitizeInput'], $data);
        }
        return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
    }

    public function generateCSRFToken() {
        if (empty($_SESSION['csrf_token'])) {
            try {
                $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
            } catch (Exception $e) {
                error_log("Erreur lors de la génération du token CSRF : " . $e->getMessage());
                throw new Exception("Erreur de sécurité lors de la génération du token.");
            }
        }
        return $_SESSION['csrf_token'];
    }

    public function verifyCSRFToken($token) {
        if (!isset($_SESSION['csrf_token']) || empty($token) || $token !== $_SESSION['csrf_token']) {
            error_log("Tentative de validation CSRF invalide");
            throw new Exception("Token de sécurité invalide.");
        }
        return true;
    }

    public function encrypt($data) {
        if (empty($data)) {
            throw new InvalidArgumentException('Les données à crypter ne peuvent pas être vides.');
        }

        return openssl_encrypt(
            $data,
            'aes-256-cbc',
            $this->config['security']['secret_key'],
            0,
            str_repeat("\0", 16)
        );
    }

    public function decrypt($encryptedData) {
        if (empty($encryptedData)) {
            throw new InvalidArgumentException('Les données cryptées ne peuvent pas être vides.');
        }

        $decrypted = openssl_decrypt(
            $encryptedData,
            'aes-256-cbc',
            $this->config['security']['secret_key'],
            0,
            str_repeat("\0", 16)
        );

        if ($decrypted === false) {
            throw new RuntimeException('Le décryptage a échoué. Les données ou la clé peuvent être incorrectes.');
        }

        return $decrypted;
    }

    public function checkAuth() {
        if (!isset($_SESSION['user_id'])) {
            header('Location: ' . SITE_URL . '/login.php');
            exit();
        }
    }

    public function isInitialized() {
        return $this->initialized;
    }
}