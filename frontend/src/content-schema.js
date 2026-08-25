// Define aquí los campos editables desde /admin. Cada key debe existir también
// en backend/schema.sql (tabla site_content) con su valor por defecto.
export const CONTENT_SCHEMA = [
  {
    section: 'Empresa',
    fields: [
      { key: 'company_name', label: 'Nombre de la empresa', type: 'text' },
      { key: 'company_tagline', label: 'Eslogan corto', type: 'text' },
      { key: 'accent_color', label: 'Color de énfasis (botones, íconos y acentos de todo el sitio)', type: 'color' },
    ],
  },
  {
    section: 'Orden de las secciones',
    fields: [{ key: 'section_order_json', label: 'Orden', type: 'order' }],
  },
  {
    section: 'Modo mantención / en construcción',
    fields: [
      {
        key: 'maintenance_mode',
        label: 'Activar vista de mantención (oculta el sitio a los visitantes)',
        type: 'checkbox',
        defaultOn: false,
      },
      { key: 'maintenance_title', label: 'Título del aviso', type: 'text' },
      { key: 'maintenance_message', label: 'Mensaje del aviso', type: 'textarea' },
    ],
  },
  {
    section: 'Hero (portada)',
    fields: [
      { key: 'hero_title', label: 'Título principal', type: 'text' },
      { key: 'hero_subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'hero_image', label: 'Imagen de fondo', type: 'image' },
      {
        key: 'show_navbar_cta',
        label: 'Mostrar botón "Contacto" en el menú superior',
        type: 'checkbox',
      },
      {
        key: 'show_hero_cta',
        label: 'Mostrar botón "Contacto" en la portada',
        type: 'checkbox',
      },
    ],
  },
  {
    section: 'Estadísticas (franja de confianza)',
    fields: [
      {
        key: 'show_stats',
        label: 'Mostrar esta sección',
        type: 'checkbox',
      },
      { key: 'stat_1_value', label: 'Estadística 1 · valor (ej: 15+)', type: 'text' },
      { key: 'stat_1_label', label: 'Estadística 1 · etiqueta', type: 'text' },
      { key: 'stat_2_value', label: 'Estadística 2 · valor', type: 'text' },
      { key: 'stat_2_label', label: 'Estadística 2 · etiqueta', type: 'text' },
      { key: 'stat_3_value', label: 'Estadística 3 · valor', type: 'text' },
      { key: 'stat_3_label', label: 'Estadística 3 · etiqueta', type: 'text' },
      { key: 'stat_4_value', label: 'Estadística 4 · valor', type: 'text' },
      { key: 'stat_4_label', label: 'Estadística 4 · etiqueta', type: 'text' },
    ],
  },
  {
    section: 'Nosotros',
    fields: [
      {
        key: 'show_nosotros',
        label: 'Mostrar esta sección',
        type: 'checkbox',
      },
      { key: 'nosotros_eyebrow', label: 'Texto superior (eyebrow)', type: 'text' },
      {
        key: 'stat_1_value',
        label: 'Años de experiencia (ej: 30+) — se muestra en el sello sobre la foto y en la lista',
        type: 'text',
      },
      { key: 'about_title', label: 'Título', type: 'text' },
      { key: 'about_text', label: 'Descripción', type: 'textarea' },
      { key: 'about_image', label: 'Imagen', type: 'image' },
      { key: 'highlights_json', label: 'Puntos destacados', type: 'list' },
    ],
  },
  {
    section: 'Por qué elegirnos',
    fields: [
      {
        key: 'show_whyus',
        label: 'Mostrar esta sección',
        type: 'checkbox',
      },
      { key: 'whyus_eyebrow', label: 'Texto superior (eyebrow)', type: 'text' },
      { key: 'whyus_title', label: 'Título de la sección', type: 'text' },
      { key: 'whyus_pillars_json', label: 'Puntos (de 1 a 6)', type: 'pillars' },
    ],
  },
  {
    section: 'Servicios',
    fields: [
      {
        key: 'show_servicios',
        label: 'Mostrar esta sección',
        type: 'checkbox',
      },
      { key: 'services_eyebrow', label: 'Texto superior (eyebrow)', type: 'text' },
      { key: 'services_heading', label: 'Título de la sección', type: 'text' },
      { key: 'services_json', label: 'Servicios (de 1 a 5)', type: 'services' },
    ],
  },
  {
    section: 'Proyectos',
    fields: [
      {
        key: 'show_proyectos',
        label: 'Mostrar esta sección',
        type: 'checkbox',
      },
      { key: 'proyectos_eyebrow', label: 'Texto superior (eyebrow)', type: 'text' },
      { key: 'proyectos_heading', label: 'Título de la sección', type: 'text' },
      { key: 'proyectos_subtitle', label: 'Subtítulo', type: 'text' },
      { key: 'projects_json', label: 'Proyectos (de 1 a 6, cada uno con su collage de fotos)', type: 'projects' },
    ],
  },
  {
    section: 'Equipo (LinkedIn)',
    fields: [
      {
        key: 'show_equipo',
        label: 'Mostrar esta sección',
        type: 'checkbox',
      },
      { key: 'equipo_eyebrow', label: 'Texto superior (eyebrow)', type: 'text' },
      { key: 'equipo_heading', label: 'Título de la sección', type: 'text' },
      { key: 'team_json', label: 'Profesionales (hasta 8)', type: 'team' },
    ],
  },
  {
    section: 'Contacto',
    fields: [
      {
        key: 'show_contacto',
        label: 'Mostrar esta sección',
        type: 'checkbox',
      },
      { key: 'contacto_eyebrow', label: 'Texto superior (eyebrow)', type: 'text' },
      { key: 'contacto_heading', label: 'Título de la sección', type: 'text' },
      { key: 'contacto_subtitle', label: 'Subtítulo', type: 'text' },
      { key: 'contact_email', label: 'Email que recibe los mensajes', type: 'text' },
      { key: 'contact_cc_email', label: 'Copia (CC) del correo (opcional)', type: 'text' },
      { key: 'contact_phone', label: 'Teléfono', type: 'text' },
      { key: 'contact_address', label: 'Dirección', type: 'text' },
    ],
  },
  {
    section: 'Pie de página',
    fields: [
      {
        key: 'show_footer',
        label: 'Mostrar pie de página',
        type: 'checkbox',
      },
      { key: 'footer_text', label: 'Texto de pie de página', type: 'text' },
    ],
  },
]
