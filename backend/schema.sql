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
    ('stat_1_value', '15+'),
    ('stat_1_label', 'Años de experiencia'),
    ('stat_2_value', '120+'),
    ('stat_2_label', 'Proyectos ejecutados'),
    ('stat_3_value', '98%'),
    ('stat_3_label', 'Clientes satisfechos'),
    ('stat_4_value', '40+'),
    ('stat_4_label', 'Profesionales certificados'),
    ('about_title', 'Sobre nosotros'),
    ('about_text', 'Somos una empresa de ingeniería vial con años de experiencia entregando soluciones técnicas confiables para clientes exigentes, desde el diseño hasta la ejecución y supervisión de obra.'),
    ('about_image', ''),
    ('service_1_title', 'Diseño y pavimentación vial'),
    ('service_1_text', 'Ingeniería de diseño geométrico y estructuras de pavimento para vías nuevas y rehabilitación.'),
    ('service_2_title', 'Supervisión de obras'),
    ('service_2_text', 'Inspección técnica y control de calidad durante la construcción de proyectos viales.'),
    ('service_3_title', 'Señalización y seguridad vial'),
    ('service_3_text', 'Estudios de tránsito, señalización y dispositivos de seguridad vial normados.'),
    ('project_1_title', 'Proyecto 1'),
    ('project_1_text', 'Descripción breve del proyecto.'),
    ('project_1_image', ''),
    ('project_2_title', 'Proyecto 2'),
    ('project_2_text', 'Descripción breve del proyecto.'),
    ('project_2_image', ''),
    ('project_3_title', 'Proyecto 3'),
    ('project_3_text', 'Descripción breve del proyecto.'),
    ('project_3_image', ''),
    ('contact_email', 'contacto@tudominio.com'),
    ('contact_phone', '+56 9 0000 0000'),
    ('contact_address', 'Tu dirección aquí'),
    ('footer_text', '')
ON DUPLICATE KEY UPDATE content_key = content_key;
