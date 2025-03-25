// src/components/About.jsx
import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-tertiary rounded-[20px] py-8 px-12 min-h-[320px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} className="w-24 h-24 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm an aspiring software engineer currently pursuing my Bachelor's degree in 
        Computer Science at the University of Texas at Dallas. With a strong foundation 
        in Python, Java, JavaScript, and other programming languages, I'm passionate about 
        full-stack development and emerging technologies like AI/ML.
        <br /><br />
        Beyond my academic pursuits, I've gained valuable real-world experience through 
        professional roles that have honed my leadership, problem-solving, and communication 
        skills. I'm actively contributing to open-source projects, building my own applications, 
        and seeking internship opportunities where I can apply my skills in web development 
        and technical projects.
        <br /><br />
        I'm a quick learner and collaborative team player with a passion for creating 
        efficient, user-friendly software solutions. Let's work together to bring your ideas to life!
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");