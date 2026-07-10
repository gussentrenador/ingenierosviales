# Empresa de Ingeniería — Sitio web

Landing page + panel de administración para editar textos e imágenes, con formulario de contacto que envía correo. Pensado para alojarse en un hosting **cPanel** estándar (PHP + MySQL).

## Arquitectura

- **`frontend/`** — React + Vite. Se compila a archivos estáticos (`dist/`) que se suben a `public_html`.
- **`backend/`** — API en PHP puro + MySQL. Se sube a `public_html/api`. No requiere Node.js en el servidor.

El landing público lee sus textos/imágenes desde la base de datos (vía `GET /api/content.php`), y el panel `/admin` permite editarlos.

## 1. Requisitos locales

- [Node.js](https://nodejs.org/) 20+ y npm
- PHP 8.2+ (con extensión `pdo_mysql`)
- MySQL o MariaDB (puedes usar [Laragon](https://laragon.org/) o [XAMPP](https://www.apachefriends.org/) en Windows, o instalarlo directo en Mac/Linux)
- Git

## 2. Poner el proyecto a correr en local

### 2.1. Base de datos

1. Crea una base de datos vacía (ej. `engweb`) en tu MySQL local.
2. Importa el esquema:
   ```bash
   mysql -u root --default-character-set=utf8mb4 engweb < backend/schema.sql
   ```
   > Importante: usa siempre `--default-character-set=utf8mb4` al importar (o el modo de importación UTF-8 de phpMyAdmin), o las tildes se guardarán corruptas.

### 2.2. Backend (API PHP)

```bash
cd backend
cp config.example.php config.php
```

Edita `config.php` con los datos de tu base de datos local. Deja `cors_origin` en `http://localhost:5173` (puerto por defecto de Vite).

Crea tu usuario administrador:
```bash
php create_admin.php admin tu_contraseña_segura
```

Levanta el servidor PHP embebido:
```bash
php -S localhost:8000
```

### 2.3. Frontend (React)

En otra terminal:
```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173`. El proxy de Vite (configurado en `vite.config.js`) redirige `/api/*` hacia `http://localhost:8000`, así que no necesitas configurar nada más para desarrollar.

- Landing: `http://localhost:5173/`
- Admin: `http://localhost:5173/admin/login`

### 2.4. Probar el envío de correo localmente

`contact.php` usa la función nativa `mail()` de PHP, que depende de tener un servidor de correo (sendmail/MTA) configurado en tu máquina. En cPanel esto funciona sin configuración extra. En tu computador local es normal que falle si no tienes un MTA instalado — puedes ignorarlo en desarrollo y probarlo ya en el servidor de producción, o instalar algo como [Mailhog](https://github.com/mailhog/MailHog) / `msmtp` para verlo localmente.

## 3. Cómo editar el sitio desde /admin

Cada sección del landing (Hero, Nosotros, Servicios, Proyectos, Contacto, Footer) tiene sus campos de texto e imagen editables en `/admin`. Al guardar, los cambios quedan en la tabla `site_content` y se reflejan de inmediato en el landing público.

Si quieres agregar más campos editables (ej. un cuarto servicio), edita en paralelo:
1. `frontend/src/content-schema.js` (agrega el campo al formulario de admin)
2. `backend/content.php` (agrega la key a `ALLOWED_KEYS`)
3. `backend/schema.sql` (agrega el valor por defecto)
4. El componente del landing correspondiente (`frontend/src/components/...`)

## 4. Subir el proyecto a GitHub

```bash
cd empresa-ingenieria-web
git init
git add .
git status   # revisa que NO aparezca backend/config.php ni backend/uploads/
git commit -m "Proyecto inicial: landing + admin para empresa de ingeniería"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

## 5. Desplegar en cPanel

### 5.1. Base de datos

1. En cPanel, entra a **MySQL® Databases** y crea una base de datos y un usuario con todos los privilegios sobre ella.
2. Entra a **phpMyAdmin**, selecciona la base de datos y usa **Importar** para subir `backend/schema.sql` (asegúrate que la codificación de importación sea `utf8mb4`).

### 5.2. Backend

1. Sube todo el contenido de la carpeta `backend/` (excepto `config.php`, que no existe en git) a `public_html/api/` (por FTP, Git deploy, o el Administrador de archivos de cPanel).
2. En el servidor, crea `public_html/api/config.php` a partir de `config.example.php` con:
   - Credenciales de la base de datos que creaste en el paso anterior (normalmente `localhost` como host).
   - `cors_origin`: la URL real de tu sitio (ej. `https://tudominio.com`), **sin barra al final**.
   - Datos de `mail.from_email` / `mail.to_fallback` con tu dominio.
3. Por SSH o Terminal de cPanel (si está disponible en tu plan), corre:
   ```bash
   php create_admin.php admin tu_contraseña_segura
   ```
   Si tu plan no tiene terminal/SSH, genera el hash localmente con `php -r "echo password_hash('tu_contraseña', PASSWORD_DEFAULT);"` e insértalo manualmente en la tabla `admin_users` desde phpMyAdmin.
4. Confirma que `public_html/api/uploads/` sea escribible por PHP (normalmente ya lo es; si no, ajusta permisos a 755).

### 5.3. Frontend

1. En tu computador: `cd frontend && npm run build`.
2. Sube **el contenido** de `frontend/dist/` (no la carpeta en sí) a `public_html/` (la raíz de tu dominio, o la subcarpeta correspondiente si usas un subdominio).
3. Verifica que el archivo `.htaccess` (incluido automáticamente en el build) haya quedado en `public_html/`.

### 5.4. Verificación final

- Visita tu dominio: debe cargar el landing con el contenido de la base de datos.
- Visita `tudominio.com/admin/login`, inicia sesión y confirma que puedes editar texto/imágenes y que se reflejan en el landing.
- Envía un mensaje desde el formulario de contacto y confirma que llega al correo configurado en `contact_email` (editable desde `/admin`, sección Contacto).

## Estructura del proyecto

```
empresa-ingenieria-web/
├── frontend/          # React (Vite) — se compila y sube a public_html/
├── backend/           # API PHP — se sube a public_html/api/
│   ├── config.example.php
│   ├── bootstrap.php  # conexión DB, sesión, CORS, helpers
│   ├── auth.php       # login/logout/sesión admin
│   ├── content.php    # lectura/edición de textos e imágenes
│   ├── upload.php     # subida de imágenes
│   ├── contact.php    # envío de correo del formulario
│   ├── create_admin.php
│   └── schema.sql
└── README.md
```
