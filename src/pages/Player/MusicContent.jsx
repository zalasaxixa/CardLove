import { createContext, useContext, useEffect, useRef, useState } from "react";
import Multomp3 from "../../assets/Multo.mp3";
import Multoimg from "../../assets/multo.jpeg";
import aboutYou from "../../assets/aboutYou.mp3";
import Exileimg from "../../assets/exile.jpg";
import Exile from "../../assets/Exile.mp3";
import aboutYouImg from "../../assets/aboutyou.jpg";
import Mangu from "../../assets/mangu.jpg";
import Mangump3 from "../../assets/Mangu.mp3";
import NantiKitaSepertiIni from "../../assets/nantiKitaSepertiIni.jpg";
import NantiKitaSepertiIniMp3 from "../../assets/NantiKitaSepertiIni.mp3";
import DarkDream from "../../assets/dark-dream.jpg";
import DarkDreammp3 from "../../assets/DarkDream.mp3";

const MusicContext = createContext();

const tracks = [
  {
    title: "aboutYou",
    image: `${aboutYouImg}`,
    src: `${aboutYou}`,
  },
  {
    title: "Exile",
    image: `${Exileimg}`,
    src: `${Exile}`,
  },
  {
    title: "Multo",
    image: `${Multoimg}`,
    src: `${Multomp3}`,
  },
  {
    title: "Mangu",
    image: `${Mangu}`,
    src: `${Mangump3}`,
  },
  {
    title: "Nanti Kita Seperti Ini",
    image: `${NantiKitaSepertiIni}`,
    src: `${NantiKitaSepertiIniMp3}`,
  },
  {
    title: "Dark Dream",
    image: `${DarkDream}`,
    src: `${DarkDreammp3}`,
  },
];

export function MusicProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState("off");

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentIndex].src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const nextTrack = () => {
    if (repeatMode === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      setCurrentIndex((prev) => (prev + 1) % tracks.length);
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    setCurrentIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const toggleRepeat = () => {
    if (repeatMode === "off") setRepeatMode("all");
    else if (repeatMode === "all") setRepeatMode("one");
    else setRepeatMode("off");
  };

  const handleEnded = () => {
    if (repeatMode === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (repeatMode === "all") {
      nextTrack();
    } else {
      if (currentIndex < tracks.length - 1) nextTrack();
      else setIsPlaying(false);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        play,
        pause,
        nextTrack,
        prevTrack,
        currentIndex,
        tracks,
        repeatMode,
        toggleRepeat,
      }}
    >
      <audio ref={audioRef} onEnded={handleEnded}></audio>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}

// cara ke dua

// import { createContext, useContext, useEffect, useRef, useState } from "react";

// const AudioCtx = createContext(null);
// export const useAudio = () => useContext(AudioCtx);

// export default function AudioProvider({ children }) {
//   const audioRef = useRef(null);
//   const [queue, setQueue] = useState([
//     { id: 1, title: "Lo-Fi Beats", artist: "Various", url: "/audio/lofi.mp3", cover: "/covers/lofi.jpg" },
//     { id: 2, title: "Chillhop", artist: "DJ Chill", url: "/audio/chillhop.mp3", cover: "/covers/chillhop.jpg" },
//   ]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(0.8);

//   const currentTrack = queue[currentIndex];

//   useEffect(() => {
//     if (!audioRef.current) return;
//     audioRef.current.volume = volume;
//   }, [volume]);

//   useEffect(() => {
//     if (!audioRef.current) return;
//     audioRef.current.src = currentTrack?.url || "";
//     if (isPlaying && currentTrack) audioRef.current.play().catch(() => {});
//   }, [currentTrack]);

//   const play = () => {
//     if (!currentTrack) return;
//     setIsPlaying(true);
//     audioRef.current?.play().catch(() => {});
//   };

//   const pause = () => {
//     setIsPlaying(false);
//     audioRef.current?.pause();
//   };

//   const togglePlay = () => (isPlaying ? pause() : play());

//   const next = () => setCurrentIndex((i) => (i + 1) % queue.length);
//   const prev = () => setCurrentIndex((i) => (i - 1 + queue.length) % queue.length);

//   const seek = (time) => {
//     if (!audioRef.current) return;
//     audioRef.current.currentTime = time;
//     setProgress(time);
//   };

//   const addToQueue = (track) => setQueue((q) => [...q, track]);

//   const onTimeUpdate = () => setProgress(audioRef.current?.currentTime || 0);
//   const onLoadedMetadata = () => setDuration(audioRef.current?.duration || 0);
//   const onEnded = () => next();

//   return (
//     <AudioCtx.Provider
//       value={{
//         queue, currentTrack, currentIndex,
//         isPlaying, progress, duration, volume,
//         play, pause, togglePlay, next, prev, seek, setVolume, addToQueue, setCurrentIndex
//       }}
//     >
//       {children}
//       {/* Single audio element persisted globally */}
//       <audio
//         ref={audioRef}
//         onTimeUpdate={onTimeUpdate}
//         onLoadedMetadata={onLoadedMetadata}
//         onEnded={onEnded}
//       />
//     </AudioCtx.Provider>
//   );
// }
// //
