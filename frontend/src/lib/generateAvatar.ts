// gixi
class Color {
    r: number
    g: number
    b: number
    t: number

    constructor(seed: string) {
        const pseudoRandom = prng(seed)
        this.r = Math.floor(pseudoRandom() * 200)
        this.g = Math.floor(pseudoRandom() * 200)
        this.b = Math.floor(pseudoRandom() * 200)
        this.t = 1
    }

    rgba() {
        return `rgba(${this.r},${this.g},${this.b},${this.t})`
    }
}

// A simple seedable pseudo-random number generator
// Using a very basic implementation for demonstration; consider a more robust algorithm for complex needs
function prng(seed: string) {
    let seedHash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return function () {
        const x = Math.sin(seedHash++) * 10000
        return x - Math.floor(x)
    }
}

export function generateAvatar(seed: string = Math.random().toString()): string {
    const size = 60 // Total size of the SVG
    const padding = 10 // Padding around the content
    const effectiveSize = size - padding * 2 // Adjusted size for the content, accounting for padding
    const partitions = 3
    const baseSeed = 5
    const seedH = effectiveSize / baseSeed
    const seedW = effectiveSize / baseSeed
    const colorGenerator = new Color(seed)
    const fillColor = colorGenerator.rgba()

    let element = document.createElement('canvas')
    element.width = element.height = size // Set canvas size
    const drw = element.getContext('2d')
    if (!drw) throw new Error('Canvas does not supported')
    drw.fillStyle = fillColor

    const pseudoRandom = prng(seed)

    // Adjust the starting point based on the padding
    const startX = padding
    const startY = padding

    // Generate and draw the grid, adjusting for padding
    for (let y = 0; y < partitions; y++) {
        for (let x = 0; x < baseSeed; x++) {
            if (pseudoRandom() < 0.5) {
                drw.fillRect(startX + seedW * x, startY + seedH * y, seedW, seedH)
                if (y < partitions - 1) {
                    drw.fillRect(startX + seedW * x, startY + seedH * (partitions + 1 - y), seedW, seedH)
                }
            }
        }
    }

    return element.toDataURL()
}

// export function generateAvatar(feedUuid: string, feedName: string): string {
//     // Simple hash function to turn the string into a number
//     let hash = 0;
//     for (let i = 0; i < feedUuid.length; i++) {
//         hash = feedUuid.charCodeAt(i) + ((hash << 5) - hash);
//     }

//     // Convert the hash into an RGB color
//     const color = `hsl(${hash % 360}, 50%, 40%)`;

//     // Extract initials from the string
//     const initials = feedName
//         .split(' ')
//         .map(part => part[0])
//         .join('')
//         .toUpperCase();

//     // Return a data URL for an SVG that Antd's Avatar can use as src
//     // Note: Escaping necessary for quotes in SVG XML
//     return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="100%" height="100%" fill="${encodeURIComponent(
//         color
//     )}"/><text x="50%" y="50%" dy="0.35em" font-family="Arial" font-size="20" text-anchor="middle" fill="white">${initials}</text></svg>`;
// }
