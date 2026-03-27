export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl?: string
  githubUrl?: string
  category: string
}

export interface Skill {
  name: string
  level: number
  category: 'technical' | 'design' | 'soft'
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface Experience {
  title: string
  company: string
  period: string
  description: string
}

export interface Education {
  degree: string
  school: string
  period: string
  description?: string
}
