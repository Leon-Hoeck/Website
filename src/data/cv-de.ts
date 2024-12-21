export const cvData = {
  basics: {
    name: "Dein Name",
    label: "Full Stack Entwickler",
    email: "deine.email@example.com",
    location: {
      city: "Deine Stadt",
      country: "Dein Land"
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
      company: "Beispiel GmbH",
      position: "Senior Entwickler",
      startDate: "2020-01",
      endDate: "Heute",
      highlights: [
        "Entwicklung von Kernfunktionen",
        "Performance um 50% verbessert"
      ]
    }
  ],
  skills: [
    {
      name: "JavaScript",
      level: 90,
      keywords: ["ES6+", "Node.js", "TypeScript", "React", "Vue.js"],
      category: "Programming Languages",
      description: "Modernes JavaScript einschließlich ES6+ Features",
      yearsOfExperience: 5,
      relatedSkills: ["TypeScript", "Node.js"]
    },
    {
      name: "TypeScript",
      level: 85,
      keywords: ["Types", "Interfaces", "Generics", "Decorators"],
      category: "Programming Languages",
      description: "Typisierung und fortgeschrittene TypeScript Features",
      yearsOfExperience: 3,
      relatedSkills: ["JavaScript", "React"]
    },
    {
      name: "React",
      level: 88,
      keywords: ["Hooks", "Context", "Redux", "Next.js", "React Query"],
      category: "Frameworks",
      description: "Modernes React mit Hooks und State Management",
      yearsOfExperience: 4,
      relatedSkills: ["JavaScript", "TypeScript", "Next.js"]
    },
    {
      name: "Next.js",
      level: 82,
      keywords: ["SSR", "SSG", "API Routes", "Middleware", "ISR"],
      category: "Frameworks",
      description: "Server-side Rendering und statische Seitengenerierung",
      yearsOfExperience: 2,
      relatedSkills: ["React", "TypeScript"]
    },
    {
      name: "TailwindCSS",
      level: 85,
      keywords: ["Responsive", "Custom Themes", "JIT", "Plugins"],
      category: "Frameworks",
      description: "Utility-first CSS Framework",
      yearsOfExperience: 2,
      relatedSkills: ["CSS", "Web Design"]
    }
  ],
  projects: [
    {
      name: "Interaktiver Lebenslauf",
      description: "Ein moderner, interaktiver webbasierter Lebenslauf mit Next.js und TypeScript",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      sourceUrl: "https://github.com/yourusername/interactive-cv",
      highlights: [
        "Responsives Design mit Tailwind CSS implementiert",
        "Flüssige Animationen mit Framer Motion hinzugefügt",
        "Mehrsprachige Unterstützung (EN/DE) integriert"
      ]
    }
  ]
}; 