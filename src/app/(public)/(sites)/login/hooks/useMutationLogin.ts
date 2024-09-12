"use client";
import { CookieInterface } from "@/apis/cookies/utils/setCookie";
import { LOCALE_STORAGE_KEYS } from "@/helpers/common.constant";
import { LoginReq } from "@/services/music";
import musicService from "@/services/music/musicService";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const useMutationLogin = () => {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next");
  const initialValues = useMemo(() => {
    const cacheValue = localStorage.getItem(LOCALE_STORAGE_KEYS.SAVE_ACCOUNT_INFO);
    if (!cacheValue) return;
    try {
      const cacheObject = JSON.parse(atob(cacheValue));
      return {
        ...cacheObject,
        isSave: true,
      };
    } catch {
      return null;
    }
  }, []);

  return {
    ...useMutation<any, any, LoginReq>({
      mutationFn: async (values: LoginReq) => {
        const response = await musicService.login(values);
        const accessToken = response?.data?.access_token;
        const refreshToken = response?.data?.refresh_token;
        const cookies: CookieInterface[] = [
          {
            name: "access_token",
            value: accessToken,
            expire: moment().add(1, "day").toDate(),
          },
        ];
        Cookies.set("access_token", accessToken, { expires: moment()?.add(1, "day")?.toDate() });
        if (values.isSave) {
          localStorage.setItem(
            LOCALE_STORAGE_KEYS.SAVE_ACCOUNT_INFO,
            btoa(
              JSON.stringify({
                email: values.email,
                password: values.password,
              })
            )
          );
          // cookies.push({
          //   name: "refresh_token",
          //   value: refreshToken.token,
          //   expire: moment(refreshToken.expires).toDate(),
          // });
          Cookies.set("refresh_token", refreshToken, { expires: moment()?.add(2, "day")?.toDate() });
        } else {
          localStorage.removeItem(LOCALE_STORAGE_KEYS.SAVE_ACCOUNT_INFO);
        }

        // console.log("cookies", cookies);
        router.push(next || "/dashboard");
        return response;
      },
    }),
    initialValues,
  };
};

export default useMutationLogin;
