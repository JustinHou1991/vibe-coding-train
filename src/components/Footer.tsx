import React from 'react'
import { personalInfo, socialLinks } from '../data'
import { GithubIcon, LinkedInIcon, TwitterIcon } from './Icons'

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  github: GithubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-dark-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.slice(0, 3).map((social) => {
              const IconComponent = iconMap[social.icon]
              return (
                <a
                  key={social.name}
                  href={social.url || '#'}
                  target={social.url ? '_blank' : undefined}
                  rel={social.url ? 'noopener noreferrer' : undefined}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {IconComponent && <IconComponent className="w-5 h-5" />}
                </a>
              )
            })}
          </div>

          <div className="text-gray-500 text-sm">
            Made with ❤️ using React & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
