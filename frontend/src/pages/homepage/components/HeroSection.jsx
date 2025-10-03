import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [stats, setStats] = useState({
    contributions: 0,
    projects: 0,
    developers: 0
  });

  // Animate counters on mount
  useEffect(() => {
    const animateCounter = (target, key) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setStats((prev) => ({ ...prev, [key]: Math.floor(current) }));
      }, 30);
    };

    animateCounter(12847, 'contributions');
    animateCounter(2156, 'projects');
    animateCounter(8934, 'developers');
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium border border-secondary/20">

              <Icon name="Sparkles" size={16} />
              <span>Trusted by 8,000+ developers worldwide</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">

                Open Source,{' '}
                <span className="bg-gradient-contribution bg-clip-text">Simplified

                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl lg:text-2xl text-text-secondary leading-relaxed max-w-2xl">

                Contribute to GitHub effortlessly. Remove technical barriers and streamline your open source journey with guided workflows and automated setup.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4">

              <Link to="/contribute">
                <Button
                  variant="default"
                  size="lg"
                  iconName="GitPullRequest"
                  iconPosition="left"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-brand-medium hover-lift px-8 py-4 text-lg font-semibold">

                  Start Contributing Now
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center space-x-6 pt-4">

              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span>GitHub Verified</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Zap" size={16} color="var(--color-warning)" />
                <span>5-min Setup</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Users" size={16} color="var(--color-primary)" />
                <span>Active Community</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual - Animated Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative">

            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-brand-strong">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-success rounded-full animate-contribution-pulse"></div>
                  <span className="text-sm font-medium text-text-secondary">Live Platform Statistics</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="bg-gradient-contribution/10 rounded-xl p-6 border border-secondary/20">

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold text-foreground">{stats?.contributions?.toLocaleString()}</p>
                        <p className="text-sm text-text-secondary">Successful Contributions</p>
                      </div>
                      <Icon name="GitPullRequest" size={32} color="var(--color-secondary)" />
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.0, duration: 0.6 }}
                      className="bg-primary/10 rounded-xl p-4 border border-primary/20">

                      <p className="text-2xl font-bold text-foreground">{stats?.projects?.toLocaleString()}</p>
                      <p className="text-xs text-text-secondary">Active Projects</p>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className="bg-accent/10 rounded-xl p-4 border border-accent/20">

                      <p className="text-2xl font-bold text-foreground">{stats?.developers?.toLocaleString()}</p>
                      <p className="text-xs text-text-secondary">Contributors</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

};

export default HeroSection;