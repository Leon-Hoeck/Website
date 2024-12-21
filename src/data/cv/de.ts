import { CV } from '@/types/cv';

export const cv: CV = {
  basics: {
    name: "Ihr Name",
    label: "Full Stack Entwickler",
    email: "ihre.email@example.com",
    location: {
      city: "Ihre Stadt",
      country: "Schweiz"
    },
    profiles: [
      {
        network: "LinkedIn",
        url: "https://linkedin.com/in/ihrname"
      },
      {
        network: "GitHub",
        url: "https://github.com/ihrusername"
      }
    ]
  },
  work: [
    {
      company: "Beispiel GmbH",
      position: "Senior Full Stack Entwickler",
      startDate: "2020-01",
      endDate: "Heute",
      highlights: [
        "Leitung der Entwicklung mehrerer wichtiger Projekte",
        "Implementierung von CI/CD-Pipelines mit 50% Zeitersparnis",
        "Mentoring von Junior-Entwicklern und Code-Reviews",
        "Architektur und Entwicklung skalierbarer Microservices"
      ]
    }
  ],
  education: [
    {
      institution: "Universität Name",
      url: "https://universitaet-website.com",
      area: "Informatik",
      studyType: "Bachelor",
      startDate: "2015-09",
      endDate: "2019-06",
      score: "5.5",
      courses: [
        "Fortgeschrittene Softwareentwicklung",
        "Datenbanksysteme",
        "Webentwicklung",
        "Algorithmen und Datenstrukturen"
      ]
    }
  ],
  skills: [
    {
      name: "JavaScript",
      level: 90,
      keywords: ["ES6+", "Node.js", "TypeScript"],
      category: "Programmiersprachen",
      description: "Modernes JavaScript einschließlich ES6+ Features und asynchroner Programmierung",
      yearsOfExperience: 5,
      relatedSkills: ["TypeScript", "Node.js", "React"]
    },
    {
      name: "TypeScript",
      level: 85,
      keywords: ["Types", "Interfaces", "Generics"],
      category: "Programmiersprachen",
      description: "Statische Typisierung und fortgeschrittene TypeScript-Funktionen",
      yearsOfExperience: 3,
      relatedSkills: ["JavaScript", "React", "Node.js"]
    },
    {
      name: "React",
      level: 88,
      keywords: ["Hooks", "Context", "Redux", "Next.js"],
      category: "Frontend-Frameworks",
      description: "Modernes React mit Hooks und State Management",
      yearsOfExperience: 4,
      relatedSkills: ["JavaScript", "TypeScript", "Redux"]
    },
    {
      name: "Node.js",
      level: 85,
      keywords: ["Express", "NestJS", "APIs"],
      category: "Backend-Technologien",
      description: "Server-seitiges JavaScript und API-Entwicklung",
      yearsOfExperience: 4,
      relatedSkills: ["JavaScript", "TypeScript", "MongoDB"]
    },
    {
      name: "DevOps",
      level: 80,
      keywords: ["Docker", "Kubernetes", "CI/CD"],
      category: "Infrastruktur",
      description: "Container-Orchestrierung und Deployment-Automatisierung",
      yearsOfExperience: 3,
      relatedSkills: ["Linux", "AWS", "Jenkins"]
    }
  ],
  languages: [
    {
      language: "Deutsch",
      fluency: "Muttersprache"
    },
    {
      language: "Englisch",
      fluency: "Verhandlungssicher"
    },
    {
      language: "Französisch",
      fluency: "Grundkenntnisse"
    }
  ],
  interests: [
    {
      name: "Open Source",
      keywords: [
        "Beitrag zu Community-Projekten",
        "Entwicklung von Entwicklertools",
        "Wissensaustausch"
      ]
    },
    {
      name: "Technologie",
      keywords: [
        "Künstliche Intelligenz",
        "Cloud Computing",
        "System-Architektur"
      ]
    }
  ],
  references: [
    {
      name: "Auf Anfrage verfügbar",
      reference: ""
    }
  ],
  projects: [
    {
      name: "Interaktiver Lebenslauf",
      description: "Ein moderner, interaktiver webbasierter Lebenslauf mit Next.js und TypeScript",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      sourceUrl: "https://github.com/ihrusername/interactive-cv",
      highlights: [
        "Implementierung eines responsiven Designs mit Tailwind CSS",
        "Integration flüssiger Animationen mit Framer Motion",
        "Mehrsprachige Unterstützung (DE/EN)"
      ]
    },
    {
      name: "Projektmanagement-Dashboard",
      description: "Echtzeit-Projektmanagement-Tool mit Analytics",
      technologies: ["React", "Node.js", "MongoDB", "WebSocket"],
      highlights: [
        "Entwicklung von Echtzeit-Kollaborationsfunktionen",
        "Implementierung komplexer Datenvisualisierungen",
        "Design einer skalierbaren Backend-Architektur"
      ]
    }
  ]
}; 