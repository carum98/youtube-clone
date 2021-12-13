// Convert string PT27M29S to 27:29 format (hh:mm) or PT27M29S to 27:29:29 format (hh:mm:ss)
export function convertStringToTime(time: string): string {
    const base = time.split('T')[1].split('M')

    if (base.length === 1) {
        return `00:${addZero(base[0].slice(0, -1))}`
    } else {
        return `${addZero(base[0])}:${addZero(base[1].slice(0, -1))}`
    }
}

function addZero(num: string): string {
    if (num.length === 1) {
        return `0${num}`
    } else {
        return `${num}`
    }
}
