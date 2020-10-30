interface Instagram {
  _id: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  display_name: string;
  id: string;
}

interface LinkedIn {
  _id: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  display_name: string;
  id: string;
}

interface Twitter {
  _id: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  display_name: string;
  id: string;
}

interface Github {
  _id: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  display_name: string;
  id: string;
}

export interface SocialApiData {
  _id: string;
  instagram: Instagram;
  linkedIn: LinkedIn;
  twitter: Twitter;
  github: Github;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}
