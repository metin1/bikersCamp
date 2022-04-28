import dayjs from 'dayjs'
export const date = (d: string): string => {
	return dayjs(d).format('DD.MM.YYYY')
}

export const releaseDate = (d: string): string => {
	return dayjs(d).format('DD MMM, YYYY')
}

export const releaseYear = (d: string): string => {
	return dayjs(d).format('YYYY')
}

export const convertMinsToHrsMins = (minutes: number): string => {
	const h = Math.floor(minutes / 60)
	const m = minutes % 60
	const calcM = m < 10 ? '0' + m : m
	return `${h}h ${calcM}m`
}
