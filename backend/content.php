<?php
require __DIR__ . '/bootstrap.php';

// Debe coincidir con las keys definidas en frontend/src/content-schema.js
const ALLOWED_KEYS = [
    'company_name', 'company_tagline',
    'hero_title', 'hero_subtitle', 'hero_image', 'show_contact_cta',
    'stat_1_value', 'stat_1_label',
    'stat_2_value', 'stat_2_label',
    'stat_3_value', 'stat_3_label',
    'stat_4_value', 'stat_4_label',
    'about_title', 'about_text', 'about_image',
    'service_1_title', 'service_1_text',
    'service_2_title', 'service_2_text',
    'service_3_title', 'service_3_text',
    'project_1_title', 'project_1_text', 'project_1_image',
    'project_2_title', 'project_2_text', 'project_2_image',
    'project_3_title', 'project_3_text', 'project_3_image',
    'contact_email', 'contact_phone', 'contact_address',
    'footer_text',
];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $rows = db($config)->query('SELECT content_key, content_value FROM site_content')->fetchAll();
    $content = [];
    foreach ($rows as $row) {
        $content[$row['content_key']] = $row['content_value'];
    }
    json_response(['content' => $content]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_admin();

    $body = json_body();
    $updates = is_array($body['updates'] ?? null) ? $body['updates'] : [];

    $stmt = db($config)->prepare(
        'INSERT INTO site_content (content_key, content_value) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)'
    );

    foreach ($updates as $key => $value) {
        if (!in_array($key, ALLOWED_KEYS, true)) {
            continue;
        }
        $stmt->execute([$key, (string)$value]);
    }

    json_response(['ok' => true]);
}

json_response(['error' => 'Método no permitido'], 405);
