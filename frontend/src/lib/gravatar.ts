import md5 from 'crypto-js/md5'

export enum GravatarDefaultType {
    Identicon = 'identicon',
    MysteryPerson = 'mp',
}

export function getGravatarUrl(str: string, defaultSubstitute = GravatarDefaultType.MysteryPerson, size = 64) {
    console.log(str)
    // Normalize the email address
    const normalizedStr = str.trim().toLowerCase()

    // Generate the MD5 hash of the normalized email
    const hash = md5(normalizedStr)

    // Construct the Gravatar URL with the desired size (default 64px)
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultSubstitute}`

    return gravatarUrl
}
