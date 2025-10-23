export function santaLucia(x, y, w, h) {
    const cx = x + w / 2;
    const top = y + h * 0.15;
    const bottom = y + h * 0.90;
    return {
        positions: [
            x, y, x + w, y, x, y + h,
            x + w, y, x + w, y + h, x, y + h,

            cx, top, x + w * 0.25, bottom, x + w * 0.75, bottom,

            cx, y + h * 0.20, x + w * 0.30, bottom, x + w * 0.70, bottom,

            cx, y + h * 0.50, x + w * 0.25, bottom, x + w * 0.75, bottom
        ],
        colors: [
            ...new Array(6).fill([0.423, 0.812, 0.965]).flat(),
            ...new Array(3).fill([1, 1, 1]).flat(),
            ...new Array(3).fill([0, 0, 0]).flat(),
            ...new Array(3).fill([1, 0.843, 0]).flat()
        ]
    };
}