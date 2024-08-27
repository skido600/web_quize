import React from "react";

import { motion } from "framer-motion";
import { FaArrowCircleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Welcome() {
  const navigate = useNavigate();
  const handlenav = () => {
    navigate("/quize");
  };
  const arrowVariants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <main className="bg-[#000000] w-full h-screen flex flex-col justify-center items-center text-center">
        <h2 className="text-white text-xl font-bold mb-4">
          WELCOME TO QUIZARD - CHALLENGE YOURSELF ON WEB THEORETICAL PART
        </h2>
        <button
          onClick={handlenav}
          className="bg-[#D5CFE1] text-black py-2 px-4 rounded flex items-center gap-2 hover:bg-[#b0a4b6] transition"
        >
          Get Started
          <motion.div
            className="text-xl"
            variants={arrowVariants}
            animate="animate"
          >
            <FaArrowCircleDown />
          </motion.div>
        </button>
      </main>
    </>
  );
}

export default Welcome;
