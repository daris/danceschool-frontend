export function getAuthToken() {
  // SSR (Server Component / API route)
  try {
    const { cookies } = require("next/headers");
    const token = cookies().get("authToken")?.value;
    if (token) return token;
  } catch (_) {}

  // CSR (Browser)
  if (typeof window !== "undefined") {
    return document.cookie
      .split("; ")
      .find((c) => c.startsWith("authToken="))
      ?.split("=")[1];
  }

  return null;
}