export interface CvJob {
  is_actual: boolean;
  _id: string;
  role: string;
  company: string;
  description: string;
  start_date: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
  end_date: string;
}

interface CvTechnology {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

interface CvTechnicalSkill {
  _id: string;
  name: string;
  technologies: CvTechnology[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

interface CvInterest {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

interface CvSideProject {
  is_ongoing: boolean;
  _id: string;
  description: string;
  name: string;
  is_visible: boolean;
  start_date: string;
  end_date: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

interface CvFormal {
  is_actual: boolean;
  _id: string;
  title: string;
  foundation: string;
  start_date: string;
  end_date: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

interface CvLanguage {
  _id: string;
  name: string;
  proficiency: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

interface CvEducation {
  _id: string;
  formal: CvFormal[];
  languages: CvLanguage[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

interface CvSeo {
  _id: string;
  title: string;
  description: string;
  __v: number;
  id: string;
}

export interface CvApiData {
  _id: string;
  career_summary: string;
  jobs: CvJob[];
  technical_skills: CvTechnicalSkill[];
  interests: CvInterest[];
  side_projects: CvSideProject[];
  education: CvEducation;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  summary: string;
  seo: CvSeo;
  id: string;
}
