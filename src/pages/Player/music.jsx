import "./music.css";
import { useMusic } from "./MusicContent";
import { FaRedoAlt } from "react-icons/fa";

const Music = () => {
  const {
    isPlaying,
    play,
    pause,
    prevTrack,
    nextTrack,
    tracks,
    currentIndex,
    repeatMode,
    toggleRepeat,
  } = useMusic();
  // const [progress, setProgress] = useState(0);
  // const [volume, setVolume] = useState(1);
  // const audio = document.querySelector("audio");

  // useEffect(() => {
  //   if (!audio) return;
  //   const updateProgress = () => {
  //     setProgress((audio.currentTime / audio.duration) * 100 || 0);
  //   };
  //   audio.addEventListener("timeupdate", updateProgress);
  //   return () => audio.removeEventListener("timeupdate", updateProgress);
  // }, [audio]);

  // useEffect(() => {
  //   if (audio) {
  //     audio.volume = volume;
  //   }
  // }, [volume, audio]);

  // const handleSeek = (e) => {
  //   const newProgress = e.target.value;
  //   setProgress(newProgress);
  //   if (audio) {
  //     audio.currentTime = (newProgress / 100) * audio.duration;
  //   }
  // };

  return (
    <div className="">
      <div className="paper music-layer">
        <div className=" fade player-container">
          <h3 className="song-title">{tracks[currentIndex].title}</h3>
          <img src={tracks[currentIndex].image} alt="" className="album-art" />
          <div className="controls">
            <div className="ces">
              <button onClick={prevTrack}>⏮ </button>
              {isPlaying ? (
                <button onClick={pause}>⏸ </button>
              ) : (
                <button onClick={play} className="play">▶ </button>
              )}
              <button onClick={nextTrack}>⏭ </button>
              <button
                onClick={toggleRepeat}
                className={repeatMode !== "off" ? "active" : ""}
              >
                <FaRedoAlt className="icon-redo" />
                {repeatMode === "all" && <span className="mode">ALL</span>}
                {repeatMode === "one" && <span className="mode">1</span>}
              </button>
            </div>
          </div>
        </div>

        <div className="bottom-layer">
          {/* progress bar */}
          {/* <div className="">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              style={{ width: "300px" }}
            /> */}
          {/* </div> */}

          {/* volume slider */}
          {/* <div className="volume">
            <label>🔊:</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              color="#333"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Music;
