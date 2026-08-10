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
        key: 'show_contact_cta',
        label: 'Mostrar botón "Contáctanos" (portada y menú superior)',
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
      { key: 'about_title', label: 'Título', type: 'text' },
      { key: 'about_text', label: 'Descripción', type: 'textarea' },
      { key: 'about_image', label: 'Imagen', type: 'image' },
    ],
  },
  {
    section: 'Servicios',
    fields: [{ key: 'services_json', label: 'Servicios (de 1 a 5)', type: 'services' }],
  },
  {
    section: 'Proyectos',
    fields: [
      { key: 'project_1_title', label: 'Proyecto 1 · título', type: 'text' },
      { key: 'project_1_text', label: 'Proyecto 1 · descripción', type: 'textarea' },
      { key: 'project_1_image', label: 'Proyecto 1 · imagen', type: 'image' },
      { key: 'project_2_title', label: 'Proyecto 2 · título', type: 'text' },
      { key: 'project_2_text', label: 'Proyecto 2 · descripción', type: 'textarea' },
      { key: 'project_2_image', label: 'Proyecto 2 · imagen', type: 'image' },
      { key: 'project_3_title', label: 'Proyecto 3 · título', type: 'text' },
      { key: 'project_3_text', label: 'Proyecto 3 · descripción', type: 'textarea' },
      { key: 'project_3_image', label: 'Proyecto 3 · imagen', type: 'image' },
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
