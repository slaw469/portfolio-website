import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Import your technology icons
import {
  html,
  css,
  javascript,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
} from "../assets";

// Sample code snippets for different technologies
const codeSnippets = {
  react: {
    name: "React",
    icon: reactjs, 
    code: `import React, { useState, useEffect } from 'react';

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch weather data
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY'
        );
        const data = await res.json();
        setWeather(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setLoading(false);
      }
    };
    
    fetchWeather();
  }, []);
  
  if (loading) return <div>Loading weather data...</div>;
  
  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <p>{Math.round(weather.main.temp - 273.15)}°C</p>
      <p>{weather.weather[0].description}</p>
    </div>
  );
}

export default WeatherApp;`,
    description: "A React component that fetches and displays weather data from an API."
  },
  
  javascript: {
    name: "JavaScript",
    icon: javascript,
    code: `// Advanced array manipulation techniques
const users = [
  { id: 1, name: 'Alice', age: 28, role: 'developer' },
  { id: 2, name: 'Bob', age: 35, role: 'designer' },
  { id: 3, name: 'Charlie', age: 24, role: 'developer' },
  { id: 4, name: 'Diana', age: 42, role: 'manager' },
];

// Filter, map, and reduce chaining
const developersAverageAge = users
  .filter(user => user.role === 'developer')
  .map(dev => dev.age)
  .reduce((sum, age, _, array) => sum + age / array.length, 0);

console.log(\`Developers average age: \${developersAverageAge}\`);

// Object destructuring and spread operator
const [mainDev, ...otherDevs] = users.filter(u => u.role === 'developer');
const enhancedDev = { 
  ...mainDev, 
  skills: ['JavaScript', 'React', 'Node.js'],
  yearsOfExperience: 5
};

// Async/await with error handling
async function fetchUserProjects(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}/projects\`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}`,
    description: "Modern JavaScript techniques including array methods, destructuring, async/await, and error handling."
  },
  
  nodejs: {
    name: "Node.js",
    icon: nodejs,
    code: `const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'pending' },
  dueDate: Date,
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', TaskSchema);

// API Routes
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`,
    description: "A RESTful API built with Node.js, Express, and MongoDB that manages tasks."
  },
  
  css: {
    name: "CSS",
    icon: css,
    code: `/* Modern CSS techniques */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --dark-color: #2c3e50;
  --light-color: #ecf0f1;
  --spacing: 1rem;
  --border-radius: 0.25rem;
}

/* CSS Grid layout */
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: var(--spacing);
  padding: var(--spacing);
}

.card {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* CSS Custom Properties and calculations */
.card-header {
  background-color: var(--primary-color);
  color: white;
  padding: calc(var(--spacing) * 1.5);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

/* CSS animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-in {
  animation: fadeIn 0.5s ease forwards;
}

/* Media queries for responsiveness */
@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}`,
    description: "Modern CSS techniques including custom properties, grid layout, animations, and responsive design."
  },
  
  tailwind: {
    name: "Tailwind CSS",
    icon: tailwind,
    code: `// Tailwind CSS example component
// Using utility classes for rapid UI development

function ProfileCard() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img className="h-48 w-full object-cover md:h-full md:w-48" 
               src="/img/profile.jpg" 
               alt="Profile Photo" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Full Stack Developer
          </div>
          <h2 className="mt-1 text-lg font-medium text-gray-900">
            Steven Johnson
          </h2>
          <p className="mt-2 text-gray-500">
            Creating elegant solutions with modern web technologies.
          </p>
          <div className="mt-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg 
                      hover:bg-indigo-700 focus:outline-none focus:ring-2 
                      focus:ring-indigo-500 transition duration-150 ease-in-out">
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    description: "Utility-first CSS with Tailwind for rapid UI development."
  }
};

// Line numbers component
const LineNumbers = ({ code }) => {
  const lines = code.split('\n');
  
  return (
    <div className="line-numbers text-gray-500 text-right pr-4 select-none">
      {lines.map((_, i) => (
        <div key={i} className="leading-6">
          {i + 1}
        </div>
      ))}
    </div>
  );
};

// Syntax highlighting component (simplified version)
// In a real implementation, you'd use a library like Prism.js or highlight.js
const SyntaxHighlighter = ({ code, language }) => {
  // Just a simple implementation - in reality, you'd use a proper syntax highlighter
  const lines = code.split('\n');
  
  return (
    <div className="syntax-highlighter leading-6">
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre">
          {line}
        </div>
      ))}
    </div>
  );
};

// Tab component
const EditorTab = ({ tech, isActive, onClick }) => {
  return (
    <div 
      className={`px-4 py-2 rounded-t-lg cursor-pointer flex items-center space-x-2 ${
        isActive 
          ? 'bg-gray-800 text-white' 
          : 'bg-gray-600 text-gray-300 hover:bg-gray-700'
      }`}
      onClick={() => onClick(tech)}
    >
      <img src={codeSnippets[tech].icon} alt={codeSnippets[tech].name} className="w-5 h-5" />
      <span>{codeSnippets[tech].name}</span>
    </div>
  );
};

// Main CodeEditorShowcase component
const CodeEditorShowcase = () => {
  const [activeTech, setActiveTech] = useState('react');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const handleTabClick = (tech) => {
    setIsVisible(false);
    
    // Small delay for animation
    setTimeout(() => {
      setActiveTech(tech);
      setIsVisible(true);
    }, 300);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {/* Editor tabs */}
      <div className="flex space-x-1 mb-1">
        {Object.keys(codeSnippets).map((tech) => (
          <EditorTab 
            key={tech} 
            tech={tech} 
            isActive={tech === activeTech} 
            onClick={handleTabClick} 
          />
        ))}
      </div>
      
      {/* Editor main area */}
      <motion.div 
        className="bg-gray-800 rounded-lg p-4 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : 20 
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Description */}
        <div className="bg-gray-700 text-white p-3 mb-4 rounded">
          <p>{codeSnippets[activeTech].description}</p>
        </div>
        
        {/* Code editor */}
        <div className="bg-gray-900 rounded text-gray-100 font-mono text-sm overflow-auto max-h-[500px]">
          <div className="flex">
            <LineNumbers code={codeSnippets[activeTech].code} />
            <SyntaxHighlighter 
              code={codeSnippets[activeTech].code}
              language={activeTech}
            />
          </div>
        </div>
        
        {/* Editor status bar */}
        <div className="bg-gray-700 text-gray-300 text-xs p-2 mt-1 rounded flex justify-between">
          <div>language: {activeTech}</div>
          <div>utf-8</div>
        </div>
      </motion.div>
    </div>
  );
};

// Fix: Adding default export
export default CodeEditorShowcase;
// Also keep the named export for compatibility
export { CodeEditorShowcase };