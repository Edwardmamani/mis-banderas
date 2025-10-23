export function centralAfricanRepublic(x, y, w, h) {
    const h4 = h / 4;
    const w5 = w / 5;

    return {
        positions: [
            x, y, x + w, y, x, y + h4,
            x + w, y, x + w, y + h4, x, y + h4,

            x, y + h4, x + w, y + h4, x, y + h4 * 2,
            x + w, y + h4, x + w, y + h4 * 2, x, y + h4 * 2,

            x, y + h4 * 2, x + w, y + h4 * 2, x, y + h4 * 3,
            x + w, y + h4 * 2, x + w, y + h4 * 3, x, y + h4 * 3,

            x, y + h4 * 3, x + w, y + h4 * 3, x, y + h,
            x + w, y + h4 * 3, x + w, y + h, x, y + h,

            x + w * 0.4, y, x + w * 0.6, y, x + w * 0.4, y + h,
            x + w * 0.6, y, x + w * 0.6, y + h, x + w * 0.4, y + h,

            x + w * 0.12, y + h4 * 0.2, x + w * 0.15, y + h4 * 0.80, x + w * 0.09, y + h4 * 0.80,

            x + w * 0.12, y + h4 * 0.65, x + w * 0.15, y + h4 * 0.80, x + w * 0.09, y + h4 * 0.80,

            x + w * 0.07, y + h4 * 0.4, x + w * 0.17, y + h4 * 0.4, x + w * 0.12, y + h4 * 0.60
        ],
        colors: [
            ...new Array(6).fill([0.0, 0.188, 0.510]).flat(),
            ...new Array(6).fill([1.0, 1.0, 1.0]).flat(),
            ...new Array(6).fill([0.0, 0.592, 0.224]).flat(),
            ...new Array(6).fill([1.0, 0.843, 0.0]).flat(),
            ...new Array(6).fill([0.823, 0.063, 0.204]).flat(),
            ...new Array(3).fill([1.0, 0.843, 0.0]).flat(),
            ...new Array(3).fill([0.0, 0.188, 0.510]).flat(),
            ...new Array(3).fill([1.0, 0.843, 0.0]).flat()
        ]
    };
}