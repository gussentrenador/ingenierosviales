<?php
// Script de línea de comandos para crear (o resetear) el usuario admin.
// Uso local:  php create_admin.php usuario contraseña
// Uso en cPanel: se puede correr desde "Terminal" de cPanel si está disponible,
// o crear el registro manualmente en phpMyAdmin usando password_hash() generado aquí.

if (php_sapi_name() !== 'cli') {
    http_response_code(403);
    exit('Este script solo puede ejecutarse por línea de comandos.');
}

$config = require __DIR__ . '/config.php';

[$script, $username, $password] = array_pad($argv, 3, null);

if (!$username || !$password) {
    fwrite(STDERR, "Uso: php create_admin.php <usuario> <contraseña>\n");
    exit(1);
}

$dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $config['db']['host'], $config['db']['name']);
$pdo = new PDO($dsn, $config['db']['user'], $config['db']['pass'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
]);

$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $pdo->prepare(
    'INSERT INTO admin_users (username, password_hash) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)'
);
$stmt->execute([$username, $hash]);

echo "Usuario admin '{$username}' creado/actualizado correctamente.\n";
