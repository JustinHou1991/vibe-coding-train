import React, { useState } from 'react'
import { personalInfo, socialLinks } from '../data'
import { useScrollAnimation } from '../hooks'
import {
  EmailIcon,
  PhoneIcon,
  LocationIcon,
  GithubIcon,
  LinkedInIcon,
  TwitterIcon,
  WechatIcon,
} from './Icons'

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  github: GithubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  wechat: WechatIcon,
}

const Contact: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2)
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation(0.1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setSubmitStatus('success')
    setIsSubmitting(false)
    setFormData({ name: '', email: '', message: '' })
    
    setTimeout(() => setSubmitStatus('idle'), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            联系<span className="gradient-text">我</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            如果您有任何问题或合作意向，欢迎随时与我联系
          </p>
        </div>

        <div
          ref={formRef}
          className={`grid md:grid-cols-2 gap-12 transition-all duration-700 delay-200 ${
            formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div>
            <h3 className="text-2xl font-bold mb-6">联系方式</h3>
            
            <div className="space-y-6">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 bg-dark-card rounded-xl border border-dark-border hover:border-primary-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all">
                  <EmailIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">邮箱</p>
                  <p className="text-white font-medium">{personalInfo.email}</p>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-4 p-4 bg-dark-card rounded-xl border border-dark-border hover:border-primary-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">电话</p>
                  <p className="text-white font-medium">{personalInfo.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-dark-card rounded-xl border border-dark-border">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                  <LocationIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">位置</p>
                  <p className="text-white font-medium">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-medium text-white mb-4">社交媒体</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = iconMap[social.icon]
                  return (
                    <a
                      key={social.name}
                      href={social.url || '#'}
                      target={social.url ? '_blank' : undefined}
                      rel={social.url ? 'noopener noreferrer' : undefined}
                      className="w-12 h-12 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500 hover:bg-primary-500/10 transition-all duration-300"
                      aria-label={social.name}
                    >
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="mt-8 p-6 bg-dark-card rounded-xl border border-dark-border">
              <h4 className="text-lg font-medium text-white mb-4">微信二维码</h4>
              <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-600 text-sm text-center px-2">
                  微信二维码
                  <br />
                  (待添加)
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">发送消息</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="请输入您的姓名"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  邮箱
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="请输入您的邮箱"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  消息内容
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="请输入您想说的话..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '发送中...' : '发送消息'}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-400 text-center">
                  消息发送成功！我会尽快回复您。
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-center">
                  发送失败，请稍后重试。
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
