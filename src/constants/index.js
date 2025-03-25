// src/constants/index.js
import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  threejs,
  // Only include the project images that exist
  bear,
  taskmind,
  smarthome,
  codingcentral,
  fiver,
  fogo,
  pappadeaux
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Problem Solver",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "Python",
    icon: figma, // Using figma icon as placeholder for Python
  },
  {
    name: "Java",
    icon: docker, // Using docker icon as placeholder for Java
  },
];

// Create a placeholder for company icons
const placeholderIcon = "https://placehold.co/100x100?text=Company";

const experiences = [
  {
    title: "Customer Service Representative",
    company_name: "Fogo De Chão Brazilian Steakhouse",
    icon: fogo, // Replacing missing fogo icon
    iconBg: "#383E56",
    date: "Present",
    points: [
      "Provided high-level customer service in a fast-paced dining environment, ensuring guest satisfaction",
      "Assisted in resolving customer concerns and maintaining a positive dining experience",
      "Gained excellent communication and interpersonal skills, directly applicable to team-based software roles",
      "Collaborated with large teams to ensure seamless dining experiences for customers",
    ],
  },
  {
    title: "Open Source Contributor & Freelance Web Developer",
    company_name: "Self-Employed & GitHub",
    icon: fiver, // Replacing missing fiver icon
    iconBg: "#E6DEDD",
    date: "Current",
    points: [
      "Contributed bug fixes and documentation improvements to various open-source projects",
      "Collaborated with developers through pull requests, issue tracking, and code reviews",
      "Designed and developed custom websites for local businesses, enhancing their online presence",
      "Worked closely with clients to create responsive, SEO-friendly designs using HTML, CSS, JavaScript, and WordPress",
    ],
  },
  {
    title: "Head Waiter",
    company_name: "Pappadeaux Seafood Scratch Kitchen",
    icon: pappadeaux, // Replacing missing pappadeaux icon
    iconBg: "#383E56",
    date: "2022 - 2023",
    points: [
      "Led a team of servers in a high-volume, fast-paced restaurant, ensuring exceptional customer service",
      "Managed table assignments, optimized workflow, and trained new staff to enhance efficiency",
      "Developed strong leadership, problem-solving, and team coordination skills in a high-pressure environment",
      "Applied communication and organizational skills to handle customer inquiries and maintain high service standards",
    ],
  },
  {
    title: "Co-Founder",
    company_name: "Coding Central",
    icon: codingcentral, // Replacing missing meta icon
    iconBg: "#E6DEDD",
    date: "2022 - 2023",
    points: [
      "Served as Secretary for the North Garland chapter with over 100 members",
      "Assisted in local outreach programs at elementary schools to spark interest in computer science, documented professional events, and helped manage the website codingcentral.org",
      "Managed course and competition development, global tutoring teams, and development teams for a nonprofit organization serving over 5,000 students and tutors worldwide",
      "Partnered with Microsoft, Google, Adobe, Garland ISD, and a Kenya-based nonprofit affiliated with Kenyatta University to provide 1:1 tutoring for youth aged 18-35, dedicated to offering free computer science education",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Steven quickly adapted to our needs and delivered a responsive website that perfectly represented our brand.",
    name: "Local Business Client",
    designation: "Small Business Owner",
    company: "Restaurant Chain",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "His problem-solving skills and attention to detail made him an invaluable team member during our hackathon.",
    name: "Hackathon Team Lead",
    designation: "Project Manager",
    company: "HackUTD",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "Steven's willingness to learn and strong work ethic make him an excellent developer with great potential.",
    name: "Academic Advisor",
    designation: "Professor",
    company: "University of Texas at Dallas",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Smart Home Energy Optimizer",
    description:
      "System that optimizes electrical use to save money while sustaining comfort. Approach based on declarative logic programming using Prolog's inference engine with backward chaining (goal-driven reasoning) and forward chaining (data-driven reasoning) to derive conclusions from rules and facts.",
    tags: [
      {
        name: "prolog",
        color: "blue-text-gradient",
      },
      {
        name: "inference engine",
        color: "green-text-gradient",
      },
      {
        name: "AI",
        color: "pink-text-gradient",
      },
    ],
    image: smarthome,
    source_code_link: "https://github.com/slaw469/Smart-Home-Energy-Optimizer/blob/main/UTD%20HackReason/README.md",
  },
  {
    name: "Task Mind",
    description:
      "A habit tracker for everyday use. Helps users build consistent habits by tracking daily activities, providing visualizations of progress, and offering motivation through achievement tracking.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "productivity",
        color: "pink-text-gradient",
      },
    ],
    image: taskmind,
    source_code_link: "https://github.com/slaw469/TaskMind",
  },
  {
    name: "AI Bear Trainer",
    description:
      "An AI chatbot that gives suggestions on how to get more fit or in shape. Uses comedic dialog and takes on the personality of a bear to make fitness advice more engaging and fun.",
    tags: [
      {
        name: "ai",
        color: "blue-text-gradient",
      },
      {
        name: "nlp",
        color: "green-text-gradient",
      },
      {
        name: "fitness",
        color: "pink-text-gradient",
      },
    ],
    image: bear,
    source_code_link: "https://github.com/slaw469/ai-bear-trainer",
  },
];

export { services, technologies, experiences, testimonials, projects };