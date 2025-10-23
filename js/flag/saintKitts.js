export const saintKitts = (x, y, w, h) => { // **************************le falta corregir las proporciones
    const green = [0.0, 0.6, 0.2];
    const red = [0.8, 0.1, 0.1];
    const black = [0, 0, 0];
    const yellow = [1, 0.8, 0];
    const white = [1, 1, 1];

    const A = { x: x, y: y + h };
    const B = { x: x + w, y: y };

    const dx = B.x - A.x;
    const dy = B.y - A.y;
    const len = Math.hypot(dx, dy);
    const px = (h) / len;
    const py = (w) / len;

    const bandHalf = Math.min(w, h) * 0.12;
    const fimbriation = bandHalf * 0.28;
    const outerHalf = bandHalf + fimbriation;

    function quadAsTriangles(p1, p2, p3, p4) {
        return [
            p1[0], p1[1], p2[0], p2[1], p3[0], p3[1],
            p1[0], p1[1], p3[0], p3[1], p4[0], p4[1]
        ];
    }

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
        x, y, x + w, y, x, y + h
    );
    colors.push(...new Array(3).fill(green).flat());

    positions.push(
        x + w, y, x + w, y + h, x, y + h
    );
    colors.push(...new Array(3).fill(red).flat());

    const A_out_pos = [A.x + px * outerHalf, A.y + py * outerHalf];
    const A_out_neg = [A.x - px * outerHalf, A.y - py * outerHalf];
    const B_out_pos = [B.x + px * outerHalf, B.y + py * outerHalf];
    const B_out_neg = [B.x - px * outerHalf, B.y - py * outerHalf];

    positions.push(...quadAsTriangles(A_out_pos, B_out_pos, B_out_neg, A_out_neg));
    colors.push(...new Array(6).fill(yellow).flat());

    const A_in_pos = [A.x + px * bandHalf, A.y + py * bandHalf];
    const A_in_neg = [A.x - px * bandHalf, A.y - py * bandHalf];
    const B_in_pos = [B.x + px * bandHalf, B.y + py * bandHalf];
    const B_in_neg = [B.x - px * bandHalf, B.y - py * bandHalf];

    positions.push(...quadAsTriangles(A_in_pos, B_in_pos, B_in_neg, A_in_neg));
    colors.push(...new Array(6).fill(black).flat());

    const t1 = 0.32;
    const t2 = 0.68;
    const center1 = { x: A.x + dx * t1, y: A.y + dy * t1 };
    const center2 = { x: A.x + dx * t2, y: A.y + dy * t2 };

    const starOuter = Math.min(w, h) * 0.06;
    const starInner = starOuter * 0.45;

    const star1 = starTriangles(center1.x, center1.y, starOuter, starInner, 5);
    const star2 = starTriangles(center2.x, center2.y, starOuter, starInner, 5);

    positions.push(...star1);
    for (let i = 0; i < star1.length / 2; i++) colors.push(...white);

    positions.push(...star2);
    for (let i = 0; i < star2.length / 2; i++) colors.push(...white);

    return { positions, colors };
};
