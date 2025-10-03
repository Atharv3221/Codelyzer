import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContributionSuccess = ({ repositoryData, contributionData, onStartNew, onViewDashboard }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    setShowConfetti(true);
    
    // Mock achievements based on contribution
    const mockAchievements = [
      {
        id: 'first-contribution',
        title: 'First Contribution',
        description: 'Made your first open source contribution',
        icon: 'Trophy',
        earned: contributionData?.isFirstContribution
      },
      {
        id: 'code-reviewer',
        title: 'Code Reviewer',
        description: 'Reviewed and improved code quality',
        icon: 'Eye',
        earned: contributionData?.type === 'code-review'
      },
      {
        id: 'bug-hunter',
        title: 'Bug Hunter',
        description: 'Fixed a critical bug',
        icon: 'Bug',
        earned: contributionData?.type === 'bug-fix'
      },
      {
        id: 'documentation-hero',
        title: 'Documentation Hero',
        description: 'Improved project documentation',
        icon: 'FileText',
        earned: contributionData?.type === 'documentation'
      }
    ]?.filter(achievement => achievement?.earned);

    setAchievements(mockAchievements);

    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [contributionData]);

  const shareOptions = [
    {
      platform: 'Twitter',
      icon: 'Twitter',
      color: 'text-blue-500',
      url: `https://twitter.com/intent/tweet?text=Just made a contribution to ${repositoryData?.name} using @ContribHub! 🚀 Open source made simple. %23OpenSource %23GitHub`
    },
    {
      platform: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-600',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(repositoryData?.url)}`
    },
    {
      platform: 'GitHub',
      icon: 'Github',
      color: 'text-gray-800',
      url: contributionData?.pullRequestUrl
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)]?.map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: ['#ff6b35', '#2563eb', '#10b981', '#f59e0b']?.[Math.floor(Math.random() * 4)]
              }}
            >
              <div className="w-2 h-2 rounded-full"></div>
            </div>
          ))}
        </div>
      )}
      <div className="bg-card border border-border rounded-xl shadow-brand-strong overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-contribution p-8 text-white text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 animate-contribution-pulse">
            <Icon name="CheckCircle" size={32} color="white" strokeWidth={2} />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Contribution Successful! 🎉</h1>
          <p className="text-white/90 text-lg">
            Your contribution to <span className="font-semibold">{repositoryData?.name}</span> has been submitted
          </p>
        </div>

        {/* Contribution Details */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Pull Request Info */}
            <div className="bg-success/5 border border-success/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                  <Icon name="GitPullRequest" size={20} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Pull Request Created</h3>
                  <p className="text-sm text-text-secondary">#{contributionData?.pullRequestNumber}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Status:</span>
                  <span className="text-sm font-medium text-success">Open</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Files Changed:</span>
                  <span className="text-sm font-medium text-foreground">{contributionData?.filesChanged}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Lines Added:</span>
                  <span className="text-sm font-medium text-success">+{contributionData?.linesAdded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Lines Removed:</span>
                  <span className="text-sm font-medium text-error">-{contributionData?.linesRemoved}</span>
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Contribution Impact</h3>
                  <p className="text-sm text-text-secondary">Your positive impact</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Contribution Type:</span>
                  <span className="text-sm font-medium text-foreground capitalize">{contributionData?.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Estimated Impact:</span>
                  <span className="text-sm font-medium text-primary">{contributionData?.impact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Community Reach:</span>
                  <span className="text-sm font-medium text-foreground">{repositoryData?.stars} developers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Time Saved:</span>
                  <span className="text-sm font-medium text-success">{contributionData?.timeSaved}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          {achievements?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <Icon name="Award" size={20} color="var(--color-brand-orange)" />
                <span>Achievements Unlocked</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements?.map((achievement) => (
                  <div
                    key={achievement?.id}
                    className="bg-brand-orange/5 border border-brand-orange/20 rounded-lg p-4 animate-progressive-reveal"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center">
                        <Icon name={achievement?.icon} size={20} color="white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{achievement?.title}</h4>
                        <p className="text-sm text-text-secondary">{achievement?.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">What happens next?</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-white">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Review Process</h4>
                  <p className="text-sm text-text-secondary">
                    Project maintainers will review your pull request and provide feedback
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-white">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Collaboration</h4>
                  <p className="text-sm text-text-secondary">
                    Engage with reviewers, address feedback, and iterate on your changes
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-white">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Merge & Celebrate</h4>
                  <p className="text-sm text-text-secondary">
                    Once approved, your contribution becomes part of the project forever
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Share Success */}
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Share Your Success</h3>
            <p className="text-text-secondary mb-6">
              Let the world know about your contribution to open source!
            </p>
            
            <div className="flex items-center justify-center space-x-4">
              {shareOptions?.map((option) => (
                <a
                  key={option?.platform}
                  href={option?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    flex items-center space-x-2 px-4 py-2 border border-border rounded-lg 
                    hover:border-primary hover:shadow-brand-soft transition-smooth hover-lift
                    ${option?.color}
                  `}
                >
                  <Icon name={option?.icon} size={16} />
                  <span className="text-sm font-medium">{option?.platform}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              size="lg"
              iconName="ExternalLink"
              iconPosition="left"
              onClick={() => window.open(contributionData?.pullRequestUrl, '_blank')}
              className="flex-1"
            >
              View Pull Request
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              iconName="BarChart3"
              iconPosition="left"
              onClick={onViewDashboard}
              className="flex-1"
            >
              View Dashboard
            </Button>
            
            <Button
              variant="default"
              size="lg"
              iconName="Plus"
              iconPosition="left"
              onClick={onStartNew}
              className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-brand-medium hover-lift"
            >
              Start New Contribution
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionSuccess;