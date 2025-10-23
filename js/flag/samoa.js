export const samoa = (x, y, w, h) => {
    const red = [0.84, 0.09, 0.09];
    const blue = [0.0, 0.2, 0.6];
    const white = [1, 1, 1];

    const cantonW = w * 0.48;
    const cantonH = h * 0.5;
    const cantonX = x;
    const cantonY = y;

    function starTriangles(cx, cy, outerR, innerR, points = 5) {
        const pts = [];
        for (let i = 0; i < points * 2; i++) {
            const angle = -Math.PI / 2 + (i * Math.PI) / points;
            const r = (i % 2 === 0) ? outerR : innerR;
            pts.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
        }
        const tris = [];
        for (let i = 0; i < pts.length; i++) {
            const p1 = pts[i];
            const p2 = pts[(i + 1) % pts.length];
            tris.push(cx, cy, p1[0], p1[1], p2[0], p2[1]);
        }
        return tris;
    }

    const positions = [];
    const colors = [];

    positions.push(
        x, y, x + w, y, x, y + h,
        x + w, y, x + w, y + h, x, y + h
    );
    colors.push(...new Array(6).fill(red).flat());

    positions.push(
        cantonX, cantonY, cantonX + cantonW, cantonY, cantonX, cantonY + cantonH,
        cantonX + cantonW, cantonY, cantonX + cantonW, cantonY + cantonH, cantonX, cantonY + cantonH
    );
    colors.push(...new Array(6).fill(blue).flat());

    const starScale = Math.min(w, h) * 0.05;
    const starCenters = [
        [cantonX + cantonW * 0.72, cantonY + cantonH * 0.18, starScale * 1.15],
        [cantonX + cantonW * 0.88, cantonY + cantonH * 0.42, starScale * 0.85],
        [cantonX + cantonW * 0.60, cantonY + cantonH * 0.42, starScale * 0.85],
        [cantonX + cantonW * 0.72, cantonY + cantonH * 0.62, starScale * 0.85],
        [cantonX + cantonW * 0.78, cantonY + cantonH * 0.78, starScale * 0.85]
    ];

    starCenters.forEach(([cx, cy, outer]) => {
        const inner = outer * 0.45;
        const triVerts = starTriangles(cx, cy, outer, inner, 5);
        positions.push(...triVerts);
        const numVertices = triVerts.length / 2;
        for (let i = 0; i < numVertices; i++) {
            colors.push(...white);
        }
    });

    return { positions, colors };
};
