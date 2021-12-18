export function convertStringToTime(time: string): string {
    const base = time.split('T')[1].split('M')

    if (base.length === 1) {
        return `00:${addZero(base[0].slice(0, -1))}`
    } else {
        return `${addZero(base[0])}:${addZero(base[1].slice(0, -1))}`
    }
}

export function convertNumberToString(numString: string): string {
    const num = Number(numString)

    if (num < 1000) {
        return num.toString()
    } else if (num < 1000000) {
        return `${(num / 1000).toFixed(0)}K`
    } else {
        return `${(num / 1000000).toFixed(0)}M`
    }
}

const DATE_UNITS = {
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1, // un segundo tiene... un segundo :D
}

export function convertDateToString(date: string): string {
    const dateObj = new Date(date)
    const diff = new Date().getTime() - dateObj.getTime()

    return diff.toString()
}

const units = {
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
}

const getSecondsDiff = (timestamp: number) => (Date.now() - timestamp) / 1000

const getUnitAndValueDate = (secondsElapsed: number) => {
    for (const [unit, secondsInUnit] of Object.entries(units)) {
        if (secondsElapsed >= secondsInUnit || unit === 'second') {
            const value = Math.floor(secondsElapsed / secondsInUnit) * -1
            return { value, unit }
        }
    }
}

export const getTimeAgo = (timestamp: string) => {
    const rtf = new Intl.RelativeTimeFormat()

    const secondsElapsed = getSecondsDiff(Date.parse(timestamp))
    const { value, unit } = getUnitAndValueDate(secondsElapsed) ?? {}

    return rtf.format(value || 0, unit as keyof typeof DATE_UNITS)
}

function addZero(num: string): string {
    if (num.length === 1) {
        return `0${num}`
    } else {
        return `${num}`
    }
}
