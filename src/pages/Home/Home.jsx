import React, { useEffect } from "react";
import "./Home.css";
import { useState } from "react";
import FallingPetals from "./Fallingpetal/FallingPetals";
import Music from "../../pages/Player/music";
import confetti from "canvas-confetti";
import Lia from "../../assets/lia.jpg";
import Lia2 from "../../assets/Lia2.jpg";
import Lia3 from "../../assets/Lia3.jpg";
import Lia4 from "../../assets/Lia4.jpg";
import Lia5 from "../../assets/Lia5.jpg";
import Lia6 from "../../assets/Lia6.jpg";
import Lia7 from "../../assets/Lia7.jpg";
import Lia8 from "../../assets/Lia8.jpg";
import Lia9 from "../../assets/Lia9.jpg";
import birthday from "../../assets/happybirthday.mp3"

import liaVideo from "../../assets/video.mp4";

const Home = () => {
  const [showOverLay, setShowOverLay] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [activePage, setActivePage] = useState("letterLove");
  const [fadeKey, setFadeKey] = useState(0);
  const [showPaper, setShowPaper] = useState(false);

  // birthday
  const initialDate = new Date("april 2, 2026 00:00:00");
  const [targetDate, setTargetDate] = useState(initialDate.getTime());
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());
  const [surprise, setSurprise] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleClick = () => {
    setShowVideo(true);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const distance = targetDate - now;
      setTimeLeft(distance);

      if (distance <= 0) {
        clearInterval(timer);
        setSurprise(true);

        // menjalankan confetti berulang kali
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    if (surprise) {
      const timeout = setTimeout(() => {
        const currentDate = new Date(targetDate);
        // tambah 1 tahun
        currentDate.setFullYear(currentDate.getFullYear() + 1);

        // simpan kembali sebagai timestamp
        setTargetDate(currentDate.getTime());

        // tutup kejuran , balik ke countdown
        setSurprise(false);
      }, 5 * 60 * 1000);
      return () => clearTimeout(timeout);
    }
  }, [surprise, targetDate]);
  //

  // untuk gallery
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const photos = [
    { src: Lia, size: "full" },
    { src: Lia3, size: "half" },
    { src: Lia2, size: "full" },
    { src: Lia4, size: "full" },
    { src: Lia5, size: "half" },
    { src: Lia6, size: "half" },
    { src: Lia7, size: "half" },
    { src: Lia8, size: "half" },
    { src: Lia9, size: "half" },
  ];

  function groupPhotosWithPlaceholders(photos, slotsPerPage = 8) {
    const pages = [];
    let tempHalf = null;

    photos.forEach((photo) => {
      if (photo.size === "full") {
        pages.push([photo]);
      } else {
        if (tempHalf) {
          pages.push([tempHalf, photo]);
          tempHalf = null;
        } else {
          tempHalf = photo;
        }
      }
    });

    if (tempHalf) {
      pages.push([tempHalf]);
    }

    return pages.map((page) => {
      const placeholders = new Array(slotsPerPage - page.length).fill({
        src: null,
        size: "empty",
      });
      return [...page, ...placeholders];
    });
  }

  const result = groupPhotosWithPlaceholders(photos);
  //

  // untuk cardlove
  const handleStart = () => {
    setButtonClicked(true);
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowOverLay(false), 1000);
    }, 700);
  };

  const handleNavClick = (page) => {
    setFadeKey((prev) => prev + 1);
    setActivePage(page);
  };
  //

  const renderContent = () => {
    switch (activePage) {
      case "letterLove":
        return (
          <div key={fadeKey} className="paper fade">
            <div className="LetterLove">
              <div style={styles.container}>
                {!showPaper && (
                  <div className="">
                    <p>I Love You💖</p>
                    <button
                      style={styles.button}
                      onClick={() => setShowPaper(true)}
                    >
                      I Love You Too
                    </button>
                  </div>
                )}

                {showPaper && (
                  <div style={styles.paper}>
                    <p style={styles.writer}>
                      Hei, thanks for Happy Memory, i m so happy for this one
                      soo, you deverse to be happy. i'm so sory for everyone
                      good luck!!.
                    </p>
                    <button
                      style={styles.closeBtn}
                      onClick={() => setShowPaper(false)}
                    >
                      Tutup
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case "Gallery":
        return (
          <div key={fadeKey} className="fade">
            <div className="gallery-container">
              <h2 className="gallery-title">Memories</h2>
              <div className="gallery-grid">
                {result.map((page, i) => (
                  <div key={i} className="page">
                    {page.map((photo, j) =>
                      photo.src ? (
                        <img
                          key={j}
                          src={photo.src}
                          className={photo.size}
                          alt={`photo-${i}-${j}`}
                          onClick={() => setSelectedPhoto(photo.src)}
                        ></img>
                      ) : (
                        <div key={j} className="empty-slot"></div>
                      )
                    )}
                  </div>
                ))}
              </div>
              {selectedPhoto && (
                <div className="modal" onClick={() => setSelectedPhoto(null)}>
                  <div className="modal-content">
                    <img src={selectedPhoto} alt="zoomed" />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "Birthday":
        if (surprise) {
          return (
            <div key={fadeKey} className="paper fade surprise-container">
              {!showVideo ? (
                <div className="gift-box" onClick={handleClick}>
                  <h1>🎁</h1>
                </div>
              ) : (
                <div  className="explosion">
                  <h1 className="surprise-text">
                    🎉 Surprise! Happy Birthday 🎂
                  </h1>
                  <video className="videoSrc" autoPlay loop muted>
                    <source src={liaVideo} type="video/mp4" />
                  </video>
                  <audio autoPlay>
                    <source src={birthday} type="audio/mpeg" />
                  </audio>
                </div>
              )}
            </div>
          );
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        return (
          <div className="clock">
            <h2>
              [{days}d] [{hours}h] [{minutes}m] [{seconds} s]
            </h2>
          </div>
        );
      case "Music":
        return <Music />;
      case "Notes":
        return (
          <div key={fadeKey} className="paper fade">
            <div className="Notes">
              <h1>Don't forget this, okay dear💖</h1>
              <p>🌺don't forget to drink 📖🖋️</p>
              <p>🌺Don't stay up until midnight 📖🖋️</p>
              <p>🌺being devoted to parents 📖🖋️</p>
              <p>🌺Don't forget the person you love 📖🖋️</p>
            </div>
          </div>
        );
      default:
        return <div className="paper"></div>;
    }
  };

  const isMobile = window.innerWidth <= 400;
  const styles = {
    writer: {
      fontSize: isMobile ? "18px" : "34px",
      fontFamily: "Courier New , monospace",
      lineHeight: isMobile ? "20px" : "40px",
    },

    button: {
      padding: "10px 20px",
      background: "#e91e63",
      color: "white",
      marginLeft: isMobile ? "0px" : "10px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: isMobile ? "12px" : "20px",
    },
    paper: {
      padding: "20px",
      borderRadius: "12px",
    },
    closeBtn: {
      marginTop: "20px",
      padding: "8px 16px",
      background: "#fbc02d",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

  return (
    <div>
      <div className="centerBox">
        {showOverLay && (
          <div className={`overlay ${fadeOut ? "fade-out" : ""}`}>
            <div className="overlay-box">
              <h1>Hello My Love!💖</h1>
              <p>I Hope You Enjoy Your Stay🥰 </p>
              <button
                onClick={handleStart}
                className={
                  buttonClicked ? "start-button animate" : "start-button"
                }
                disabled={buttonClicked}
              >
                Start Exploring
              </button>
            </div>
          </div>
        )}
        <div className="main-content">
          <h1>For My Love 💗</h1>
          <p>I Hope Your Happy and Doing Well 🧸🩷🌸🌷</p>
        </div>
        <div className="home-wrapper">
          <div className="navigator">
            <button onClick={() => handleNavClick("letterLove")}>
              💌Letter Love
            </button>
            <button onClick={() => handleNavClick("Gallery")}>📸Gallery</button>
            <button onClick={() => handleNavClick("Birthday")}>
              🎂Birthday
            </button>
            <button onClick={() => handleNavClick("Music")}>🎶Music</button>
            <button onClick={() => handleNavClick("Notes")}>📝Notes</button>
          </div>

          <div className="content-area">{renderContent()}</div>
        </div>
        <div className="Footer">
          <p>
            &copy; {new Date().getFullYear()} Khafid | Made with ❤️ and React
          </p>
        </div>
        <FallingPetals />
      </div>
    </div>
  );
};

export default Home;
