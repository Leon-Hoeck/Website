export interface CVData {
  basics: {
    name: string;
    label: string;
    email: string;
    phone?: string;
    location: {
      city: string;
      country: string;
    };
    profiles: {
      network: string;
      url: string;
    }[];
  };
  work: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    highlights: string[];
  }[];
  skills: {
    name: string;
    level: number;
    keywords: string[];
    category: string;
    description?: string;
    yearsOfExperience?: number;
    relatedSkills?: string[];
  }[];
  languageSkills: {
    language: string;
    level: string;
    skills: {
      speaking: string;
      listening: string;
      writing: string;
      reading: string;
    };
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
    image?: string;
    liveUrl?: string;
    sourceUrl?: string;
    highlights?: string[];
  }[];
} 