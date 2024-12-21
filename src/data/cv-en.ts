export const cvData = {
  basics: {
    name: "Your Name",
    label: "Full Stack Developer",
    email: "your.email@example.com",
    location: {
      city: "Your City",
      country: "Your Country"
    },
    profiles: [
      {
        network: "GitHub",
        url: "https://github.com/yourusername"
      },
      {
        network: "LinkedIn",
        url: "https://linkedin.com/in/yourusername"
      }
    ]
  },
  work: [
    {
      company: "Example Company",
      position: "Senior Developer",
      startDate: "2020-01",
      endDate: "Present",
      highlights: [
        "Led development of key features",
        "Improved performance by 50%"
      ]
    }
  ],
  skills: [
    {
      name: "JavaScript",
      level: 90,
      keywords: ["ES6+", "Node.js", "TypeScript", "React", "Vue.js"],
      category: "Programming Languages",
      description: "Modern JavaScript including ES6+ features",
      yearsOfExperience: 5,
      relatedSkills: ["TypeScript", "Node.js"]
    },
    {
      name: "TypeScript",
      level: 85,
      keywords: ["Types", "Interfaces", "Generics", "Decorators"],
      category: "Programming Languages",
      description: "Strong typing and advanced TypeScript features",
      yearsOfExperience: 3,
      relatedSkills: ["JavaScript", "React"]
    },
    {
      name: "React",
      level: 88,
      keywords: ["Hooks", "Context", "Redux", "Next.js", "React Query"],
      category: "Frameworks",
      description: "Modern React with hooks and state management",
      yearsOfExperience: 4,
      relatedSkills: ["JavaScript", "TypeScript", "Next.js"]
    },
    {
      name: "Next.js",
      level: 82,
      keywords: ["SSR", "SSG", "API Routes", "Middleware", "ISR"],
      category: "Frameworks",
      description: "Server-side rendering and static site generation",
      yearsOfExperience: 2,
      relatedSkills: ["React", "TypeScript"]
    },
    {
      name: "TailwindCSS",
      level: 85,
      keywords: ["Responsive", "Custom Themes", "JIT", "Plugins"],
      category: "Frameworks",
      description: "Utility-first CSS framework",
      yearsOfExperience: 2,
      relatedSkills: ["CSS", "Web Design"]
    }
  ],
  projects: [
    {
      name: "Interactive CV",
      description: "A modern, interactive web-based CV built with Next.js and TypeScript",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      sourceUrl: "https://github.com/yourusername/interactive-cv",
      highlights: [
        "Implemented responsive design with Tailwind CSS",
        "Added smooth animations with Framer Motion",
        "Integrated multilingual support (EN/DE)"
      ]
    }
  ]
}; 