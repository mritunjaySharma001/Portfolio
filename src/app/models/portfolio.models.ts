export interface Profile {
  name: string;
  initials: string;
  title: string;
  roles: string[];
  location: string;
  email: string;
  linkedin: string;
  github?: string;
  photo: string;
  resume: string;
  tagline: string;
  summary: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export type SkillCategory = 'backend' | 'frontend' | 'data' | 'cloud' | 'ai' | 'practices';

export type SkillLevel = 'Expert' | 'Advanced' | 'Proficient';

export interface SkillGroup {
  title: string;
  icon: string;
  category: SkillCategory;
  skills: string[];
}

export interface AssistantAction {
  label: string;
  /** URL, `#section` anchor, or `copy:<text>` to copy to the clipboard. */
  href: string;
  download?: boolean;
}

export interface AssistantEntry {
  /** Keywords / short phrases that signal this intent. */
  intents: string[];
  answer: string;
  actions?: AssistantAction[];
}

export interface ArchNode {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  detail: string;
  points: string[];
}

export interface Role {
  title: string;
  period: string;
}

export interface Experience {
  company: string;
  location: string;
  period: string;
  current?: boolean;
  note?: string;
  roles: Role[];
  highlights: string[];
}

export interface Project {
  name: string;
  client?: string;
  period: string;
  stack: string[];
  summary: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  detail?: string;
}

export interface Training {
  title: string;
  org: string;
  period: string;
  detail: string;
}
