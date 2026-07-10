<?php
// Copia este archivo como config.php y completa tus datos reales.
// config.php NUNCA se sube a git (ver .gitignore).
return [
    'db' => [
        'host' => '127.0.0.1',
        'name' => 'nombre_basedatos',
        'user' => 'usuario_basedatos',
        'pass' => 'password_basedatos',
    ],

    // Dirección que recibe los correos si la tabla site_content no tiene contact_email.
    'mail' => [
        'to_fallback' => 'contacto@tudominio.com',
        'from_email' => 'no-responder@tudominio.com',
        'from_name' => 'Sitio web',
    ],

    // Dominio exacto desde el que se sirve el frontend (sin barra al final).
    // En local usa http://localhost:5173 (puerto por defecto de "npm run dev").
    'cors_origin' => 'http://localhost:5173',

    'session_name' => 'eng_admin_session',
];
