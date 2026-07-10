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
    ('company_name', 'Empresa de Ingeniería'),
    ('company_tagline', 'Soluciones de ingeniería a la medida'),
    ('hero_title', 'Ingeniería con precisión y resultados'),
    ('hero_subtitle', 'Diseñamos, construimos y supervisamos proyectos de ingeniería con los más altos estándares de calidad.'),
    ('hero_image', ''),
    ('about_title', 'Sobre nosotros'),
    ('about_text', 'Somos una empresa de ingeniería con años de experiencia entregando soluciones técnicas confiables para clientes exigentes.'),
    ('about_image', ''),
    ('service_1_title', 'Diseño estructural'),
    ('service_1_text', 'Cálculo y diseño estructural para todo tipo de proyectos.'),
    ('service_2_title', 'Supervisión de obra'),
    ('service_2_text', 'Inspección técnica y control de calidad durante la construcción.'),
    ('service_3_title', 'Consultoría técnica'),
    ('service_3_text', 'Asesoría especializada para optimizar tus proyectos.'),
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
