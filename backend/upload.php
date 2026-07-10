<?php
require __DIR__ . '/bootstrap.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_FILES['image'])) {
    json_response(['error' => 'Falta el archivo "image"'], 400);
}

$file = $_FILES['image'];

if ($file['error'] !== UPLOAD_ERR_OK) {
    json_response(['error' => 'Error al subir el archivo'], 400);
}

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
if ($file['size'] > MAX_BYTES) {
    json_response(['error' => 'La imagen no puede superar 5MB'], 400);
}

$imageInfo = getimagesize($file['tmp_name']);
$allowedMime = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'];
if (!$imageInfo || !isset($allowedMime[$imageInfo['mime']])) {
    json_response(['error' => 'Formato de imagen no permitido (usa JPG, PNG, WEBP o GIF)'], 400);
}

$ext = $allowedMime[$imageInfo['mime']];
$filename = bin2hex(random_bytes(16)) . '.' . $ext;

$uploadsDir = __DIR__ . '/uploads';
if (!is_dir($uploadsDir)) {
    mkdir($uploadsDir, 0755, true);
    file_put_contents($uploadsDir . '/.htaccess', "RemoveHandler .php .phtml .php3 .php4 .php5 .php7\nRemoveType .php .phtml .php3 .php4 .php5 .php7\nphp_flag engine off\n");
}

if (!move_uploaded_file($file['tmp_name'], $uploadsDir . '/' . $filename)) {
    json_response(['error' => 'No se pudo guardar la imagen'], 500);
}

json_response(['path' => 'uploads/' . $filename]);
