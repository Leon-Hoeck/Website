import { CV } from '@/types/cv';

export const cv: CV = {
  basics: {
    name: "Your Name",
    label: "Full Stack Developer",
    email: "your.email@example.com",
    location: {
      city: "Your City",
      country: "Switzerland"
    },
    profiles: [
      {
        network: "LinkedIn",
        url: "https://linkedin.com/in/yourname"
      },
      {
        network: "GitHub",
        url: "https://github.com/yourusername"
      }
    ]
  },
  work: [
    {
      company: "Example Company",
      position: "Senior Full Stack Developer",
      startDate: "2020-01",
      endDate: "Present",
      highlights: [
        "Led development of multiple high-impact projects",
        "Implemented CI/CD pipelines reducing deployment time by 50%",
        "Mentored junior developers and conducted code reviews",
        "Architected and built scalable microservices"
      ]
    }
  ],
  education: [
    {
      institution: "University Name",
      url: "https://university-website.com",
      area: "Computer Science",
      studyType: "Bachelor",
      startDate: "2015-09",
      endDate: "2019-06",
      score: "5.5",
      courses: [
        "Advanced Software Engineering",
        "Database Systems",
        "Web Development",
        "Algorithms and Data Structures"
      ]
    }
  ],
  skills: [
    {
      name: "JavaScript",
      level: 90,
      keywords: ["ES6+", "Node.js", "TypeScript"],
      category: "Programming Languages",
      description: "Modern JavaScript including ES6+ features and async programming",
      yearsOfExperience: 5,
      relatedSkills: ["TypeScript", "Node.js", "React"]
    },
    {
      name: "TypeScript",
      level: 85,
      keywords: ["Types", "Interfaces", "Generics"],
      category: "Programming Languages",
      description: "Strong typing and advanced TypeScript features",
      yearsOfExperience: 3,
      relatedSkills: ["JavaScript", "React", "Node.js"]
    },
    {
      name: "React",
      level: 88,
      keywords: ["Hooks", "Context", "Redux", "Next.js"],
      category: "Frontend Frameworks",
      description: "Modern React with hooks and state management",
      yearsOfExperience: 4,
      relatedSkills: ["JavaScript", "TypeScript", "Redux"]
    },
    {
      name: "Node.js",
      level: 85,
      keywords: ["Express", "NestJS", "APIs"],
      category: "Backend Technologies",
      description: "Server-side JavaScript and API development",
      yearsOfExperience: 4,
      relatedSkills: ["JavaScript", "TypeScript", "MongoDB"]
    },
    {
      name: "DevOps",
      level: 80,
      keywords: ["Docker", "Kubernetes", "CI/CD"],
      category: "Infrastructure",
      description: "Container orchestration and deployment automation",
      yearsOfExperience: 3,
      relatedSkills: ["Linux", "AWS", "Jenkins"]
    }
  ],
  languages: [
    {
      language: "English",
      fluency: "Native speaker"
    },
    {
      language: "German",
      fluency: "Professional working proficiency"
    },
    {
      language: "French",
      fluency: "Elementary proficiency"
    }
  ],
  interests: [
    {
      name: "Open Source",
      keywords: [
        "Contributing to community projects",
        "Building developer tools",
        "Sharing knowledge"
      ]
    },
    {
      name: "Technology",
      keywords: [
        "Artificial Intelligence",
        "Cloud Computing",
        "System Architecture"
      ]
    }
  ],
  references: [
    {
      name: "Available upon request",
      reference: ""
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
    },
    {
      name: "Project Management Dashboard",
      description: "Real-time project management tool with analytics",
      technologies: ["React", "Node.js", "MongoDB", "WebSocket"],
      highlights: [
        "Built real-time collaboration features",
        "Implemented complex data visualizations",
        "Designed scalable backend architecture"
      ]
    }
  ]
}; 