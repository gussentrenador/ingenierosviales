-- Ejecuta este archivo en la base de datos MySQL (phpMyAdmin en cPanel, o localmente).

CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS site_content (
    content_key VARCHAR(100) PRIMARY KEY,
    content_value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Valores por defecto que se muestran mientras no se editen desde /admin.
INSERT INTO site_content (content_key, content_value) VALUES
    ('company_name', 'Ingenieros Viales'),
    ('company_tagline', 'Ingeniería vial con precisión y seguridad'),
    ('hero_title', 'Ingeniería vial con precisión y resultados'),
    ('hero_subtitle', 'Diseñamos, pavimentamos y supervisamos obras viales con los más altos estándares de calidad y seguridad.'),
    ('hero_image', ''),
    ('show_contact_cta', '1'),
    ('stat_1_value', '30+'),
    ('stat_1_label', 'Años de experiencia'),
    ('stat_2_value', '3'),
    ('stat_2_label', 'Sectores: vial, aeropuertos y minería'),
    ('about_title', 'Sobre nosotros'),
    ('about_text', 'Profesionales del área vial con más de 30 años de experiencia en carreteras, puentes y aeropuertos, en el sector público y privado. Liderados por Orlando Maluenda Rojas, Ingeniero Civil Químico y Consultor Líder, ofrecemos asesorías en licitaciones, planificación y gestión de obras, además de asistencia técnica en plantas de áridos, plantas asfálticas, hormigones y laboratorio vial.'),
    ('about_image', ''),
    ('services_json', '[{"title":"Asesorías","text":"Estudios de licitaciones, planificación y gestión de obras viales, aeroportuarias y de gran minería."},{"title":"Asistencia técnica","text":"Plantas de producción de áridos, plantas asfálticas y de hormigón, laboratorio vial y auditorías de obras."},{"title":"Obras en aeropuertos y minería","text":"Conservación y repavimentación de pistas, caminos de servicio y accesos en gran minería."}]'),
    ('project_1_title', 'Conservaciones Viales Periódicas'),
    ('project_1_text', 'Tratamientos superficiales dobles y reposición de pavimentos asfálticos en calzadas y bermas, previa recuperación con bacheos y sellado de grietas, señalización vial y demarcación del pavimento.'),
    ('project_1_image', ''),
    ('project_2_title', 'Obras en Autopistas Concesionadas'),
    ('project_2_text', 'Desnivelación de enlaces viales en Ruta 5 Norte y Sur, y reposición de pavimentos de hormigón en mal estado en calzadas de autopistas concesionadas.'),
    ('project_2_image', ''),
    ('project_3_title', 'Obras en Aeropuertos'),
    ('project_3_text', 'Reparación y ensanche de pistas de rodado y pista principal mediante fresado, nueva base granular y colocación de pavimento asfáltico.'),
    ('project_3_image', ''),
    ('contact_email', 'omaluenda@ingenierosviales.cl'),
    ('contact_cc_email', 'omaluendar@gmail.com'),
    ('contact_phone', ''),
    ('contact_address', ''),
    ('footer_text', '')
ON DUPLICATE KEY UPDATE content_key = content_key;
