export function showThisDate(day: number) {
  const today = new Date();
  if (today > new Date('2022-12-25')) {
    return true;
  }
  return today.getDate() >= day;
}
