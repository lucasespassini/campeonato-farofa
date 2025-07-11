export function parseCookie(cookie: string): Record<string, string | undefined> {
  return Object.fromEntries(
    cookie.split(";").map((part) => {
      const [key, ...v] = part.trim().split("=");
      return [key, decodeURIComponent(v.join("="))];
    }),
  );
}
