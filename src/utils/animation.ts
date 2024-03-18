export function calcOffset(start: number, end: number, total: number, index: number) {
    return start + (end - start) / total * index
}