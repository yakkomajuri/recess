import md5 from "crypto-js/md5";

export enum GravatarDefaultType {
  Identicon = "identicon",
  MysteryPerson = "mp",
}

export function getGravatarUrl(
  email: string,
  defaultSubstitute = GravatarDefaultType.MysteryPerson,
  size = 64
) {
  // Normalize the email address
  const normalizedEmail = email.trim().toLowerCase();

  // Generate the MD5 hash of the normalized email
  const hash = md5(normalizedEmail);

  // Construct the Gravatar URL with the desired size (default 64px)
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultSubstitute}`;

  return gravatarUrl;
}
