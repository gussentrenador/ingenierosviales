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
    ('accent_color', '#f59e0b'),
    ('section_order_json', '["stats","nosotros","whyus","servicios","proyectos","equipo","contacto"]'),
    ('maintenance_mode', '0'),
    ('maintenance_title', 'Sitio en mantención'),
    ('maintenance_message', 'Estamos realizando mejoras en nuestro sitio. Vuelve a visitarnos pronto.'),
    ('hero_title', 'Ingeniería vial con precisión y resultados'),
    ('hero_subtitle', 'Diseñamos, pavimentamos y supervisamos obras viales con los más altos estándares de calidad y seguridad.'),
    ('hero_image', ''),
    ('show_navbar_cta', '1'),
    ('show_hero_cta', '1'),
    ('show_stats', '1'),
    ('stat_1_value', '30+'),
    ('stat_1_label', 'Años de experiencia'),
    ('stat_2_value', '3'),
    ('stat_2_label', 'Sectores: vial, aeropuertos y minería'),
    ('show_nosotros', '1'),
    ('nosotros_eyebrow', 'Quiénes somos'),
    ('about_title', 'Sobre nosotros'),
    ('about_text', 'Profesionales del área vial con más de 30 años de experiencia en carreteras, puentes y aeropuertos, en el sector público y privado. Liderados por Orlando Maluenda Rojas, Ingeniero Civil Químico y Consultor Líder, ofrecemos asesorías en licitaciones, planificación y gestión de obras, además de asistencia técnica en plantas de áridos, plantas asfálticas, hormigones y laboratorio vial.'),
    ('about_image', ''),
    ('highlights_json', '["Más de 30 años de experiencia en carreteras, puentes y aeropuertos","Experiencia en sector público y privado","Amplia red de contactos: concesionarias, Dirección de Vialidad y aeropuertos"]'),
    ('show_whyus', '1'),
    ('whyus_eyebrow', 'Por qué elegirnos'),
    ('whyus_title', 'Confianza construida en cada proyecto'),
    ('whyus_pillars_json', '[{"title":"Más de 30 años de experiencia","text":"En carreteras, puentes y aeropuertos, en el sector público y privado."},{"title":"Áreas de especialización","text":"Obras viales, aeropuertos y gran minería: movimientos de tierra, pavimentos y plantas de producción."},{"title":"Amplia red de gestión","text":"Contactos con Empresas Concesionarias, Dirección de Vialidad, aeropuertos, constructoras y transportistas."},{"title":"Asesoría y asistencia técnica","text":"Estudios de licitaciones, planificación de obras, laboratorio vial y auditorías."}]'),
    ('show_servicios', '1'),
    ('services_eyebrow', 'Lo que hacemos'),
    ('services_heading', 'Nuestros servicios'),
    ('services_json', '[{"title":"Asesorías","text":"Estudios de licitaciones, planificación y gestión de obras viales, aeroportuarias y de gran minería."},{"title":"Asistencia técnica","text":"Plantas de producción de áridos, plantas asfálticas y de hormigón, laboratorio vial y auditorías de obras."},{"title":"Obras en aeropuertos y minería","text":"Conservación y repavimentación de pistas, caminos de servicio y accesos en gran minería."}]'),
    ('show_proyectos', '1'),
    ('proyectos_eyebrow', 'Nuestro trabajo'),
    ('proyectos_heading', 'Proyectos destacados'),
    ('proyectos_subtitle', 'Imágenes de obras y tipo de proyectos'),
    ('projects_json', '[{"title":"Conservaciones Viales Periódicas","text":"Tratamientos superficiales dobles y reposición de pavimentos asfálticos en calzadas y bermas, previa recuperación con bacheos y sellado de grietas, señalización vial y demarcación del pavimento.","images":[]},{"title":"Obras en Autopistas Concesionadas","text":"Desnivelación de enlaces viales en Ruta 5 Norte y Sur, y reposición de pavimentos de hormigón en mal estado en calzadas de autopistas concesionadas.","images":[]},{"title":"Obras en Aeropuertos","text":"Reparación y ensanche de pistas de rodado y pista principal mediante fresado, nueva base granular y colocación de pavimento asfáltico.","images":[]}]'),
    ('show_equipo', '1'),
    ('equipo_eyebrow', 'Nuestro equipo'),
    ('equipo_heading', 'Profesionales a cargo'),
    ('team_json', '[]'),
    ('show_contacto', '1'),
    ('contacto_eyebrow', 'Contacto'),
    ('contacto_heading', 'Conversemos sobre tu proyecto'),
    ('contacto_subtitle', 'Cuéntanos qué necesitas y te responderemos a la brevedad con una propuesta a la medida.'),
    ('contact_email', 'omaluenda@ingenierosviales.cl'),
    ('contact_cc_email', 'omaluendar@gmail.com'),
    ('contact_phone', ''),
    ('contact_address', ''),
    ('show_footer', '1'),
    ('footer_text', '')
ON DUPLICATE KEY UPDATE content_key = content_key;
