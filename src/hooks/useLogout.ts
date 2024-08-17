import cookie from "@/apis/cookies";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();
  return async () => {
    await Promise.all([cookie.del("access_token"), cookie.del("refresh_token")]);
    router.push("/");
  };
};

export default useLogout;
