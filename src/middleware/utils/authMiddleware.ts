import { API_USER } from "@/configs/env.config";
import { AUTH_ROUTES } from "@/middleware";
import { ParamsUtil } from "../interface/paramsUtils.types";
import { ReturnedUtil } from "../interface/returnedUtils.types";

const USER_PROFILE = API_USER + "/users/profile";
const REFRESH_TOKEN = API_USER + "/auth/refresh-token";

export default async function authMiddleware({ nextUrl, cookies }: ParamsUtil): Promise<ReturnedUtil> {
  const { pathname, search } = nextUrl;
  const isAuthRoute = pathname === "/" || AUTH_ROUTES.some((route) => pathname === route);
  const searchParams = new URLSearchParams(search);
  const searchMap = new Map(searchParams.entries());

  const accessToken = cookies.get("access_token");
  const refreshToken = cookies.get("refresh_token");

  if (!accessToken?.value && !refreshToken?.value) {
    if (isAuthRoute) {
      return {
        action: "next",
      };
    }
    return {
      action: "redirect",
      path: "/login?session=1&next=" + pathname,
    };
  }

  let actions: { action: ReturnedUtil["action"]; path: string } = {
    action: "next",
    path: pathname,
  };

  if (isAuthRoute) {
    let nextPath = searchMap.get("next") || "/dashboard";
    const isNextPathAuthRoute = AUTH_ROUTES.some((route) => pathname === nextPath);
    if (isNextPathAuthRoute) {
      nextPath = "/dashboard";
    }
    actions = {
      action: "redirect",
      path: nextPath,
    };
  }
  return {
    action: actions.action,
    path: actions.path,
  };
}
