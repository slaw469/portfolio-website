import React from "react";
import { motion } from "framer-motion";

// Import images correctly
import reactImg from "../assets/tech/react.png";
import uiuxImg from "../assets/tech/uiux.png";
import fullstackImg from "../assets/tech/fullstack.png";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const showcaseItems = [
  {
    category: "Frontend",
    title: "React Specialist",
    description: "Building responsive and interactive user interfaces with modern React practices, including hooks, context API, and component optimization.",
    skills: ["React", "Redux", "Next.js", "Tailwind CSS"],
    icon: reactImg, // Use the imported image
    color: "blue"
  },
  {
    category: "UI/UX",
    title: "User Experience Focus",
    description: "Creating intuitive interfaces with attention to accessibility, performance optimization, and thoughtful motion design.",
    skills: ["Responsive Design", "Animation", "User Testing", "Design Systems"],
    icon: uiuxImg, // Use the imported image
    color: "green"
  },
  {
    category: "Backend",
    title: "Full-Stack Capabilities",
    description: "Complementing frontend expertise with strong backend skills to develop complete, scalable web applications.",
    skills: ["Node.js", "Express", "MongoDB", "RESTful APIs"],
    icon: fullstackImg, // Use the imported image
    color: "purple"
  },
];

const SkillCard = ({ index, category, title, description, skills, icon, color }) => {
  const gradientClasses = {
    blue: "blue-text-gradient",
    green: "green-text-gradient",
    purple: "pink-text-gradient", 
    orange: "orange-text-gradient"
  };
  
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className='bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full'
    >
      <div className="flex items-center gap-4 mb-6">
        <img 
          src={icon} 
          alt={title} 
          className="w-12 h-12 object-contain"
        />
        <p className={`text-white font-black text-[24px]`}>{title}</p>
      </div>

      <div>
        <p className={`${gradientClasses[color]} uppercase tracking-wider text-[14px] mb-3`}>
          {category}
        </p>
        
        <p className='text-white tracking-wider text-[16px]'>{description}</p>

        <div className='mt-7 flex flex-wrap gap-2'>
          {skills.map((skill, skillIndex) => (
            <span 
              key={skillIndex}
              className="bg-tertiary px-3 py-1 rounded-full text-[12px] text-white"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Project Stats Component
const ProjectStats = () => {
  const stats = [
    { label: "Projects Completed", value: "15+" },
    { label: "Technologies Used", value: "12+" },
    { label: "GitHub Commits", value: "650+" },
    { label: "Coffee Consumed", value: "∞" },
  ];
  
  return (
    <div className="flex flex-wrap justify-around gap-8 py-10">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={fadeIn("up", "spring", index * 0.2, 0.6)}
          className="text-center"
        >
          <h3 className="text-white text-[40px] font-bold">{stat.value}</h3>
          <p className="text-secondary text-[16px]">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

const SkillsShowcase = () => {
  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What I bring to the table</p>
          <h2 className={styles.sectionHeadText}>Skills Showcase.</h2>
        </motion.div>
        
        {/* Project stats with proper spacing */}
        <ProjectStats />
      </div>
      
      <div className={`mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7 justify-center`}>
        {showcaseItems.map((item, index) => (
          <SkillCard 
            key={`skill-${index}`} 
            index={index} 
            {...item} 
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(SkillsShowcase, "");