<?php
declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '0');

$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Falta backend/config.php. Copia config.example.php y complétalo.']);
    exit;
}
$config = require $configFile;

// CORS: solo permitimos el origen configurado, con soporte de cookies de sesión.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && $origin === $config['cors_origin']) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

session_name($config['session_name']);
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'samesite' => 'Lax',
    'httponly' => true,
    'secure' => (($_SERVER['HTTPS'] ?? '') !== ''),
]);
session_start();

function db(array $config): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $config['db']['host'], $config['db']['name']);
        $pdo = new PDO($dsn, $config['db']['user'], $config['db']['pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
    return $pdo;
}

function json_body(): array
{
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function require_admin(): void
{
    if (empty($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'No autenticado']);
        exit;
    }
}

function json_response($data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data);
    exit;
}
