export interface CVData {
  basics: {
    name: string;
    label: string;
    email: string;
    location: {
      city: string;
      country: string;
    };
    profiles: Array<{
      network: string;
      url: string;
    }>;
  };
  languageSkills: Array<{
    language: string;
    level: string;
    skills: {
      speaking: string;
      writing: string;
      listening: string;
      reading: string;
    };
  }>;
  work: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    highlights: string[];
  }>;
  skills: Array<{
    name: string;
    level: number;
    keywords: Array<{
      name: string;
      level: number;
    }>;
    category: string;
    description: {
      text: string;
      yearsOfExperience: number;
    };
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    sourceUrl?: string;
    highlights: string[];
  }>;
} 