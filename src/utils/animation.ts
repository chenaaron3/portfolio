export function calcOffset(start: number, end: number, total: number, index: number) {
    const margin = (end - start) / total
    return {
        offset: start + margin * index,
        nextOffset: start + margin * (index + 1), 
        margin: margin,
    }
}