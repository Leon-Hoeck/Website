export interface CV {
  basics: Basics;
  work: Work[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  interests: Interest[];
  references: Reference[];
  projects: Project[];
}

export interface Basics {
  name: string;
  label: string;
  email: string;
  location: Location;
  profiles: Profile[];
}

export interface Location {
  city: string;
  country: string;
}

export interface Profile {
  network: string;
  url: string;
}

export interface Work {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
}

export interface Skill {
  name: string;
  level: number;
  keywords: string[];
  category: string;
  description?: string;
  yearsOfExperience?: number;
  relatedSkills?: string[];
}

export interface Language {
  language: string;
  fluency: string;
}

export interface Interest {
  name: string;
  keywords: string[];
}

export interface Reference {
  name: string;
  reference: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  sourceUrl?: string;
  highlights?: string[];
} 