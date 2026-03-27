import React from 'react'
import { skills, experiences, educations, personalInfo } from '../data'
import { useScrollAnimation } from '../hooks'
import { LocationIcon, CodeIcon } from './Icons'

const skillCategories = {
  technical: '技术技能',
  design: '设计技能',
  soft: '软技能',
}

const skillColors = {
  technical: 'from-primary-500 to-cyan-500',
  design: 'from-purple-500 to-pink-500',
  soft: 'from-green-500 to-emerald-500',
}

const About: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2)
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.1)
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation(0.1)

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            关于<span className="gradient-text">我</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            了解更多关于我的背景、技能和经历
          </p>
        </div>

        <div
          ref={contentRef}
          className={`grid md:grid-cols-2 gap-12 mb-20 transition-all duration-700 delay-200 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CodeIcon className="w-6 h-6 text-primary-500" />
              个人背景
            </h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                我是一名充满热情的全栈开发工程师，拥有5年以上的Web开发经验。
                专注于构建高性能、用户友好的数字产品，让技术为生活带来便利。
              </p>
              <div className="flex items-center gap-2 text-gray-400">
                <LocationIcon className="w-5 h-5" />
                <span>{personalInfo.location}</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4 text-white">工作经历</h4>
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l-2 border-dark-border hover:border-primary-500 transition-colors"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-dark-card border-2 border-primary-500" />
                    <h5 className="font-medium text-white">{exp.title}</h5>
                    <p className="text-sm text-primary-400">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.period}</p>
                    <p className="text-gray-400 text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4 text-white">教育背景</h4>
              <div className="space-y-4">
                {educations.map((edu, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l-2 border-dark-border hover:border-purple-500 transition-colors"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-dark-card border-2 border-purple-500" />
                    <h5 className="font-medium text-white">{edu.degree}</h5>
                    <p className="text-sm text-purple-400">{edu.school}</p>
                    <p className="text-sm text-gray-500">{edu.period}</p>
                    {edu.description && (
                      <p className="text-gray-400 text-sm mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={skillsRef}
            className={`transition-all duration-700 delay-300 ${
              skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-2xl font-bold mb-6">技能专长</h3>
            
            {(['technical', 'design', 'soft'] as const).map((category) => (
              <div key={category} className="mb-8">
                <h4 className="text-lg font-medium text-gray-300 mb-4">
                  {skillCategories[category]}
                </h4>
                <div className="space-y-3">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300">{skill.name}</span>
                          <span className="text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-dark-card rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${skillColors[category]} rounded-full transition-all duration-1000 ease-out`}
                            style={{
                              width: skillsVisible ? `${skill.level}%` : '0%',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}

            <div className="mt-8 p-6 bg-dark-card rounded-xl border border-dark-border">
              <h4 className="text-lg font-medium text-white mb-4">兴趣爱好</h4>
              <div className="flex flex-wrap gap-2">
                {['阅读', '摄影', '旅行', '音乐', '游戏', '健身'].map((hobby) => (
                  <span
                    key={hobby}
                    className="px-4 py-2 bg-dark-bg rounded-full text-gray-300 text-sm border border-dark-border hover:border-primary-500 transition-colors"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
