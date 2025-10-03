import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentRepositories = ({ repositories, onSelectRepository }) => {
  if (!repositories || repositories?.length === 0) {
    return null;
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'text-success bg-success/10';
      case 'intermediate': return 'text-warning bg-warning/10';
      case 'advanced': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getLanguageIcon = (language) => {
    const icons = {
      'JavaScript': 'FileCode',
      'TypeScript': 'FileCode2',
      'Python': 'Code',
      'Java': 'Coffee',
      'React': 'Component',
      'Vue': 'Layers',
      'Angular': 'Triangle',
      'Node.js': 'Server',
      'Go': 'Zap',
      'Rust': 'Shield',
      'C++': 'Cpu',
      'PHP': 'Globe'
    };
    return icons?.[language] || 'Code';
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-card border border-border rounded-xl p-6 shadow-brand-soft">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={16} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Recent Repositories</h3>
              <p className="text-sm text-text-secondary">Continue where you left off</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreHorizontal"
            className="text-text-secondary hover:text-foreground"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repositories?.map((repo) => (
            <div
              key={repo?.id}
              className="border border-border rounded-lg p-4 hover:border-primary hover:shadow-brand-soft transition-smooth hover-lift cursor-pointer"
              onClick={() => onSelectRepository(repo)}
            >
              {/* Repository Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-contribution rounded-lg flex items-center justify-center">
                    <Icon name={getLanguageIcon(repo?.language)} size={18} color="white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{repo?.name}</h4>
                    <p className="text-sm text-text-secondary">{repo?.owner}</p>
                  </div>
                </div>
                
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(repo?.difficulty)}`}>
                  {repo?.difficulty}
                </div>
              </div>

              {/* Repository Description */}
              <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                {repo?.description}
              </p>

              {/* Repository Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} color="var(--color-text-secondary)" />
                    <span className="text-xs text-text-secondary">{repo?.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="GitFork" size={14} color="var(--color-text-secondary)" />
                    <span className="text-xs text-text-secondary">{repo?.forks}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full bg-${repo?.languageColor}`}></div>
                    <span className="text-xs text-text-secondary">{repo?.language}</span>
                  </div>
                </div>
                
                <span className="text-xs text-text-secondary">{repo?.lastWorked}</span>
              </div>

              {/* Progress Indicator */}
              {repo?.progress && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">Progress</span>
                    <span className="text-xs text-text-secondary">{repo?.progress?.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className="h-1.5 bg-gradient-contribution rounded-full transition-smooth"
                      style={{ width: `${repo?.progress?.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">{repo?.progress?.status}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="GitPullRequest"
                  iconPosition="left"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onSelectRepository(repo);
                  }}
                  className="flex-1"
                >
                  Continue
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  onClick={(e) => {
                    e?.stopPropagation();
                    window.open(repo?.url, '_blank');
                  }}
                  className="text-text-secondary hover:text-foreground"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {repositories?.filter(r => r?.progress?.percentage === 100)?.length}
              </div>
              <div className="text-sm text-text-secondary">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning mb-1">
                {repositories?.filter(r => r?.progress && r?.progress?.percentage > 0 && r?.progress?.percentage < 100)?.length}
              </div>
              <div className="text-sm text-text-secondary">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-secondary mb-1">
                {repositories?.length}
              </div>
              <div className="text-sm text-text-secondary">Total Repositories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentRepositories;