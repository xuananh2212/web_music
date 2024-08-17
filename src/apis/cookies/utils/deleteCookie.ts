import fetcher from "@/helpers/fetcher";
import { slug } from "@/helpers/string";

export default async function deleteCookie(name: "all" | string) {
  const res = await fetcher("/mock/cookie/" + slug(name), {
    method: "DELETE",
  });
  return res;
}
