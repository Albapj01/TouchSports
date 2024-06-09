export const storage = {
  clear() {
    localStorage.clear();
  },
  get(key: string) {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

export default function decodeJwt(token: string) {
  if (!token) {
    storage.set("token", "TOKEN");
  }
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }
  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));
  return { header, payload };
}
