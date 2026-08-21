// Define aquí los campos editables desde /admin. Cada key debe existir también
// en backend/schema.sql (tabla site_content) con su valor por defecto.
export const CONTENT_SCHEMA = [
  {
    section: 'Empresa',
    fields: [
      { key: 'company_name', label: 'Nombre de la empresa', type: 'text' },
      { key: 'company_tagline', label: 'Eslogan corto', type: 'text' },
    ],
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
        key: 'stat_1_value',
        label: 'Años de experiencia (ej: 30+) — se muestra en el sello sobre la foto y en la lista',
        type: 'text',
      },
      { key: 'about_title', label: 'Título', type: 'text' },
      { key: 'about_text', label: 'Descripción', type: 'textarea' },
      { key: 'about_image', label: 'Imagen', type: 'image' },
      { key: 'highlight_1', label: 'Punto destacado 1', type: 'text' },
      { key: 'highlight_2', label: 'Punto destacado 2', type: 'text' },
      { key: 'highlight_3', label: 'Punto destacado 3', type: 'text' },
    ],
  },
  {
    section: 'Por qué elegirnos',
    fields: [
      { key: 'whyus_title', label: 'Título de la sección', type: 'text' },
      { key: 'whyus_pillar_1_title', label: 'Punto 1 · título', type: 'text' },
      { key: 'whyus_pillar_1_text', label: 'Punto 1 · descripción', type: 'textarea' },
      { key: 'whyus_pillar_2_title', label: 'Punto 2 · título', type: 'text' },
      { key: 'whyus_pillar_2_text', label: 'Punto 2 · descripción', type: 'textarea' },
      { key: 'whyus_pillar_3_title', label: 'Punto 3 · título', type: 'text' },
      { key: 'whyus_pillar_3_text', label: 'Punto 3 · descripción', type: 'textarea' },
      { key: 'whyus_pillar_4_title', label: 'Punto 4 · título', type: 'text' },
      { key: 'whyus_pillar_4_text', label: 'Punto 4 · descripción', type: 'textarea' },
    ],
  },
  {
    section: 'Servicios',
    fields: [{ key: 'services_json', label: 'Servicios (de 1 a 5)', type: 'services' }],
  },
  {
    section: 'Proyectos',
    fields: [
      { key: 'projects_json', label: 'Proyectos (de 1 a 6, cada uno con su collage de fotos)', type: 'projects' },
    ],
  },
  {
    section: 'Contacto',
    fields: [
      { key: 'contact_email', label: 'Email que recibe los mensajes', type: 'text' },
      { key: 'contact_cc_email', label: 'Copia (CC) del correo (opcional)', type: 'text' },
      { key: 'contact_phone', label: 'Teléfono', type: 'text' },
      { key: 'contact_address', label: 'Dirección', type: 'text' },
    ],
  },
  {
    section: 'Pie de página',
    fields: [{ key: 'footer_text', label: 'Texto de pie de página', type: 'text' }],
  },
]
