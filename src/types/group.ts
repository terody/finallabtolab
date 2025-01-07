export interface Group {
  id: string;
  name: string;
  description: string;
  members: string[];
  category: string;
  image: string;
  memberCount: number;
  isPrivate: boolean;
}

export interface GroupPost extends Post {
  groupId: string;
}