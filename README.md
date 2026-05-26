<p align="center">
  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="280" alt="Laravel Logo">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/reactjs/react.dev/main/src/images/brand/logo_dark.svg" width="80" alt="React Logo">
</p>

<h1 align="center">DevPups 🐶</h1>

<p align="center">
  Aplicación web full-stack para gestionar una galería de cachorros con sistema de likes, búsqueda paginada y subida de imágenes optimizadas.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-13-FF2D20?logo=laravel&logoColor=white" alt="Laravel 13">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/Inertia.js-3-6C47FF?logo=inertia&logoColor=white" alt="Inertia.js 3">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4">
</p>

---

## Descripción

La aplicación permite a los usuarios registrados crear, editar y eliminar cachorros, dar "me gusta" a sus favoritos y buscar por nombre o rasgo de personalidad.

El proyecto tiene una transición completa desde una aplicación React pura con API externa hasta una arquitectura monolítica moderna con Laravel + Inertia, donde el backend y el frontend conviven en el mismo repositorio.

## Stack tecnológico

- **Backend**: Laravel 13, PHP 8.4, SQLite
- **Frontend**: React 19, TypeScript, Tailwind CSS 4
- **Integración**: Inertia.js 3 con Wayfinder (rutas tipadas)
- **UI**: shadcn/ui + Radix UI
- **Autenticación**: Laravel Fortify
- **Procesamiento de imágenes**: Intervention Image v4 (conversión a WebP)
- **Herramientas**: Vite 8, ESLint, Prettier

## Características

- **Autenticación completa** con registro, login, logout y verificación de email.
- **CRUD de cachorros** con autorización por policies (solo el propietario puede editar o eliminar).
- **Sistema de likes** con relación many-to-many y toggle.
- **Búsqueda en tiempo real** con debounce (lodash-es) por nombre y rasgo de personalidad.
- **Paginación** con persistencia de parámetros de búsqueda (`withQueryString`).
- **Subida de imágenes** con optimización automática a WebP y escalado a 1000px máximo.
- **Lista de preseleccionados (Shortlist)** independiente de la paginación.
- **Notificaciones toast** con Sonner integrado vía `Inertia::flash()`.
- **Modales de confirmación** para acciones destructivas (Dialog de Radix UI).
- **Feedback visual** con spinners de carga en likes, borrado y creación.
- **Comando Artisan** para limpiar imágenes huérfanas del almacenamiento.

## Requisitos previos

- PHP 8.4+
- Composer
- Node.js 22+
- npm

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/react-inertia.git
cd react-inertia

# Instalar dependencias de PHP
composer install

# Instalar dependencias de Node
npm install

# Configurar el entorno
cp .env.example .env
php artisan key:generate

# Crear la base de datos SQLite
touch database/database.sqlite

# Ejecutar migraciones y seeders
php artisan migrate --seed

# Crear el enlace simbólico de Storage
php artisan storage:link
```

## Desarrollo

```bash
# Iniciar todos los servicios (servidor, Vite, queue, logs)
composer dev
```

La aplicación estará disponible en `http://puppies.test` (con Laravel Herd) o en `http://localhost:8000`.

## Estructura del proyecto

```
app/
├── Actions/
│   └── OptimizeWebpImageAction.php    # Optimización de imágenes a WebP
├── Console/Commands/
│   └── DeleteUnusedPuppyImages.php    # Limpieza de imágenes huérfanas
├── Http/
│   ├── Controllers/
│   │   └── PuppyController.php        # CRUD + likes
│   └── Resources/
│       ├── PuppyResource.php          # Transformación de datos + permisos
│       └── UserResource.php
├── Models/
│   ├── Puppy.php                      # Modelo con relaciones y scope de búsqueda
│   └── User.php                       # Relaciones: puppies, likedPuppies
└── Policies/
    └── PuppyPolicy.php                # Autorización: update, delete

resources/js/
├── components/
│   ├── Container.tsx
│   ├── Header.tsx                     # Auth state, login/logout
│   ├── ImageUploadPreview.tsx         # Preview de imagen con blob URL
│   ├── LikeToggle.tsx                 # Toggle de likes con Inertia
│   ├── NewPuppyForm.tsx               # Creación con useForm + upload
│   ├── PageWrapper.tsx
│   ├── PuppiesList.tsx                # Grid paginada de cachorros
│   ├── PuppyDelete.tsx                # Modal de confirmación de borrado
│   ├── PuppyUpdate.tsx                # Modal de edición
│   ├── Search.tsx                     # Búsqueda con debounce
│   ├── Shortlist.tsx                  # Lista de favoritos
│   └── ui/                            # Componentes shadcn/ui
├── pages/
│   └── puppies/
│       └── index.tsx                  # Vista principal
├── routes/
│   └── puppies/                       # Rutas generadas por Wayfinder
├── types/
│   └── puppy.ts                       # Tipos: Puppy, Paginated, Filters
└── hooks/
    └── use-flash-toast.ts             # Hook para notificaciones toast
```

## Comandos útiles

```bash
# Verificar tipos TypeScript
npm run types:check

# Lint con autofix
npm run lint

# Formatear código
npm run format

# Limpiar imágenes huérfanas
php artisan delete-unused-puppy-images
```

## Créditos

Developer thesnakebite
