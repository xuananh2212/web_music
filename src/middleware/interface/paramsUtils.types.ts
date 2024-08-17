export interface ParamsUtil {
  nextUrl: { pathname: string; search: string };
  cookies: {
    get: (key: string) => {
      name: string;
      value: string;
    };
  };
}
