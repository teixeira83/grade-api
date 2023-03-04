export function getFirstPartOfADate(date: Date): string {
  return date.toISOString().split('T')[0]
}
