import md5 from 'crypto-js/md5'

export enum GravatarDefaultType {
    Identicon = 'identicon',
    MysteryPerson = 'mp',
    Retro = 'retro'
}

export function getGravatarUrl(str: string, defaultSubstitute = GravatarDefaultType.MysteryPerson, size = 64) {
    const normalizedStr = str.trim().toLowerCase()
    const hash = md5(normalizedStr)
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultSubstitute}`

    return gravatarUrl
}
