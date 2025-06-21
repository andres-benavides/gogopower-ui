export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString("en-GB", {
    timeZone: "UTC",
    dateStyle: "short",
    timeStyle: "medium",
  });
}
