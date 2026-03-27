import React from 'react'
import { personalInfo, socialLinks } from '../data'
import { GithubIcon, LinkedInIcon, TwitterIcon, WechatIcon, ChevronDownIcon } from './Icons'
import { useScrollAnimation } from '../hooks'

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  github: GithubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  wechat: WechatIcon,
}

const Hero: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div
        ref={ref}
        className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="mb-8 relative inline-block">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden gradient-border mx-auto">
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-dark-bg flex items-center justify-center">
            <span className="text-white text-lg">👋</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-balance">
          <span className="text-white">你好，我是</span>
          <br />
          <span className="gradient-text">{personalInfo.name}</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-4">
          {personalInfo.title}
        </p>

        <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
          {personalInfo.bio}
        </p>

        <div className="flex items-center justify-center space-x-4 mb-12">
          {socialLinks.map((social) => {
            const IconComponent = iconMap[social.icon]
            return (
              <a
                key={social.name}
                href={social.url || '#'}
                target={social.url ? '_blank' : undefined}
                rel={social.url ? 'noopener noreferrer' : undefined}
                className="w-12 h-12 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500 transition-all duration-300 hover:scale-110"
                aria-label={social.name}
              >
                {IconComponent && <IconComponent className="w-5 h-5" />}
              </a>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-3 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full text-white font-medium hover:opacity-90 transition-opacity min-w-[160px]"
          >
            查看项目
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-gray-600 rounded-full text-white font-medium hover:border-primary-500 hover:text-primary-500 transition-colors min-w-[160px]"
          >
            联系我
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" aria-label="向下滚动">
            <ChevronDownIcon className="w-8 h-8 text-gray-400" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
