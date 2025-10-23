export function nepal(x, y, w, h) {
    const positions = [];
    const colors = [];

    const red = [0.76, 0.07, 0.18];   // rojo 
    const blue = [0.02, 0.16, 0.47];  // azul marino del borde
    const white = [1, 1, 1];          // blanco puro

    const size = Math.min(w, h);
    const baseWidth = size * 0.8;
    const height1 = size * 0.6;
    const height2 = size * 0.45;
    const overlap = size * 0.2;
    const offsetX = x + (w - baseWidth) / 2;
    const offsetY = y + (h - (height1 + height2)) / 2 + size * 0.12;
    const totalHeight = height1 + height2 - overlap;
    const borderOffset = 0.04 * size;

    function tri(A, B, C, color) {
        positions.push(A[0], A[1], B[0], B[1], C[0], C[1]);
        colors.push(...color, ...color, ...color);
    }

    function rect(x0, y0, x1, y1, color) {
        positions.push(x0, y0, x1, y0, x0, y1,
                       x1, y0, x1, y1, x0, y1);
        colors.push(...new Array(6).fill(color).flat());
    }

    // Fondo blanco detrás
    rect(
        offsetX - borderOffset,
        offsetY - borderOffset * 2,
        offsetX + baseWidth + borderOffset * 3.5,
        offsetY + totalHeight + borderOffset,
        white
    );

    // Bordes azules (ligeramente más grandes)
    const tri1Blue = [
        [offsetX - borderOffset, offsetY + height1 + height2 - overlap + borderOffset],
        [offsetX + baseWidth + borderOffset * 3.3, offsetY + height1 + height2 - overlap + borderOffset],
        [offsetX - borderOffset, offsetY + height2 - overlap - borderOffset * 2]
    ];

    const tri2Blue = [
        [offsetX - borderOffset, offsetY + height2 + borderOffset],
        [offsetX + baseWidth + borderOffset * 3.5, offsetY + height2 + borderOffset],
        [offsetX - borderOffset, offsetY - borderOffset * 2]
    ];

    tri(tri1Blue[0], tri1Blue[1], tri1Blue[2], blue);
    tri(tri2Blue[0], tri2Blue[1], tri2Blue[2], blue);

    // Triángulos rojos principales
    const tri1 = [
        [offsetX, offsetY + height1 + height2 - overlap],
        [offsetX + baseWidth, offsetY + height1 + height2 - overlap],
        [offsetX, offsetY + height2 - overlap]
    ];

    const tri2 = [
        [offsetX, offsetY + height2],
        [offsetX + baseWidth, offsetY + height2],
        [offsetX, offsetY]
    ];

    tri(tri1[0], tri1[1], tri1[2], red);
    tri(tri2[0], tri2[1], tri2[2], red);

    // ☀️ Sol blanco (idéntico formato al de Jordania)
    const cx = x + w * 0.37;  
    const cy = y + h * 0.73;  
    const R = h * 0.15;       
    const r = R * 0.6;        
    const rotation = -Math.PI / 2;
    const spikes = 12;
    const step = 2 * Math.PI / spikes;

    const outer = [], inner = [];
    for (let i = 0; i < spikes; i++) {
        const aOut = rotation + i * step;
        const aIn = rotation + i * step + step / 2;
        outer.push([cx + R * Math.cos(aOut), cy + R * Math.sin(aOut)]);
        inner.push([cx + r * Math.cos(aIn), cy + r * Math.sin(aIn)]);
    }

    for (let i = 0; i < spikes; i++) {
        const prev = (i + spikes - 1) % spikes;
        tri(outer[i], inner[i], inner[prev], white);
    }
    for (let i = 1; i < spikes - 1; i++) {
        tri(inner[0], inner[i], inner[i + 1], white);
    }



    // 🌙 Media luna blanca mirando hacia arriba
    const cx3 = x + w * 0.36;  // alineada con el sol
    const cy3 = y + h * 0.40;  // centrada en el triángulo superior
    const outerR = h * 0.12;   // radio exterior
    const innerR = h * 0.12;  // radio interior (más pequeño)
    const offset = h * 0.04;  // desplazamiento hacia arriba
    const segments = 80;       // suavidad

    // Círculo exterior blanco
    for (let i = 0; i < segments; i++) {
        const a1 = (i / segments) * 2 * Math.PI;
        const a2 = ((i + 1) / segments) * 2 * Math.PI;
        const p1 = [cx3 + outerR * Math.cos(a1), cy3 + outerR * Math.sin(a1)];
        const p2 = [cx3 + outerR * Math.cos(a2), cy3 + outerR * Math.sin(a2)];
        tri([cx3, cy3], p1, p2, white);
    }

    // Círculo interior rojo (recorte desplazado hacia arriba)
    for (let i = 0; i < segments; i++) {
        const a1 = (i / segments) * 2 * Math.PI;
        const a2 = ((i + 1) / segments) * 2 * Math.PI;
        const p1 = [cx3 + innerR * Math.cos(a1), cy3 - offset + innerR * Math.sin(a1)];
        const p2 = [cx3 + innerR * Math.cos(a2), cy3 - offset + innerR * Math.sin(a2)];
        tri([cx3, cy3 - offset], p1, p2, red);
    }

    // 🌙 Estrella blanca en el triángulo superior
    const cx2 = x + w * 0.36;  // mismo eje X que el sol
    const cy2 = y + h * 0.434;  // más arriba
    const R2 = h * 0.09;       // más pequeña
    const r2 = R2 * 0.7;       
    const rotation2 = -Math.PI / 2;
    const spikes2 = 16;
    const step2 = 2 * Math.PI / spikes2;

    const outer2 = [], inner2 = [];
    for (let i = 0; i < spikes2; i++) {
        const aOut = rotation2 + i * step2;
        const aIn = rotation2 + i * step2 + step2 / 2;
        outer2.push([cx2 + R2 * Math.cos(aOut), cy2 + R2 * Math.sin(aOut)]);
        inner2.push([cx2 + r2 * Math.cos(aIn), cy2 + r2 * Math.sin(aIn)]);
    }

    // Triángulos de las puntas
    for (let i = 0; i < spikes2; i++) {
        const prev = (i + spikes2 - 1) % spikes2;
        tri(outer2[i], inner2[i], inner2[prev], white);
    }
    // Relleno central
    for (let i = 1; i < spikes2 - 1; i++) {
        tri(inner2[0], inner2[i], inner2[i + 1], white);
    }
    return { positions, colors };
}