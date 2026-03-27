import React, { useState } from 'react'
import { projects, categories } from '../data'
import { useScrollAnimation } from '../hooks'
import { ExternalLinkIcon, GithubIcon } from './Icons'

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2)
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation(0.1)

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="projects" className="py-20 md:py-32 bg-dark-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-12 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            项目<span className="gradient-text">展示</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            以下是我参与开发的一些项目，展示了我的技术能力和解决问题的思路
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white'
                  : 'bg-dark-card border border-dark-border text-gray-400 hover:text-white hover:border-gray-500'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div
          ref={projectsRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
            projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-dark-card rounded-xl overflow-hidden border border-dark-border hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary-500 rounded-lg text-white text-sm font-medium hover:bg-primary-600 transition-colors"
                    >
                      <ExternalLinkIcon className="w-4 h-4" />
                      演示
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg text-white text-sm font-medium hover:bg-gray-600 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      代码
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-dark-bg rounded-full text-xs text-gray-300 border border-dark-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            暂无该类别的项目
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
