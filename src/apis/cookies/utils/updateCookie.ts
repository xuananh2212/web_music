import dateToTime from "@/helpers/date";
import fetcher from "@/helpers/fetcher";

export interface CookieInterface {
  name: string;
  value?: any;
  expire?: number | string;
}

export default async function updateCookies(cookie: CookieInterface) {
  if (typeof cookie.expire === "string") {
    cookie.expire = dateToTime(cookie.expire);
  }
  const res = await fetcher("/mock/cookie", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cookie),
  });

  return res;
}
