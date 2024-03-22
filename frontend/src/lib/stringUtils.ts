export const trimString = (str: string, maxSize = 50) => {
    if (str.length > maxSize) {
        return str.substring(0, maxSize - 3) + '...'
    }
    return str
}
