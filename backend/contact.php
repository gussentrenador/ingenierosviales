<?php
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Método no permitido'], 405);
}

$body = json_body();
$name = trim((string)($body['name'] ?? ''));
$email = trim((string)($body['email'] ?? ''));
$phone = trim((string)($body['phone'] ?? ''));
$message = trim((string)($body['message'] ?? ''));

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['error' => 'Nombre, email válido y mensaje son requeridos'], 400);
}

// Evita inyección de cabeceras vía saltos de línea en campos usados en headers.
$sanitize = fn(string $v): string => str_replace(["\r", "\n"], '', $v);
$name = $sanitize($name);
$email = $sanitize($email);
$phone = $sanitize($phone);

$row = db($config)
    ->query("SELECT content_value FROM site_content WHERE content_key = 'contact_email' LIMIT 1")
    ->fetch();
$to = ($row && $row['content_value'] !== '') ? $row['content_value'] : $config['mail']['to_fallback'];

$subject = 'Nuevo mensaje de contacto de ' . $name;
$body_text = "Nombre: {$name}\nEmail: {$email}\nTeléfono: {$phone}\n\nMensaje:\n{$message}\n";

$headers = [];
$headers[] = 'From: ' . $config['mail']['from_name'] . ' <' . $config['mail']['from_email'] . '>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

$sent = mail($to, $subject, $body_text, implode("\r\n", $headers));

if (!$sent) {
    json_response(['error' => 'No se pudo enviar el mensaje'], 500);
}

json_response(['ok' => true]);
