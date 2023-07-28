import { cookies } from 'next/headers'

export const getAllCookies = (): string => {
  const cookieStore = cookies();
  const cookie = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join(";");
  return cookie;
};

export const httpHeaderForServerComponent = () => {
  const cookies = getAllCookies();
  return {
      "Content-Type": "application/json",
      Cookie: cookies,
      Origin: process.env.ORIGIN_HEADER,
      Referer: process.env.ORIGIN_HEADER
  }
}