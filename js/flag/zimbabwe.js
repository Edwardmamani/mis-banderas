// Ave de Zimbabwe 
const svgData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="2200 4200 2500 3500">
        <g fill="none" stroke="#000" stroke-linejoin="round" stroke-linecap="round" stroke-width="38">
            <path fill="#ffd200" d="M2290 4580c-18-45-15-95 8-138 23-42 65-72 113-80 51-9 102-12 154-11 49-76 131-125 221-132 90-6 178 30 238 98 71 81 113 183 122 290l37 464 1412 1105a86 86 0 0 1-76 150l-59-17c-227 141-395 387-428 651l-85 672H2454l-198-769c-71-86-81-207-25-303 73-125 161-241 262-345 66-66 96-160 83-253-14-92-21-185-22-278-1-77 16-154 49-223l-19-694c-3-82-48-157-119-197z"/>
            <path d="m2465 4570 167-10m-29 901 580-390m232 1167c229 64 372 45 439-101m-852-566c-62 179 50 338 200 381l1258 357m-2040 631c-47-184 21-513 312-650 135-63 179-201 180-318 0-44 1-95 64-120m-720 1011 44-107c21 79 64 137 120 184 31-65 58-131 81-198 26 52 47 123 65 194-4-161 81-279 193-329l434-193c141-63 276-188 307-378m742 460H3008m-727 464h1751m-1346 381h1297m-1428-381 131 381v291m-63-509 128-128 128 128 128-128 128 128 128-128 128 128 128-128 128 128 128-128 128 128 124-124m-1366 269 90-90 128 128 128-128 128 128 128-128 128 128 128-128 128 128 128-128 128 128 97-97"/>
            <circle r="76" cx="2799" cy="4459"/>
            <circle r="145" cx="3139" cy="6730"/>
            <circle r="145" cx="3714" cy="6730"/>
        </g>
        </svg>`;

const img = new Image();
img.src = 'data:image/svg+xml;base64,' + btoa(svgData);

export function zimbabwe(x, y, w, h) {
    const h7 = h / 7;
    const positions = [];
    const colors = [];

    // Colores
    const green = [0, 0.4, 0];           // Verde #006400
    const yellow = [1, 0.84, 0];         // Amarillo #ffd200
    const red = [0.831, 0, 0];           // Rojo #d40000
    const black = [0, 0, 0];             // Negro
    const white = [1, 1, 1];             // Blanco

    // CAPA 1: 7 Franjas horizontales (fondo)
    // Franja verde (1)
    positions.push(x, y, x + w, y, x, y + h7, x + w, y, x + w, y + h7, x, y + h7);
    colors.push(...Array(6).fill(green).flat());

    // Franja amarilla (2)
    positions.push(x, y + h7, x + w, y + h7, x, y + h7 * 2, x + w, y + h7, x + w, y + h7 * 2, x, y + h7 * 2);
    colors.push(...Array(6).fill(yellow).flat());

    // Franja roja (3)
    positions.push(x, y + h7 * 2, x + w, y + h7 * 2, x, y + h7 * 3, x + w, y + h7 * 2, x + w, y + h7 * 3, x, y + h7 * 3);
    colors.push(...Array(6).fill(red).flat());

    // Franja negra (4) - central
    positions.push(x, y + h7 * 3, x + w, y + h7 * 3, x, y + h7 * 4, x + w, y + h7 * 3, x + w, y + h7 * 4, x, y + h7 * 4);
    colors.push(...Array(6).fill(black).flat());

    // Franja roja (5)
    positions.push(x, y + h7 * 4, x + w, y + h7 * 4, x, y + h7 * 5, x + w, y + h7 * 4, x + w, y + h7 * 5, x, y + h7 * 5);
    colors.push(...Array(6).fill(red).flat());

    // Franja amarilla (6)
    positions.push(x, y + h7 * 5, x + w, y + h7 * 5, x, y + h7 * 6, x + w, y + h7 * 5, x + w, y + h7 * 6, x, y + h7 * 6);
    colors.push(...Array(6).fill(yellow).flat());

    // Franja verde (7)
    positions.push(x, y + h7 * 6, x + w, y + h7 * 6, x, y + h, x + w, y + h7 * 6, x + w, y + h, x, y + h);
    colors.push(...Array(6).fill(green).flat());

    // CAPA 2: Triángulo negro (borde del triángulo blanco)
    const triangleWidth = w * (8400 / 25200); // ~33.3% del ancho
    positions.push(
        x, y - (triangleWidth * 0.07),
        x + triangleWidth, y + h / 2,
        x, y + h + (triangleWidth * 0.07)
    );
    colors.push(...black, ...black, ...black);

    // CAPA 3: Triángulo blanco (interior)
    const whiteTriangleWidth = triangleWidth * 0.93; // Ligeramente más pequeño para mostrar borde negro
    positions.push(
        x, y,
        x + whiteTriangleWidth, y + h / 2,
        x, y + h
    );
    colors.push(...white, ...white, ...white);

    // CAPA 4: Estrella roja de 5 puntas (como en Vietnam)
    const cx = x + triangleWidth * 0.38; // Centro de la estrella
    const cy = y + h / 2;
    const r1 = h * 0.2; // Radio externo de la estrella
    const r2 = r1 * 0.382; // Radio interno

    // Dibujar estrella de 5 puntas (mismo patrón que Vietnam)
    for (let i = 0; i < 5; i++) {
        const a1 = Math.PI / 2 + (i * 2 * Math.PI) / 5; // Ángulo de punta externa
        const a2 = a1 + Math.PI / 5; // Ángulo de punta interna

        positions.push(
            cx, cy,
            cx + r1 * Math.cos(a1), cy - r1 * Math.sin(a1), // Punta externa
            cx + r2 * Math.cos(a2), cy - r2 * Math.sin(a2)  // Punta interna
        );
        colors.push(...red, ...red, ...red);
    }

    for (let i = 0; i < 5; i++) {
        const b1 = Math.PI / 2 + (i * 2 * Math.PI) / 5;
        const b2 = b1 - Math.PI / 5;

        positions.push(
            cx, cy,
            cx + r1 * Math.cos(b1), cy - r1 * Math.sin(b1), // Punta externa
            cx + r2 * Math.cos(b2), cy - r2 * Math.sin(b2)  // Punta interna
        );
        colors.push(...red, ...red, ...red);
    }

    return { positions, colors };
};

zimbabwe.overlay = (ctx, x, y, w, h) => {
    const drawIt = () => {
        // Posicionar el ave de Zimbabwe en el triángulo blanco
        const triangleWidth = w * (8400 / 25200);
        const birdWidth = triangleWidth * 0.27;
        const birdHeight = birdWidth * (3400 / 2100); // Proporción del viewBox del ave (3400/2100)
        const birdX = x + triangleWidth * 0.27;
        const birdY = y + h / 2 - birdHeight / 2;

        ctx.save();
        ctx.drawImage(img, birdX, birdY, birdWidth, birdHeight);
        ctx.restore();
    };
    if (img.complete && img.naturalWidth > 0) {
        drawIt();
    } else {
        img.onload = () => drawIt();
    }
};