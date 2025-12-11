import React, { useState } from "react";
import "./Hero.css";
import Imagelove from "../../assets/Item.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const correctPassword = "020410";

  const handleClick = (digit) => {
    if (pin.length < 6) {
      setPin(pin + digit);
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === correctPassword) {
      navigate("/home");
    } else {
      setError(alert("Password salah cantikk, silahkan coba lagi T v T"));
      setPin("");
    }
  };

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ padding: "20x", textAlign: "center" }}
    >
      <div className="Hero">
        <div className="Hero-up">
          <div className="card-container">
            {/* <!-- Bagian kiri: area tampilan dengan potongan hati --> */}
            <div className="display-area">
              <div className="heart-cutout">
                {/* <!-- Di sini bisa diletakkan gambar atau konten lain --> */}
                <img src={Imagelove} alt="" />
              </div>
            </div>

            {/* <!-- Bagian kanan: area tombol numerik --> */}
            <div className="keypad-area">
              <div className="padlock-icon">
                <input
                  type="password"
                  value={pin}
                  readOnly
                  onChange={(e) => setPin(e.target.value)}
                  maxLength={4}
                  className="display"
                />
              </div>
              {/* <!-- Tombol-tombol numerik --> */}
              <div className="keypad-grid">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "#"].map(
                  (num) => (
                    <button
                      key={num}
                      onClick={() => handleClick(num.toString())}
                    >
                      {num}
                    </button>
                  )
                )}
                <div className="keypad-grid-submit">
                  <button onClick={handleSubmit} disabled={pin.length !== 6}>
                    =
                  </button>
                </div>
                {error}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
