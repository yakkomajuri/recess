export function timeAgo(date: string | Date) {
  const now = new Date();
  const givenDate = new Date(date);
  const secondsAgo = Math.round((now.getTime() - givenDate.getTime()) / 1000);
  const minutesAgo = Math.round(secondsAgo / 60);
  const hoursAgo = Math.round(minutesAgo / 60);
  const daysAgo = Math.round(hoursAgo / 24);

  // Within the hour
  if (minutesAgo < 60) {
    return `${minutesAgo} minutes ago`;
  }

  // Within the day
  if (hoursAgo < 24) {
    return `${hoursAgo} hours ago`;
  }

  // Yesterday
  if (daysAgo === 1) {
    return "yesterday";
  }

  // Within a week
  if (daysAgo < 7) {
    return `${daysAgo} days ago`;
  }

  // Otherwise, return the date in dd/mm/yyyy format
  const day = givenDate.getDate().toString().padStart(2, "0");
  const month = (givenDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = givenDate.getFullYear();
  return `${day}/${month}/${year}`;
}
