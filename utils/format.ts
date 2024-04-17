export const formatPrice = (number?: any) => {
    if (number) {
        return Intl.NumberFormat('vi-VN').format(number)
    }
    return 0
}

export const calculateDaysBetween = (start: Date, end: Date) => {
    const diffInTime = end.getTime() - start.getTime()
    return Math.floor(diffInTime / (1000 * 60 * 60 * 24))
}

export const isSameDay = (date1: Date, date2: Date) => {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    )
}
