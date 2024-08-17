import deleteCookie from "./utils/deleteCookie";
import getCookie from "./utils/getCookie";
import setCookies from "./utils/setCookie";
import updateCookies from "./utils/updateCookie";

interface CookieApis {
  get: typeof getCookie;
  set: typeof setCookies;
  upd: typeof updateCookies;
  del: typeof deleteCookie;
}

const cookie: CookieApis = {
  get: getCookie,
  set: setCookies,
  upd: updateCookies,
  del: deleteCookie,
};

export default cookie;
