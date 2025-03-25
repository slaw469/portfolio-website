import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

// Function to process text and make website URLs clickable and highlighted
const processText = (text) => {
  // Regular expression to match website URLs
  const urlRegex = /(codingcentral\.org)/g;
  
  // If there's no match, return the original text
  if (!text.match(urlRegex)) {
    return text;
  }
  
  // Split the text by the URL
  const parts = text.split(urlRegex);
  
  return (
    <>
      {parts.map((part, index) => {
        // If this part matches our URL regex
        if (part.match(urlRegex)) {
          return (
            <a
              key={index}
              href={`https://${part}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block group"
            >
              <span className="text-blue-400 font-bold transition-all duration-300 group-hover:text-blue-300">
                {part}
              </span>
              {/* Glowing underline effect */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 opacity-70 group-hover:opacity-100 group-hover:animate-pulse group-hover:shadow-[0_0_8px_2px_rgba(96,165,250,0.6)]"></span>
              {/* Subtle glow */}
              <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-20 bg-blue-400 blur-md rounded-md transition-opacity duration-300"></span>
            </a>
          );
        }
        return part;
      })}
    </>
  );
};

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ 
        background: experience.iconBg,
        overflow: "hidden", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0
      }}
      icon={
        <div 
          style={{ 
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            overflow: "hidden"
          }}
        >
          <img
            src={experience.icon}
            alt={experience.company_name}
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "contain",
              position: "relative",
              zIndex: 1,
              transform: "scale(1.1)" // Makes the image slightly larger than the container
            }}
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {processText(point)}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");