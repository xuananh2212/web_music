import fetcher from "@/helpers/fetcher";
import { slug } from "@/helpers/string";

export default async function getCookie(name: "all" | string) {
  const res = await fetcher("/mock/cookie/" + slug(name));
  return res;
}
