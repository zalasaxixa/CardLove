import React, { useEffect } from "react";
import "./FallingPetals.css";

function FallingPetals() {
  useEffect(() => {
    const container = document.querySelector(".petal-container");

    for (let i = 0; i < 20; i++) {
      const petal = document.createElement("div");
      petal.className = "petal";
      petal.style.left = `${Math.random() * 220}vw`;
      petal.style.animationDuration = `${5 + Math.random() * 5}s`;
      petal.style.opacity = Math.random();
      petal.style.transform = `scale(${0.5 + Math.random()}) rotate(${
        Math.random() * 360
      }deg)`;
      container.appendChild(petal);
    }
  }, []);

  return <div className="petal-container"></div>;
}

export default FallingPetals;
