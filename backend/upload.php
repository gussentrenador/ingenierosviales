<?php
require __DIR__ . '/bootstrap.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_FILES['image'])) {
    json_response(['error' => 'Falta el archivo "image"'], 400);
}

$file = $_FILES['image'];

if ($file['error'] !== UPLOAD_ERR_OK) {
    $uploadErrors = [
        UPLOAD_ERR_INI_SIZE => 'La imagen supera el límite de subida configurado en el servidor (php.ini).',
        UPLOAD_ERR_FORM_SIZE => 'La imagen supera el límite de subida del formulario.',
        UPLOAD_ERR_PARTIAL => 'La imagen se subió solo parcialmente. Intenta nuevamente.',
        UPLOAD_ERR_NO_TMP_DIR => 'El servidor no tiene una carpeta temporal configurada.',
        UPLOAD_ERR_CANT_WRITE => 'El servidor no pudo escribir el archivo en disco.',
        UPLOAD_ERR_EXTENSION => 'Una extensión de PHP del servidor bloqueó la subida.',
    ];
    $message = $uploadErrors[$file['error']] ?? 'Error al subir el archivo (código ' . $file['error'] . ').';
    json_response(['error' => $message], 400);
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
if (!is_dir($uploadsDir) && !mkdir($uploadsDir, 0755, true) && !is_dir($uploadsDir)) {
    json_response(['error' => 'No se pudo crear la carpeta backend/uploads. Revisa los permisos de escritura en el servidor.'], 500);
}
if (!file_exists($uploadsDir . '/.htaccess')) {
    file_put_contents($uploadsDir . '/.htaccess', "RemoveHandler .php .phtml .php3 .php4 .php5 .php7\nRemoveType .php .phtml .php3 .php4 .php5 .php7\nphp_flag engine off\n");
}

if (!is_writable($uploadsDir)) {
    json_response(['error' => 'La carpeta backend/uploads no tiene permisos de escritura (chmod 755).'], 500);
}

if (!move_uploaded_file($file['tmp_name'], $uploadsDir . '/' . $filename)) {
    json_response(['error' => 'No se pudo guardar la imagen en el servidor.'], 500);
}

json_response(['path' => 'uploads/' . $filename]);
