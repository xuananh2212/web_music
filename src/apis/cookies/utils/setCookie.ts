import fetcher from "@/helpers/fetcher";
import { slug } from "@/helpers/string";

export interface CookieInterface {
  name: string;
  value: any;
  expire: Date;
}

export default function setCookies(cookieOrCookies: CookieInterface | CookieInterface[]) {
  const cookies = Array.isArray(cookieOrCookies) ? cookieOrCookies : [cookieOrCookies];
  const cookiesData = cookies.map(({ name, value, expire }) => ({
    name: slug(name),
    value,
    expire,
  }));
  return fetcher("/mock/cookie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cookies: cookiesData,
    }),
  });
}
