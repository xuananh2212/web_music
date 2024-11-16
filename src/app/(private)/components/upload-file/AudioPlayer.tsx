import Hls from "hls.js";
import { useEffect, useRef } from "react";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (Hls.isSupported() && audioRef.current) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(audioRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // audioRef.current?.play();
      });

      // Cleanup
      return () => {
        hls.destroy();
      };
    } else if (audioRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      // Fallback for Safari
      audioRef.current.src = src;
      audioRef.current.addEventListener("loadedmetadata", () => {
        // audioRef.current?.play();
      });
    }
  }, [src]);

  return <audio ref={audioRef} controls />;
};

export default AudioPlayer;
