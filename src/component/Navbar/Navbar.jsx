import React from "react";
import "./Navbar.css";
import { motion } from "framer-motion";
const Navbar = () => {
  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ padding: "20x", textAlign: "center" }}
    >
      <div className="Header">
        <div className="Header-nf">
         Welcome To The Login Page 💖
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
