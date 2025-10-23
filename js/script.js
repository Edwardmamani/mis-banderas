import { flags } from "./flag/index.js";
import { initializeGallery } from "./util/gallery.js";

// Hacer las flags disponibles globalmente para el módulo fullscreen
window.currentFlags = flags;

function init() {
    initializeGallery(flags);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}