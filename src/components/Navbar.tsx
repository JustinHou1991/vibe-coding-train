import React, { useState, useEffect } from 'react'
import { MenuIcon, CloseIcon } from './Icons'
import { useScrollPosition } from '../hooks'

const navLinks = [
  { href: '#home', label: '首页' },
  { href: '#about', label: '关于我' },
  { href: '#projects', label: '项目' },
  { href: '#contact', label: '联系' },
]

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const scrollPosition = useScrollPosition()
  const isScrolled = scrollPosition > 50

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-effect border-b border-dark-border py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
          >
            Portfolio
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={isOpen ? '关闭菜单' : '打开菜单'}
          >
            {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        <div
          className={`md:hidden fixed inset-0 top-[60px] bg-dark-bg/95 backdrop-blur-lg transition-all duration-300 ${
            isOpen
              ? 'opacity-100 visible'
              : 'opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-2xl font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
