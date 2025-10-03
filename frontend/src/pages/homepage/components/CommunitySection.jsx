import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CommunitySection = () => {
  const [activeTab, setActiveTab] = useState('feed');

  // Mock real-time contribution feed
  const contributionFeed = [
    {
      id: 1,
      user: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      action: 'merged pull request',
      project: 'react-hooks-library',
      projectUrl: 'https://github.com/react-hooks/library',
      time: '2 minutes ago',
      type: 'merge',
      impact: '+127 lines'
    },
    {
      id: 2,
      user: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      action: 'opened issue',
      project: 'vue-components',
      projectUrl: 'https://github.com/vue/components',
      time: '5 minutes ago',
      type: 'issue',
      impact: 'Bug report'
    },
    {
      id: 3,
      user: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      action: 'started contributing',
      project: 'nodejs-utils',
      projectUrl: 'https://github.com/nodejs/utils',
      time: '8 minutes ago',
      type: 'start',
      impact: 'First contribution'
    },
    {
      id: 4,
      user: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      action: 'reviewed code',
      project: 'python-ml-toolkit',
      projectUrl: 'https://github.com/ml/toolkit',
      time: '12 minutes ago',
      type: 'review',
      impact: '3 files reviewed'
    },
    {
      id: 5,
      user: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      action: 'fixed bug',
      project: 'css-framework',
      projectUrl: 'https://github.com/css/framework',
      time: '15 minutes ago',
      type: 'fix',
      impact: 'Critical fix'
    }
  ];

  // Mock testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Jennifer Park',
      role: 'Frontend Developer',
      company: 'TechCorp',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
      content: `ContribHub transformed my open source journey. I went from being intimidated by complex setups to contributing to 15+ projects in just 3 months. The guided workflow is a game-changer.`,
      rating: 5,
      contributions: 23,
      before: 'Struggled with Git workflows',
      after: 'Active contributor to major projects'
    },
    {
      id: 2,
      name: 'Michael Torres',
      role: 'Backend Engineer',
      company: 'StartupXYZ',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
      content: `The automated setup saved me hours of configuration time. Now I can focus on what I love - writing code and solving problems. My GitHub profile has never looked better!`,
      rating: 5,
      contributions: 41,
      before: 'Occasional contributor',
      after: 'Top 1% contributor in community'
    },
    {
      id: 3,
      name: 'Lisa Zhang',
      role: 'Full Stack Developer',
      company: 'InnovateLab',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      content: `As a bootcamp graduate, I was nervous about contributing to real projects. ContribHub's community support and step-by-step guidance gave me the confidence to make meaningful contributions.`,
      rating: 5,
      contributions: 18,
      before: 'New to open source',after: 'Confident contributor & mentor'
    }
  ];

  // Mock community metrics
  const metrics = [
    {
      label: 'Total Contributions',
      value: '12,847',
      change: '+23%',
      icon: 'GitPullRequest',
      color: 'var(--color-secondary)'
    },
    {
      label: 'Active Projects',
      value: '2,156',
      change: '+18%',
      icon: 'FolderOpen',
      color: 'var(--color-primary)'
    },
    {
      label: 'Community Members',
      value: '8,934',
      change: '+31%',
      icon: 'Users',
      color: 'var(--color-success)'
    },
    {
      label: 'Success Stories',
      value: '1,247',
      change: '+42%',
      icon: 'Trophy',
      color: 'var(--color-warning)'
    }
  ];

  const getActionIcon = (type) => {
    switch (type) {
      case 'merge': return 'GitMerge';
      case 'issue': return 'AlertCircle';
      case 'start': return 'Play';
      case 'review': return 'Eye';
      case 'fix': return 'Wrench';
      default: return 'GitPullRequest';
    }
  };

  const getActionColor = (type) => {
    switch (type) {
      case 'merge': return 'var(--color-secondary)';
      case 'issue': return 'var(--color-warning)';
      case 'start': return 'var(--color-primary)';
      case 'review': return 'var(--color-trust-indigo)';
      case 'fix': return 'var(--color-success)';
      default: return 'var(--color-text-secondary)';
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium border border-success/20 mb-6">
            <Icon name="Heart" size={16} />
            <span>Thriving Community</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Join a Community of{' '}
            <span className="bg-gradient-contribution bg-clip-text text-transparent">
              Innovators
            </span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Connect with developers worldwide, share knowledge, and build meaningful relationships 
            while contributing to projects that matter.
          </p>
        </motion.div>

        {/* Community Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {metrics?.map((metric, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 text-center hover-lift transition-smooth">
              <div className="w-12 h-12 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
                <Icon name={metric?.icon} size={24} color={metric?.color} />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">{metric?.value}</p>
                <p className="text-sm text-text-secondary">{metric?.label}</p>
                <div className="flex items-center justify-center space-x-1 text-xs text-success">
                  <Icon name="TrendingUp" size={12} />
                  <span>{metric?.change} this month</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-muted rounded-xl p-1 flex space-x-1">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-smooth ${
                activeTab === 'feed' ?'bg-card text-foreground shadow-brand-soft' :'text-text-secondary hover:text-foreground'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon name="Activity" size={16} />
                <span>Live Feed</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-smooth ${
                activeTab === 'testimonials' ?'bg-card text-foreground shadow-brand-soft' :'text-text-secondary hover:text-foreground'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon name="MessageSquare" size={16} />
                <span>Success Stories</span>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {activeTab === 'feed' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-success rounded-full animate-contribution-pulse"></div>
                    <h3 className="text-lg font-semibold text-foreground">Real-time Contribution Activity</h3>
                    <span className="text-sm text-text-secondary">Updated live</span>
                  </div>
                </div>
                
                <div className="divide-y divide-border">
                  {contributionFeed?.map((item) => (
                    <motion.div
                      key={item?.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: item?.id * 0.1 }}
                      className="p-6 hover:bg-muted/50 transition-smooth"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <Image
                            src={item?.avatar}
                            alt={item?.user}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-card border-2 border-card rounded-full flex items-center justify-center">
                            <Icon name={getActionIcon(item?.type)} size={10} color={getActionColor(item?.type)} />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-foreground">{item?.user}</span>
                            <span className="text-text-secondary">{item?.action}</span>
                            <a href={item?.projectUrl} className="text-primary hover:underline font-medium">
                              {item?.project}
                            </a>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-text-secondary">
                            <span>{item?.time}</span>
                            <span className="px-2 py-1 bg-muted rounded text-xs">{item?.impact}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="p-6 bg-muted/30 text-center">
                  <button className="text-primary hover:text-primary/80 font-medium text-sm flex items-center space-x-2 mx-auto">
                    <span>View all activity</span>
                    <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {testimonials?.map((testimonial) => (
                <motion.div
                  key={testimonial?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: testimonial?.id * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-8 hover-lift transition-smooth"
                >
                  <div className="space-y-6">
                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial?.rating)]?.map((_, i) => (
                        <Icon key={i} name="Star" size={16} color="var(--color-warning)" className="fill-current" />
                      ))}
                    </div>

                    {/* Content */}
                    <blockquote className="text-text-secondary leading-relaxed">
                      "{testimonial?.content}"
                    </blockquote>

                    {/* Before/After */}
                    <div className="space-y-3 p-4 bg-muted/50 rounded-xl">
                      <div className="flex items-center space-x-2 text-sm">
                        <Icon name="ArrowDown" size={14} color="var(--color-destructive)" />
                        <span className="text-text-secondary">Before: {testimonial?.before}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Icon name="ArrowUp" size={14} color="var(--color-success)" />
                        <span className="text-text-secondary">After: {testimonial?.after}</span>
                      </div>
                    </div>

                    {/* Author */}
                    <div className="flex items-center space-x-4 pt-4 border-t border-border">
                      <Image
                        src={testimonial?.avatar}
                        alt={testimonial?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{testimonial?.name}</p>
                        <p className="text-sm text-text-secondary">{testimonial?.role} at {testimonial?.company}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Icon name="GitPullRequest" size={12} color="var(--color-secondary)" />
                          <span className="text-xs text-text-secondary">{testimonial?.contributions} contributions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;