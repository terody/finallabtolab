export type UserRole = 'admin' | 'lab' | 'professional';

export interface UserProfileOld {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  title?: string;
  company?: string;
  certifications?: string[];
  createdAt: Date;
  lastLogin: Date;
  permissions?: {
    canManageUsers: boolean;
    canManageLabs: boolean;
    canManageContent: boolean;
    canViewAnalytics: boolean;
    canManageJobs: boolean;
    canManageMarketplace: boolean;
  };
}
  export interface UserProfile {
    id: string;
    role: UserRole;
    // Basic info from registration
    name: string;
    email: string;

    // Professional details
    title: string;
    company: string;
    certifications: string;
    yearsExperience: string;
    education: string;
    specializations: string[];
    currentSalary: string;
    desiredSalary: string;
    location: string;
    willingToRelocate: boolean;
    availabilityDate: string;
    workPreference: string;
    shiftPreference: string[];
    skills: string[];
    achievements: string[];
    professionalSummary: string;
    linkedinProfile: string;
    references: string[];
    keywords: string[];
    resumeFile: File | null;

    // Additional professional fields
    languagesSpoken: string[];
    publications: string[];
    presentations: string[];
    professionalMemberships: string[];
    volunteerExperience: string[];
    awards: string[];
    continuingEducation: string[];
    technicalSkills: string[];
    softSkills: string[];
    careerObjectives: string;
    preferredWorkEnvironment: string[];
    travelWillingness: string;
    securityClearance: string;
    professionalGoals: string;
  }

export const createProfessionalDataTable = `
  CREATE TABLE IF NOT EXISTS professionalData (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    certifications VARCHAR(255)[],
    yearsExperience VARCHAR(255) NOT NULL,
    education VARCHAR(255) NOT NULL,
    specializations VARCHAR(255)[],
    currentSalary VARCHAR(255) NOT NULL,
    desiredSalary VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    willingToRelocate BOOLEAN NOT NULL,
    availabilityDate VARCHAR(255) NOT NULL,
    workPreference VARCHAR(255) NOT NULL,
    shiftPreference VARCHAR(255)[],
    skills VARCHAR(255)[],
    achievements VARCHAR(255)[],
    professionalSummary VARCHAR(255) NOT NULL,
    linkedinProfile VARCHAR(255) NOT NULL,
    references VARCHAR(255)[],
    keywords VARCHAR(255)[],
    resumeFile BYTEA,
    languagesSpoken VARCHAR(255)[],
    publications VARCHAR(255)[],
    presentations VARCHAR(255)[],
    professionalMemberships VARCHAR(255)[],
    volunteerExperience VARCHAR(255)[],
    awards VARCHAR(255)[],
    continuingEducation VARCHAR(255)[],
    technicalSkills VARCHAR(255)[],
    softSkills VARCHAR(255)[],
    careerObjectives VARCHAR(255) NOT NULL,
    preferredWorkEnvironment VARCHAR(255)[],
    travelWillingness VARCHAR(255) NOT NULL,
    securityClearance VARCHAR(255) NOT NULL,
    professionalGoals VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
`;

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  read: boolean;
}
