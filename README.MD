# 🍣 Kuro Sushi | Modern & Minimalist Sushi Landing Page

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-MobileFirst-success?style=for-the-badge)

Una landing page y sistema de pedidos interactivo de alta gama para un restaurante de sushi, desarrollada con **Vanilla JavaScript, CSS3 moderno y HTML5**. Diseñada con un enfoque estético minimalista, modo oscuro y optimización total para dispositivos móviles.

[🔗 Ver Demo en Vivo](https://karmrls.github.io/kuro-sushi/)(#) *(Opcional: Añade el enlace de GitHub Pages aquí)*

</div>

---

## 🌟 Características Principales

* **🎨 Diseño Dark Mode & Glassmorphism:** Interfaz oscura sofisticada (`#121212`) con detalles en rojo carmesí (`--accent-red`), efectos de cristal esmerilado y tipografía inmersiva.
* **🛒 Carrito de Compras Persistente:** Sistema construido con `localStorage` que retiene los platillos seleccionados al navegar entre distintas páginas, actualizando totales y contadores en tiempo real.
* **📱 Checkout Táctil y Ergonómico:** Paneles de entrega diseñados para la comodidad del pulgar en móviles, permitiendo alternar dinámicamente entre *Recoger en sucursal* y *Envío a domicilio* (con validación de dirección inteligente).
* **💬 Integración Directa con WhatsApp:** Empaqueta automáticamente el pedido completo (cliente, método de entrega, dirección, productos, cantidades y total) y genera un enlace directo de cotización sin necesidad de servidores backend o comisiones de terceros.
* **⚡ 100% Vanilla Tech:** Sin frameworks pesados; velocidad de carga ultrarrápida, código limpio y modular optimizado para un rendimiento excepcional.

---

## 📂 Arquitectura del Proyecto

El proyecto está estructurado bajo una arquitectura multi-página estática interconectada:

```text
kuro-sushi/
│
├── index.html          # Página principal (Hero, destacados, historia)
├── platillos.html      # Menú completo de rollos y especialidades
├── bebidas.html        # Sección de bebidas y coctelería
├── postres.html        # Sección de repostería japonesa
├── contacto.html       # Información de ubicación y horarios
│
├── css/
│   └── style.css       # Hoja de estilos global unificada (Variables, Grid/Flexbox)
│
└── js/
    └── main.js         # Lógica central (Menú móvil, Intersection Observer, Carrito y WhatsApp)

💻 Tecnologías y Herramientas
HTML5: Marcado semántico y accesible.

CSS3: Custom Properties (Variables CSS), diseño adaptable con Flexbox y Grid, animaciones fluidas al hacer scroll (Intersection Observer).

JavaScript (ES6+): Manipulación del DOM, gestión de estado local (localStorage) y manejo de eventos.

Iconografía y Tipografía: FontAwesome 6 y Google Fonts (Shojumaru).

🚀 Instalación y Ejecución Local
Si deseas clonar y probar este proyecto en tu entorno local, sigue estos sencillos pasos:

Clona este repositorio:

Bash
git clone [https://github.com/tu-usuario/kuro-sushi.git](https://github.com/tu-usuario/kuro-sushi.git)
Abre la carpeta del proyecto en tu editor de código favorito (ej. Visual Studio Code).

Instala la extensión Live Server en VS Code.

Haz clic derecho en index.html y selecciona "Open with Live Server".

💡 Propósito del Proyecto
Este proyecto fue desarrollado como una solución comercial escalable para negocios gastronómicos locales que buscan eliminar las altas comisiones de las aplicaciones de delivery tradicionales, ofreciendo una experiencia digital fluida, moderna y directa a través de mensajería instantánea.

👤 Autor
Hiram Rosales Segovia
GitHub | LinkedIn
Estudiante de Ingeniería en Inteligencia Artificial primer grado universitario 2026