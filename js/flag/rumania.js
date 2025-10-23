export function rumania(x, y, w, h){
    const w3 = w / 3;
    return {
        positions: [
            x, y, x + w3, y, x, y + h,
            x + w3, y, x + w3, y + h, x, y + h,

            x + w3, y, x + w3 * 2, y, x + w3, y + h,
            x + w3 * 2, y, x + w3 * 2, y + h, x + w3, y + h,

            x + w3 * 2, y, x + w, y, x + w3 * 2, y + h,
            x + w, y, x + w, y + h, x + w3 * 2, y + h
        ],
        colors: [
            ...new Array(6).fill([0, 0.168, 0.498]).flat(),
            ...new Array(6).fill([0.988, 0.820, 0.086]).flat(),
            ...new Array(6).fill([0.808, 0.067, 0.149]).flat()
        ]
    };
}