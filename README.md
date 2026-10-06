# 🔧 Tu Taller (tutaller.com)

**Tu Taller** es una aplicación web que busca **facilitar el acceso a servicios de mecánica** para propietarios de carros y motos. Ofrece una solución digital donde los usuarios pueden **encontrar talleres, consultar servicios y cotizaciones, comparar opciones y agendar sus citas** de forma rápida, fácil y organizada.

---

## 📋 Tabla de contenido

- [Tecnologías](#-tecnologías)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Descripción de carpetas](#-descripción-de-carpetas)
- [Flujo de trabajo con Git](#-flujo-de-trabajo-con-git)
- [Convenciones del equipo](#-convenciones-del-equipo)
- [Cómo ejecutar el proyecto](#-cómo-ejecutar-el-proyecto)

---

## 🛠 Tecnologías

- **HTML5**: estructura de las páginas
- **CSS3**: estilos propios
- **JavaScript (Vanilla)**: lógica e interacción
- **Bootstrap**: sistema de diseño responsive y componentes

---

## 📁 Estructura del proyecto

```
tuTallerPuntoCom/
├── assets/
│   ├── icons/
│   └── img/
├── css/
├── js/
│   └── main.js
├── pages/
├── index.html
└── README.md
```

---

## 📂 Descripción de carpetas

| Carpeta / Archivo | Descripción |
|---|---|
| `assets/` | Recursos estáticos del proyecto (no son código). |
| `assets/icons/` | Íconos y favicon (preferiblemente en `.svg`). |
| `assets/img/` | Logos, banners y fotografías (preferiblemente `.webp` o `.svg`, comprimidas). |
| `css/` | Hojas de estilo propias del proyecto. Se cargan **después** de Bootstrap para poder sobrescribirlo. |
| `js/` | Código JavaScript del proyecto. |
| `js/main.js` | Punto de entrada: contiene la lógica común a todas las páginas. |
| `pages/` | Páginas HTML internas de la aplicación (servicios, talleres, citas, etc.). |
| `index.html` | Página de inicio de la aplicación. |
| `README.md` | Documentación del proyecto (este archivo). |

> 💡 **Rutas a los recursos:** desde `index.html` una imagen se llama con `assets/img/logo.png`, pero desde `pages/` se llama con `../assets/img/logo.png`.

---

## 🌿 Flujo de trabajo con Git

El proyecto usa tres tipos de ramas:

| Rama | Propósito |
|---|---|
| `main` | Contiene el código **que está en producción**. Solo recibe cambios ya probados y estables. **Nunca se trabaja directamente aquí.** |
| `develop` | Rama de **desarrollo**. Aquí se integran y se prueban todas las funcionalidades antes de pasar a producción. |
| `feature/nombre-de-la-tarea` | Una rama **por cada tarea o funcionalidad**. Se crea desde `develop` y, al terminar, se une de nuevo a `develop`. |

### Diagrama del flujo

```
main      ●────────────────────────●──────────▶   (producción)
           \                      ↑
develop     ●───●────●────●───────●──────────▶   (desarrollo)
                 \   ↑     \     ↑
feature/citas     ●──●      \    │
feature/talleres             ●───●
```

### Pasos para trabajar en una tarea

1. Actualiza `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   ```
2. Crea tu rama de tarea:
   ```bash
   git checkout -b feature/nombre-de-la-tarea
   ```
3. Trabaja y guarda tus cambios con commits claros:
   ```bash
   git add .
   git commit -m "feat: agrega formulario de agendar cita"
   ```
4. Sube tu rama:
   ```bash
   git push origin feature/nombre-de-la-tarea
   ```
5. Abre un **Pull Request** hacia `develop` y espera la revisión.
6. Cuando `develop` esté estable y probado, se hace un Pull Request de `develop` hacia `main` para publicar.

### Ejemplos de nombres de ramas

- `feature/buscar-talleres`
- `feature/agendar-cita`
- `feature/cotizaciones`
- `feature/comparar-servicios`

---

## 📏 Convenciones del equipo

1. **Una página = un HTML + un JS.** Quien trabaja en una página solo toca sus archivos, así se evitan conflictos.
2. **Nombres de archivos** en minúscula, sin espacios ni tildes (`agendar-cita.html`).
3. **Funciones y variables** en `camelCase` (`crearCita()`).
4. **No editar los archivos de Bootstrap**; sobrescribir con clases propias en `css/`.
5. **Imágenes comprimidas** antes de subirlas al repositorio.
6. **Commits claros y en presente**, por ejemplo: `feat: agrega buscador de talleres`, `fix: corrige ruta de imagen`.
7. **Nunca hacer commit directo a `main` ni a `develop`**; todo entra por Pull Request.

---

## 🚀 Cómo ejecutar el proyecto

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd tuTallerPuntoCom
   ```
2. Cambia a la rama de desarrollo:
   ```bash
   git checkout develop
   ```
3. Abre `index.html` en el navegador, o usa la extensión **Live Server** de VS Code para ver los cambios en tiempo real.

---

## 👥 Equipo

> Agrega aquí los nombres de las personas que participan en el proyecto.

---

⭐ *Tu Taller: el mecánico que necesitas, a un clic de distancia.*