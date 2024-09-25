import MUSIC_QUERY_KEY_ENUM from "@/services/music/keys";
import musicService from "@/services/music/musicService";
import { useQuery } from "@tanstack/react-query";

const useAlbumDetailQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: [MUSIC_QUERY_KEY_ENUM.ALBUM_DETAIL, id],
    queryFn: () => musicService.getAlbumDetail(id as string),
    enabled: id !== undefined,
    staleTime: 0,
  });
};

export default useAlbumDetailQuery;
