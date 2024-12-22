export interface CVData {
  basics: {
    name: string;
    label: string;
    email: string;
    location: {
      city: string;
      country: string;
    };
  };
  profiles?: ProfileItem[]; // Optional property
  work: WorkItem[];
  education: EducationItem[];
  skills: Skill[];
  projects: Project[];
}

export interface ProfileItem {
  network: string;
  url: string;
}

export interface WorkItem {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
}

export interface EducationItem {
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

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  sourceUrl?: string;
  highlights?: string[];
}
