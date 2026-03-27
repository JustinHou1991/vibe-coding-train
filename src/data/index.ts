import { Project, Skill, SocialLink, Experience, Education } from '../types'

export const personalInfo = {
  name: '张三',
  title: '全栈开发工程师',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  bio: '热爱技术，专注于Web开发和用户体验设计。拥有5年以上的全栈开发经验，擅长React、TypeScript、Node.js等技术栈。致力于打造高性能、易用的数字产品，让技术为生活带来便利。',
  email: 'zhangsan@example.com',
  phone: '+86 138-0000-0000',
  location: '中国 · 北京',
}

export const experiences: Experience[] = [
  {
    title: '高级前端工程师',
    company: '科技有限公司',
    period: '2021 - 至今',
    description: '负责公司核心产品的前端架构设计和开发，带领团队完成多个大型项目。',
  },
  {
    title: '前端开发工程师',
    company: '互联网科技公司',
    period: '2019 - 2021',
    description: '参与电商平台的前端开发，优化页面性能，提升用户体验。',
  },
  {
    title: '初级开发工程师',
    company: '软件开发公司',
    period: '2018 - 2019',
    description: '参与企业级应用开发，学习并实践敏捷开发流程。',
  },
]

export const educations: Education[] = [
  {
    degree: '计算机科学与技术 学士',
    school: '某某大学',
    period: '2014 - 2018',
    description: '主修计算机科学，辅修设计艺术',
  },
]

export const skills: Skill[] = [
  { name: 'React', level: 95, category: 'technical' },
  { name: 'TypeScript', level: 90, category: 'technical' },
  { name: 'Node.js', level: 85, category: 'technical' },
  { name: 'Python', level: 80, category: 'technical' },
  { name: 'Tailwind CSS', level: 90, category: 'technical' },
  { name: 'PostgreSQL', level: 75, category: 'technical' },
  { name: 'UI/UX 设计', level: 85, category: 'design' },
  { name: 'Figma', level: 80, category: 'design' },
  { name: '响应式设计', level: 90, category: 'design' },
  { name: '团队协作', level: 95, category: 'soft' },
  { name: '项目管理', level: 85, category: 'soft' },
  { name: '沟通能力', level: 90, category: 'soft' },
]

export const projects: Project[] = [
  {
    id: '1',
    title: '电商平台系统',
    description: '基于React和Node.js开发的全栈电商平台，支持商品管理、购物车、订单处理等功能。',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project1',
    category: 'fullstack',
  },
  {
    id: '2',
    title: '任务管理应用',
    description: '使用React和TypeScript开发的任务管理工具，支持拖拽排序、标签分类、团队协作。',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop',
    tags: ['React', 'TypeScript', 'Firebase'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project2',
    category: 'frontend',
  },
  {
    id: '3',
    title: '数据可视化仪表盘',
    description: '企业级数据分析仪表盘，支持实时数据展示、图表交互、报表导出。',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    tags: ['React', 'D3.js', 'Python', 'PostgreSQL'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project3',
    category: 'fullstack',
  },
  {
    id: '4',
    title: '移动端社交应用',
    description: '基于React Native开发的社交应用，支持即时通讯、动态发布、好友系统。',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop',
    tags: ['React Native', 'Firebase', 'Node.js'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project4',
    category: 'mobile',
  },
  {
    id: '5',
    title: '个人博客系统',
    description: '使用Next.js开发的个人博客，支持Markdown写作、代码高亮、评论系统。',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=450&fit=crop',
    tags: ['Next.js', 'MDX', 'Tailwind CSS'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project5',
    category: 'frontend',
  },
  {
    id: '6',
    title: 'API网关服务',
    description: '高性能API网关，支持负载均衡、限流、认证授权、日志监控。',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
    tags: ['Go', 'Docker', 'Kubernetes', 'Redis'],
    githubUrl: 'https://github.com/example/project6',
    category: 'backend',
  },
]

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/zhangsan',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/zhangsan',
    icon: 'linkedin',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/zhangsan',
    icon: 'twitter',
  },
  {
    name: '微信',
    url: '',
    icon: 'wechat',
  },
]

export const categories = [
  { id: 'all', label: '全部' },
  { id: 'frontend', label: '前端' },
  { id: 'backend', label: '后端' },
  { id: 'fullstack', label: '全栈' },
  { id: 'mobile', label: '移动端' },
]
