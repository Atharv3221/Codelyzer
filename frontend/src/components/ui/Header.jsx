import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Contribute', path: '/contribute', icon: 'GitPullRequest' },
  ];

  const secondaryItems = [
    { name: 'Documentation', path: '/docs', icon: 'BookOpen' },
    { name: 'Help', path: '/help', icon: 'HelpCircle' },
    { name: 'Settings', path: '/settings', icon: 'Settings' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Link to="/homepage" className="flex items-center space-x-3 hover-scale">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-contribution rounded-lg flex items-center justify-center">
                  <Icon name="GitBranch" size={18} color="white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-orange rounded-full animate-contribution-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground tracking-tight">ContribHub</span>
                <span className="text-xs text-text-secondary font-medium -mt-1">Open Source Made Simple</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.name}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth hover-lift ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-brand-soft'
                    : 'text-text-secondary hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Primary CTA */}
            <Link to="/contribute">
              <Button
                variant="default"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-brand-cta hover-lift"
              >
                Start Contributing
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              onClick={toggleMobileMenu}
              className="text-text-secondary hover:text-foreground"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-progressive-reveal">
            <div className="px-6 py-4 space-y-3">
              {/* Primary Navigation */}
              <div className="space-y-2">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.name}
                    to={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-secondary hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-border my-4"></div>

              {/* Secondary Navigation */}
              <div className="space-y-2">
                {secondaryItems?.map((item) => (
                  <Link
                    key={item?.name}
                    to={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="pt-4 space-y-3">
                <Link to="/contribute" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="default"
                    size="default"
                    iconName="Plus"
                    iconPosition="left"
                    fullWidth
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    Start Contributing Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;