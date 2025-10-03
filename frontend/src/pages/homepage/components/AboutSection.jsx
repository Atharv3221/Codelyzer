import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const AboutSection = () => {
  const features = [
  {
    id: 1,
    icon: 'Zap',
    title: 'Instant Setup',
    description: 'Clone and configure any GitHub repository in under 5 minutes with our automated workflow engine.',
    color: 'var(--color-warning)',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/20'
  },
  {
    id: 2,
    icon: 'Shield',
    title: 'Guided Contributions',
    description: 'Step-by-step guidance from repository analysis to pull request submission with best practices built-in.',
    color: 'var(--color-success)',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/20'
  },
  {
    id: 3,
    icon: 'Users',
    title: 'Community Support',
    description: 'Connect with maintainers and fellow contributors through our integrated community platform.',
    color: 'var(--color-primary)',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20'
  },
  {
    id: 4,
    icon: 'BarChart3',
    title: 'Impact Tracking',
    description: 'Monitor your contribution journey with detailed analytics and achievement milestones.',
    color: 'var(--color-secondary)',
    bgColor: 'bg-secondary/10',
    borderColor: 'border-secondary/20'
  },
  {
    id: 5,
    icon: 'Code',
    title: 'Smart Analysis',
    description: 'AI-powered repository analysis identifies the best contribution opportunities for your skill level.',
    color: 'var(--color-trust-indigo)',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20'
  },
  {
    id: 6,
    icon: 'Rocket',
    title: 'Career Growth',
    description: 'Build your developer portfolio with meaningful contributions to high-impact open source projects.',
    color: 'var(--color-brand-orange)',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20'
  }];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
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
          className="text-center mb-16">

          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20 mb-6">
            <Icon name="Sparkles" size={16} />
            <span>Why Choose ContribHub</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Contribution Without{' '}
            <span className="bg-gradient-mentorship bg-clip-text">Complexity

            </span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            We remove the technical barriers that prevent developers from contributing to open source projects. 
            Focus on writing great code, not wrestling with setup configurations.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features?.map((feature) =>
          <motion.div
            key={feature?.id}
            variants={itemVariants}
            className={`${feature?.bgColor} ${feature?.borderColor} border rounded-2xl p-8 hover-lift transition-smooth group cursor-pointer`}>

              <div className="space-y-4">
                {/* Icon */}
                <div className={`w-14 h-14 ${feature?.bgColor} rounded-xl flex items-center justify-center border ${feature?.borderColor} group-hover:scale-110 transition-smooth`}>
                  <Icon name={feature?.icon} size={24} color={feature?.color} />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-smooth">
                    {feature?.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature?.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center space-x-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-smooth">
                  <span>Learn more</span>
                  <Icon name="ArrowRight" size={16} />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16">

          <div className="bg-gradient-contribution rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-32 h-32 border border-white rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 border border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white rounded-full"></div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold">
                Ready to Make Your First Contribution?
              </h3>
              <p className="text-xl opacity-90 leading-relaxed">
                Join thousands of developers who have simplified their open source journey with ContribHub. 
                Start contributing to meaningful projects today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/contribute">
                  <button className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-smooth hover-lift flex items-center justify-center space-x-2">
                    <Icon name="GitPullRequest" size={20} />
                    <span>Start Contributing</span>
                  </button>
                </Link>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-smooth hover-lift flex items-center justify-center space-x-2">
                  <Icon name="BookOpen" size={20} />
                  <span>View Documentation</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default AboutSection;