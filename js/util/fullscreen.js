import { CANVAS_CONFIG } from './canvasConfig.js';
import { drawFlagToCanvas } from './webglUtils.js';
import { FLAGS_CONFIG } from './listaBandera.js';

let fullscreenCanvas, isResizing = false, flagWidth = 1400;
let startX, startY, startWidth, currentFlag;

export function showFullscreen(country) {
    const flagConfig = FLAGS_CONFIG.find(f => f.key === country);
    if (!flagConfig) return;

    currentFlag = country;
    const flags = window.currentFlags || {};
    const flagFunction = flags[country] || createPlaceholderFlag;

    fullscreenCanvas = document.getElementById('fullscreenCanvas');
    document.getElementById('fullscreenView').style.display = 'flex';
    document.getElementById('fullscreenTitle').textContent = `Bandera de ${flagConfig.name}`;

    drawFlagToCanvas(fullscreenCanvas, flagWidth, flagFunction);

    fullscreenCanvas.onmousemove = handleMouseMove;
    fullscreenCanvas.onmousedown = handleMouseDown;
    fullscreenCanvas.onmouseup = () => isResizing = false;
    document.onmouseup = () => isResizing = false;
}

function handleMouseMove(e) {
    const rect = fullscreenCanvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (isResizing) {
        const dx = mx - startX;
        flagWidth = Math.max(400, Math.min(1500, startWidth + dx * 2));
        // Necesitamos acceso a las flags aquí, pero no podemos importarlas circularmente
        // Esto se resolverá en el script principal
        if (window.currentFlags) {
            const flagFunction = window.currentFlags[currentFlag] || createPlaceholderFlag;
            drawFlagToCanvas(fullscreenCanvas, flagWidth, flagFunction);
        }
    } else {
        const flag = {
            x: (fullscreenCanvas.width - flagWidth) / 2,
            y: (fullscreenCanvas.height - flagWidth * 0.625) / 2,
            width: flagWidth,
            height: flagWidth * 0.625
        };
        const corner = { x: flag.x + flag.width, y: flag.y + flag.height };
        const isNearCorner = Math.abs(mx - corner.x) < 20 && Math.abs(my - corner.y) < 20;
        fullscreenCanvas.style.cursor = isNearCorner ? 'nwse-resize' : 'default';
    }
}

function handleMouseDown(e) {
    if (fullscreenCanvas.style.cursor === 'nwse-resize') {
        isResizing = true;
        const rect = fullscreenCanvas.getBoundingClientRect();
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;
        startWidth = flagWidth;
    }
}

export function closeFullscreen() {
    document.getElementById('fullscreenView').style.display = 'none';
    fullscreenCanvas.onmousemove = null;
    fullscreenCanvas.onmousedown = null;
    fullscreenCanvas.onmouseup = null;
    document.onmouseup = null;
}

function createPlaceholderFlag(x, y, w, h) {
    return {
        positions: [x, y, x + w, y, x, y + h, x + w, y, x + w, y + h, x, y + h],
        colors: new Array(6).fill([0.5, 0.5, 0.5]).flat()
    };
}

// Cerrar fullscreen con ESC
document.onkeydown = (e) => {
    if (e.key === 'Escape') {
        const fullscreenView = document.getElementById('fullscreenView');
        if (fullscreenView && fullscreenView.style.display === 'flex') {
            closeFullscreen();
        }
    }
};
