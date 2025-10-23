import { CANVAS_CONFIG } from './canvasConfig.js';
import { drawFlagToCanvas } from './webglUtils.js';
import { FLAGS_CONFIG } from './listaBandera.js';
import { showFullscreen } from './fullscreen.js';

export function initializeGallery(flags) {
    const gallery = document.querySelector('.flags-gallery');
    const flagsListContainer = document.getElementById('flagsListContainer');
    const sortedFlags = [...FLAGS_CONFIG].sort((a, b) =>
        a.name.localeCompare(b.name, 'es')
    );

    // Genera elementos de galería
    sortedFlags.forEach((flag, index) => {
        if (!flags[flag.key]) return;
        const flagFunction = flags[flag.key];

        const flagItem = document.createElement('div');
        flagItem.className = 'flag-item d-flex flex-column align-items-center';

        const canvas = document.createElement('canvas');
        canvas.id = `${flag.key}Flag`;
        canvas.className = 'flag-canvas';
        canvas.width = CANVAS_CONFIG.gallery.width;
        canvas.height = CANVAS_CONFIG.gallery.height;
        canvas.onclick = () => showFullscreen(flag.key);

        const name = document.createElement('p');
        name.className = 'flag-name';
        name.textContent = flag.name;

        flagItem.appendChild(canvas);
        flagItem.appendChild(name);
        gallery.appendChild(flagItem);

        // Renderizado escalonado para evitar sobrecarga
        setTimeout(() => {
            drawFlagToCanvas(canvas, CANVAS_CONFIG.gallery.flagWidth, flagFunction);
        }, index * 10);
    });

    // Generar lista lateral
    sortedFlags.forEach(flag => {
        if (!flags[flag.key]) return;
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'flag-link';
        link.textContent = `${flag.emoji} ${flag.name}`;
        link.dataset.countryName = normalizeText(flag.name);
        link.onclick = (e) => {
            e.preventDefault();
            showFullscreen(flag.key);
        };
        flagsListContainer.appendChild(link);
    });

    setupSearch();
}

export function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

export function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const flagLinks = document.querySelectorAll('.flag-link');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = normalizeText(e.target.value.trim());
        flagLinks.forEach(link => {
            const countryName = normalizeText(link.dataset.countryName);
            link.style.display = countryName.includes(searchTerm) ? 'block' : 'none';
        });
    });

    // Limpiar búsqueda con ESC
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            flagLinks.forEach(link => link.style.display = 'block');
        }
    });
}

