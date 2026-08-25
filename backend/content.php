<?php
require __DIR__ . '/bootstrap.php';

// Debe coincidir con las keys definidas en frontend/src/content-schema.js
const ALLOWED_KEYS = [
    'company_name', 'company_tagline', 'accent_color',
    'section_order_json',
    'maintenance_mode', 'maintenance_title', 'maintenance_message',
    'hero_title', 'hero_subtitle', 'hero_image', 'show_navbar_cta', 'show_hero_cta',
    'show_stats',
    'stat_1_value', 'stat_1_label',
    'stat_2_value', 'stat_2_label',
    'stat_3_value', 'stat_3_label',
    'stat_4_value', 'stat_4_label',
    'show_nosotros', 'nosotros_eyebrow',
    'about_title', 'about_text', 'about_image',
    'highlight_1', 'highlight_2', 'highlight_3', 'highlights_json',
    'show_whyus', 'whyus_eyebrow', 'whyus_title',
    'whyus_pillar_1_title', 'whyus_pillar_1_text',
    'whyus_pillar_2_title', 'whyus_pillar_2_text',
    'whyus_pillar_3_title', 'whyus_pillar_3_text',
    'whyus_pillar_4_title', 'whyus_pillar_4_text',
    'whyus_pillars_json',
    'show_servicios', 'services_eyebrow', 'services_heading', 'services_json',
    'show_proyectos', 'proyectos_eyebrow', 'proyectos_heading', 'proyectos_subtitle', 'projects_json',
    'show_equipo', 'equipo_eyebrow', 'equipo_heading', 'team_json',
    'project_1_title', 'project_1_text', 'project_1_image',
    'project_2_title', 'project_2_text', 'project_2_image',
    'project_3_title', 'project_3_text', 'project_3_image',
    'show_contacto', 'contacto_eyebrow', 'contacto_heading', 'contacto_subtitle',
    'contact_email', 'contact_cc_email', 'contact_phone', 'contact_address',
    'show_footer', 'footer_text',
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
