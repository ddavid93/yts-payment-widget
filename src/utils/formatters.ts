/**
 * Format date in short format (DD.MM.YYYY)
 * @param date - Date to format (can be Date object or string)
 * @returns Formatted date string
 */
export const formatDateShort = (date: Date | string | undefined): string => {
    if (!date) return ''

    const dateObj = date instanceof Date ? date : new Date(date)

    if (isNaN(dateObj.getTime())) return ''

    return dateObj.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

/**
 * Format date in long format (DD. Month YYYY)
 * @param date - Date to format (can be Date object or string)
 * @returns Formatted date string
 */
export const formatDateLong = (date: Date | string | undefined): string => {
    if (!date) return ''

    const dateObj = date instanceof Date ? date : new Date(date)

    if (isNaN(dateObj.getTime())) return ''

    return dateObj.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
}
