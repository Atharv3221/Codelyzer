import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';

const Homepage = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Lead Engineer',
      bio: 'Full-stack developer with 8+ years experience in open source projects. Former contributor to React and Vue ecosystems.',
      avatar: 'SC',
      gradient: 'bg-gradient-to-br from-blue-500 to-purple-600',
      social: {
        github: 'https://github.com/sarahchen',
        linkedin: 'https://linkedin.com/in/sarahchen',
        twitter: 'https://twitter.com/sarahchen'
      }
    },
    {
      id: 2,
      name: 'Alex Rodriguez',
      role: 'Product Designer',
      bio: 'UX/UI designer passionate about creating intuitive developer experiences. Previously at GitHub and GitLab.',
      avatar: 'AR',
      gradient: 'bg-gradient-to-br from-green-500 to-teal-600',
      social: {
        github: 'https://github.com/alexrod',
        linkedin: 'https://linkedin.com/in/alexrod',
        dribbble: 'https://dribbble.com/alexrod'
      }
    },
    {
      id: 3,
      name: 'Maria Kim',
      role: 'Community Manager',
      bio: 'Open source advocate and community builder. Helped onboard 1000+ developers to their first contributions.',
      avatar: 'MK',
      gradient: 'bg-gradient-to-br from-pink-500 to-rose-600',
      social: {
        github: 'https://github.com/mariakim',
        linkedin: 'https://linkedin.com/in/mariakim',
        twitter: 'https://twitter.com/mariakim'
      }
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'DevOps Engineer',
      bio: 'Infrastructure specialist focused on developer tooling and automation. Kubernetes and Docker expert.',
      avatar: 'DT',
      gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
      social: {
        github: 'https://github.com/davidthompson',
        linkedin: 'https://linkedin.com/in/davidthompson',
        website: 'https://davidthompson.dev'
      }
    }
  ];

  return (
    <>
      <Helmet>
        <title>ContribHub - Open Source, Simplified | Contribute to GitHub Effortlessly</title>
        <meta name="description" content="ContribHub removes technical barriers from open source contribution. Join 8,000+ developers contributing to meaningful projects with guided workflows and automated setup." />
        <meta name="keywords" content="open source, github, contribution, developer, programming, collaboration, community" />
        <meta property="og:title" content="ContribHub - Open Source, Simplified" />
        <meta property="og:description" content="Contribute to GitHub effortlessly with guided workflows and automated setup. Join thousands of developers making meaningful contributions." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ContribHub - Open Source, Simplified" />
        <meta name="twitter:description" content="Remove technical barriers from open source contribution. Start contributing to meaningful projects today." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <HeroSection />
          <AboutSection />
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Team Members */}
              {teamMembers?.map((member) => (
                <div key={member?.id} className="space-y-4 text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full ${member?.gradient} flex items-center justify-center text-white font-bold text-lg mb-4`}>
                    {member?.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{member?.name}</h3>
                    <p className="text-sm text-primary font-medium mb-3">{member?.role}</p>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">{member?.bio}</p>
                  </div>
                  <div className="flex justify-center space-x-3">
                    {member?.social?.github && (
                      <a href={member?.social?.github} className="text-text-secondary hover:text-primary transition-smooth" target="_blank" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {member?.social?.linkedin && (
                      <a href={member?.social?.linkedin} className="text-text-secondary hover:text-primary transition-smooth" target="_blank" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {member?.social?.twitter && (
                      <a href={member?.social?.twitter} className="text-text-secondary hover:text-primary transition-smooth" target="_blank" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                    {member?.social?.dribbble && (
                      <a href={member?.social?.dribbble} className="text-text-secondary hover:text-primary transition-smooth" target="_blank" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.5 2.252 3.5 2.273 5.698-.653-.126-7.512-1.419-7.512-1.419-.126-.252-.252-.504-.378-.756 1.916-2.902 2.902-5.175 2.902-5.175l2.715 1.652zm-2.463-1.904S15.65 5.428 13.748 8.33c-1.777-1.777-3.806-3.302-4.459-3.806 1.777-.756 3.806-1.126 5.816-1.126zM7.568 4.330c.504.378 2.273 1.777 4.082 3.554C9.337 9.085 7.064 10.610 7.064 10.610s-.126-3.680.504-6.280zm-.630 7.694c0-.126 0-.252.126-.378 0 0 2.525-1.651 4.964-3.680.378.756.630 1.512.882 2.273-3.176 1.4-5.972 1.785-5.972 1.785zm1.274 1.778c1.274-.126 3.428-.378 6.226-1.526.504 2.147.756 4.546.756 4.546-1.777 1.274-4.294 1.777-6.982 1.777v-4.797zm8.632.882s-.252-2.273-.756-4.420c.756-.126 7.008 1.274 7.008 1.274-.378 2.525-1.4 4.798-2.902 6.604-1.148-.378-2.273-.756-3.35-1.148z"/>
                        </svg>
                      </a>
                    )}
                    {member?.social?.website && (
                      <a href={member?.social?.website} className="text-text-secondary hover:text-primary transition-smooth" target="_blank" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="2" y1="12" x2="22" y2="12"/>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom */}
            <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-text-secondary">
                © {new Date()?.getFullYear()} ContribHub. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-text-secondary">
                <span>Made with ❤️ for the open source community</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;