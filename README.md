# 🏳️ Galería de Banderas - WebGL

Una aplicación web interactiva que renderiza banderas de diferentes países utilizando WebGL. El proyecto presenta una galería visual con representaciones precisas de banderas nacionales, incluyendo diseños complejos como la bandera de Nepal.

## 🌍 Banderas Incluidas

- 🇷🇴 **Rumania** - Bandera tricolor horizontal
- 🇱🇨 **Santa Lucía** - Bandera con diseño tropical
- 🇨🇫 **República Centroafricana** - Bandera con franjas y estrella
- 🇼🇸 **Samoa** - Bandera con constelación del sur
- 🇰🇳 **San Cristóbal y Nieves** - Bandera con diseño caribeño
- 🇿🇲 **Zambia** - Bandera con águila y franjas
- 🇿🇼 **Zimbabue** - Bandera con diseño africano
- 🇳🇵 **Nepal** - Bandera única con forma de dos triángulos

## 🚀 Instalación y Uso

### Requisitos Previos

- Navegador web moderno con soporte para WebGL
- Servidor web local (opcional, para desarrollo)

### Instalación

1. **Clonar el repositorio**:
```bash
git clone https://github.com/Edwardmamani/mis-banderas
cd mis-banderas
```

2. **Abrir en navegador**:
   - Opción 1: Abrir directamente `index.html` en el navegador
   - Opción 2: Usar un servidor local (recomendado para evitar restricciones de CORS, etc):
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve .

# Con PHP
php -S localhost:8000
```
   - Opción 3: Usar la extensión **Go Live** de VS Code:
     1. Instala la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en Visual Studio Code.
     2. Abre la carpeta del proyecto en VS Code.
     3. Haz clic derecho en `index.html` y selecciona **"Open with Live Server"** o haz clic en el botón **"Go Live"** en la barra de estado de VS Code.

3. **Acceder a la aplicación**:
   - Si empleas un servidor local, navega a `http://localhost:8000`
   - Si usas **Go Live/Live Server**, se abrirá automáticamente en tu navegador (usualmente en `http://127.0.0.1:5500` o similar)

## 🏗️ Estructura del Proyecto

```
mis-banderas/
├── index.html              # Página principal
├── css/
│   └── style.css           # Estilos de la aplicación
├── js/
│   ├── script.js           # Script principal
│   ├── flag/               # Definiciones de banderas
│   │   ├── index.js        # Exportaciones de banderas
│   │   ├── nepal.js        # Bandera de Nepal
│   │   ├── rumania.js      # Bandera de Rumania
│   │   └── ...             # Otras banderas
│   └── util/               # Utilidades
│       ├── canvasConfig.js # Configuración de canvas
│       ├── gallery.js      # Lógica de galería
│       ├── fullscreen.js   # Vista pantalla completa
│       ├── webglUtils.js   # Utilidades WebGL
│       └── listaBandera.js # Lista de banderas
└── README.md               # Este archivo
```

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos y diseño responsivo
- **JavaScript ES6+**: Lógica de la aplicación
- **WebGL**: Renderizado de gráficos 3D/2D
- **Bootstrap 5**: Framework CSS para componentes
- **Canvas API**: Manipulación de elementos canvas
