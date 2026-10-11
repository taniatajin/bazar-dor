export function safeNext(value?: string): string {
  if (value && value.startsWith("/") && !value.startsWith("//")) return value;
  return "/";
}