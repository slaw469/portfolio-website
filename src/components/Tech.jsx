import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { TechEcosystemCanvas } from "./canvas"; // Import the new component

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My technical skills</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>

      <div className="w-full flex">
        <TechEcosystemCanvas />
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");