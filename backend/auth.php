<?php
require __DIR__ . '/bootstrap.php';

$action = $_GET['action'] ?? '';

if ($action === 'me') {
    if (empty($_SESSION['admin_id'])) {
        json_response(['user' => null], 401);
    }
    json_response(['user' => ['username' => $_SESSION['admin_username']]]);
}

if ($action === 'login') {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        json_response(['error' => 'Método no permitido'], 405);
    }
    $body = json_body();
    $username = trim((string)($body['username'] ?? ''));
    $password = (string)($body['password'] ?? '');

    if ($username === '' || $password === '') {
        json_response(['error' => 'Usuario y contraseña son requeridos'], 400);
    }

    $stmt = db($config)->prepare('SELECT id, username, password_hash FROM admin_users WHERE username = ? LIMIT 1');
    $stmt->execute([$username]);
    $admin = $stmt->fetch();

    if (!$admin || !password_verify($password, $admin['password_hash'])) {
        json_response(['error' => 'Usuario o contraseña incorrectos'], 401);
    }

    session_regenerate_id(true);
    $_SESSION['admin_id'] = $admin['id'];
    $_SESSION['admin_username'] = $admin['username'];

    json_response(['user' => ['username' => $admin['username']]]);
}

if ($action === 'logout') {
    $_SESSION = [];
    session_destroy();
    json_response(['ok' => true]);
}

json_response(['error' => 'Acción no reconocida'], 400);
