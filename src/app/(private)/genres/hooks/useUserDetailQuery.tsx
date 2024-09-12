import MUSIC_QUERY_KEY_ENUM from "@/services/music/keys";
import musicService from "@/services/music/musicService";
import { useQuery } from "@tanstack/react-query";

const useUserDetailQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: [MUSIC_QUERY_KEY_ENUM.USER_DETAIL, id],
    queryFn: () => musicService.getUserDetail(id as string),
    enabled: id !== undefined,
    staleTime: 0,
  });
};

export default useUserDetailQuery;
