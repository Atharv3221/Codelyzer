import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const IntegrationSection = () => {
  // Mock popular projects that recommend ContribHub
  const featuredProjects = [
    {
      id: 1,
      name: 'React',
      description: 'A JavaScript library for building user interfaces',
      logo: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100',
      stars: '218k',
      contributors: '1.5k',
      language: 'JavaScript',
      difficulty: 'Intermediate',
      category: 'Frontend Framework',
      maintainer: 'Facebook',
      lastUpdate: '2 hours ago',
      contributionTypes: ['Bug fixes', 'Documentation', 'Features'],
      badge: 'ContribHub Verified'
    },
    {
      id: 2,
      name: 'Vue.js',
      description: 'The Progressive JavaScript Framework',
      logo: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=100',
      stars: '205k',
      contributors: '892',
      language: 'TypeScript',
      difficulty: 'Beginner',
      category: 'Frontend Framework',
      maintainer: 'Evan You',
      lastUpdate: '5 hours ago',
      contributionTypes: ['Documentation', 'Examples', 'Bug fixes'],
      badge: 'Beginner Friendly'
    },
    {
      id: 3,
      name: 'Node.js',
      description: 'Node.js JavaScript runtime built on Chrome\'s V8 JavaScript engine',
      logo: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=100',
      stars: '98k',
      contributors: '3.2k',
      language: 'C++',
      difficulty: 'Advanced',
      category: 'Runtime',
      maintainer: 'Node.js Foundation',
      lastUpdate: '1 hour ago',
      contributionTypes: ['Core features', 'Performance', 'Security'],
      badge: 'High Impact'
    },
    {
      id: 4,
      name: 'TensorFlow',
      description: 'An Open Source Machine Learning Framework for Everyone',
      logo: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=100',
      stars: '182k',
      contributors: '4.1k',
      language: 'Python',
      difficulty: 'Advanced',
      category: 'Machine Learning',
      maintainer: 'Google',
      lastUpdate: '3 hours ago',
      contributionTypes: ['Models', 'Documentation', 'Examples'],
      badge: 'Research Impact'
    },
    {
      id: 5,
      name: 'Django',
      description: 'The Web framework for perfectionists with deadlines',
      logo: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=100',
      stars: '75k',
      contributors: '2.8k',
      language: 'Python',
      difficulty: 'Intermediate',
      category: 'Web Framework',
      maintainer: 'Django Software Foundation',
      lastUpdate: '6 hours ago',
      contributionTypes: ['Features', 'Bug fixes', 'Documentation'],
      badge: 'Community Favorite'
    },
    {
      id: 6,
      name: 'Kubernetes',
      description: 'Production-Grade Container Orchestration',
      logo: 'https://images.unsplash.com/photo-1605745341112-85968b19335a?w=100',
      stars: '106k',
      contributors: '6.7k',
      language: 'Go',
      difficulty: 'Expert',
      category: 'DevOps',
      maintainer: 'CNCF',
      lastUpdate: '30 minutes ago',
      contributionTypes: ['Infrastructure', 'Security', 'Performance'],
      badge: 'Enterprise Ready'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'var(--color-success)';
      case 'Intermediate': return 'var(--color-warning)';
      case 'Advanced': return 'var(--color-brand-orange)';
      case 'Expert': return 'var(--color-destructive)';
      default: return 'var(--color-text-secondary)';
    }
  };

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'ContribHub Verified': return 'bg-primary/10 text-primary border-primary/20';
      case 'Beginner Friendly': return 'bg-success/10 text-success border-success/20';
      case 'High Impact': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'Research Impact': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'Community Favorite': return 'bg-pink-500/10 text-pink-600 border-pink-500/20';
      case 'Enterprise Ready': return 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20';
      default: return 'bg-muted text-text-secondary border-border';
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium border border-secondary/20 mb-6">
            <Icon name="Award" size={16} />
            <span>Trusted by Leading Projects</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Projects That{' '}
            <span className="bg-gradient-mentorship bg-clip-text text-transparent">
              Recommend Us
            </span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Top open source projects trust ContribHub to onboard new contributors. 
            Join the ecosystem that's shaping the future of software development.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {featuredProjects?.map((project, index) => (
            <motion.div
              key={project?.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover-lift transition-smooth group cursor-pointer"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                      <Image
                        src={project?.logo}
                        alt={project?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-smooth">
                        {project?.name}
                      </h3>
                      <p className="text-sm text-text-secondary">{project?.maintainer}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium border ${getBadgeStyle(project?.badge)}`}>
                    {project?.badge}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                  {project?.description}
                </p>

                {/* Stats */}
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} />
                    <span>{project?.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>{project?.contributors}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span>{project?.language}</span>
                  </div>
                </div>

                {/* Difficulty & Category */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-secondary">Difficulty:</span>
                    <span 
                      className="text-xs font-medium"
                      style={{ color: getDifficultyColor(project?.difficulty) }}
                    >
                      {project?.difficulty}
                    </span>
                  </div>
                  <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded">
                    {project?.category}
                  </span>
                </div>

                {/* Contribution Types */}
                <div className="space-y-2">
                  <span className="text-xs text-text-secondary">Contribution opportunities:</span>
                  <div className="flex flex-wrap gap-1">
                    {project?.contributionTypes?.map((type, typeIndex) => (
                      <span
                        key={typeIndex}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <Icon name="Clock" size={12} />
                    <span>Updated {project?.lastUpdate}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-smooth">
                    <span>Start contributing</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Integration Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-contribution rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 right-8 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute bottom-8 left-8 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-3xl lg:text-4xl font-bold">
                    Powering the Open Source Ecosystem
                  </h3>
                  <p className="text-xl opacity-90 leading-relaxed">
                    ContribHub has facilitated over 12,000 successful contributions across 2,000+ repositories, 
                    helping developers build careers and projects gain momentum.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">98%</p>
                    <p className="text-sm opacity-80">Success Rate</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">5min</p>
                    <p className="text-sm opacity-80">Avg Setup Time</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">24/7</p>
                    <p className="text-sm opacity-80">Community Support</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">100+</p>
                    <p className="text-sm opacity-80">Partner Projects</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center lg:text-right space-y-6">
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold">Ready to Join?</h4>
                  <p className="opacity-90">
                    Start your contribution journey with projects that welcome new contributors.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
                  <button className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-smooth hover-lift flex items-center justify-center space-x-2">
                    <Icon name="Rocket" size={20} />
                    <span>Explore Projects</span>
                  </button>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-smooth hover-lift flex items-center justify-center space-x-2">
                    <Icon name="BookOpen" size={20} />
                    <span>Integration Guide</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntegrationSection;