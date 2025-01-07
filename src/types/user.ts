export type UserRole = 'admin' | 'lab' | 'professional';

export interface UserProfile {
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

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  read: boolean;
}