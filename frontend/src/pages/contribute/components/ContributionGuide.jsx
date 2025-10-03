import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContributionGuide = ({ repositoryData, onStartContribution }) => {
  const [activeTab, setActiveTab] = useState('setup');
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const toggleStepCompletion = (stepId) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted?.has(stepId)) {
      newCompleted?.delete(stepId);
    } else {
      newCompleted?.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const tabs = [
    { id: 'setup', label: 'Environment Setup', icon: 'Settings' },
    { id: 'guidelines', label: 'Contribution Guidelines', icon: 'FileText' },
    { id: 'workflow', label: 'Git Workflow', icon: 'GitBranch' },
    { id: 'testing', label: 'Testing & Quality', icon: 'TestTube' }
  ];

  const setupSteps = [
    {
      id: 'clone',
      title: 'Clone Repository',
      description: 'Get a local copy of the repository on your machine',
      command: `git clone ${repositoryData?.cloneUrl}`,
      type: 'command'
    },
    {
      id: 'navigate',
      title: 'Navigate to Directory',
      description: 'Change to the project directory',
      command: `cd ${repositoryData?.name}`,
      type: 'command'
    },
    {
      id: 'dependencies',
      title: 'Install Dependencies',
      description: 'Install all required project dependencies',
      command: repositoryData?.packageManager === 'npm' ? 'npm install' : 'yarn install',
      type: 'command'
    },
    {
      id: 'branch',
      title: 'Create Feature Branch',
      description: 'Create a new branch for your contribution',
      command: 'git checkout -b feature/your-feature-name',
      type: 'command'
    },
    {
      id: 'environment',
      title: 'Setup Environment',
      description: 'Configure environment variables and settings',
      command: 'cp .env.example .env',
      type: 'command',
      optional: true
    }
  ];

  const guidelines = [
    {
      id: 'code-style',
      title: 'Code Style Guidelines',
      items: [
        'Follow the existing code formatting and style',
        'Use meaningful variable and function names',
        'Add comments for complex logic',
        'Keep functions small and focused'
      ]
    },
    {
      id: 'commit-messages',
      title: 'Commit Message Format',
      items: [
        'Use conventional commit format: type(scope): description',
        'Keep the first line under 50 characters',
        'Use present tense: "Add feature" not "Added feature"',
        'Reference issues when applicable: "Fixes #123"'
      ]
    },
    {
      id: 'pull-requests',
      title: 'Pull Request Guidelines',
      items: [
        'Provide a clear description of changes',
        'Link to related issues',
        'Include screenshots for UI changes',
        'Ensure all tests pass before submitting'
      ]
    }
  ];

  const workflowSteps = [
    {
      id: 'fork',
      title: 'Fork the Repository',
      description: 'Create your own copy of the repository',
      action: 'Fork on GitHub'
    },
    {
      id: 'clone-fork',
      title: 'Clone Your Fork',
      description: 'Clone your forked repository locally',
      command: `git clone https://github.com/YOUR_USERNAME/${repositoryData?.name}.git`
    },
    {
      id: 'upstream',
      title: 'Add Upstream Remote',
      description: 'Add the original repository as upstream',
      command: `git remote add upstream ${repositoryData?.cloneUrl}`
    },
    {
      id: 'sync',
      title: 'Keep Fork Updated',
      description: 'Regularly sync with the upstream repository',
      command: 'git fetch upstream && git merge upstream/main'
    },
    {
      id: 'push',
      title: 'Push Changes',
      description: 'Push your changes to your fork',
      command: 'git push origin feature/your-feature-name'
    },
    {
      id: 'pr',
      title: 'Create Pull Request',
      description: 'Submit your changes for review',
      action: 'Create PR on GitHub'
    }
  ];

  const testingInfo = [
    {
      id: 'run-tests',
      title: 'Run Existing Tests',
      description: 'Ensure all existing tests pass',
      command: repositoryData?.testCommand || 'npm test'
    },
    {
      id: 'write-tests',
      title: 'Write New Tests',
      description: 'Add tests for your new functionality',
      guidelines: [
        'Write unit tests for new functions',
        'Add integration tests for new features',
        'Maintain or improve test coverage',
        'Test edge cases and error conditions'
      ]
    },
    {
      id: 'quality-checks',
      title: 'Quality Assurance',
      description: 'Run quality checks before submitting',
      commands: [
        { label: 'Linting', command: 'npm run lint' },
        { label: 'Type Check', command: 'npm run type-check' },
        { label: 'Build', command: 'npm run build' }
      ]
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'setup':
        return (
          <div className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Info" size={16} color="var(--color-primary)" />
                <span className="font-medium text-primary">Prerequisites</span>
              </div>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Git installed and configured</li>
                <li>• {repositoryData?.language} development environment</li>
                <li>• {repositoryData?.packageManager} package manager</li>
                <li>• Code editor (VS Code recommended)</li>
              </ul>
            </div>
            {setupSteps?.map((step) => (
              <div key={step?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => toggleStepCompletion(step?.id)}
                      className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-smooth
                        ${completedSteps?.has(step?.id) 
                          ? 'bg-success border-success' :'border-border hover:border-primary'
                        }
                      `}
                    >
                      {completedSteps?.has(step?.id) && (
                        <Icon name="Check" size={14} color="white" strokeWidth={3} />
                      )}
                    </button>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {step?.title}
                        {step?.optional && (
                          <span className="ml-2 text-xs text-text-secondary">(Optional)</span>
                        )}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1">{step?.description}</p>
                    </div>
                  </div>
                </div>

                {step?.command && (
                  <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                    <div className="flex items-center justify-between">
                      <code className="text-foreground">{step?.command}</code>
                      <button
                        onClick={() => copyToClipboard(step?.command)}
                        className="p-1 hover:bg-background rounded transition-smooth"
                      >
                        <Icon name="Copy" size={14} color="var(--color-text-secondary)" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'guidelines':
        return (
          <div className="space-y-6">
            {guidelines?.map((section) => (
              <div key={section?.id} className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">{section?.title}</h3>
                <ul className="space-y-2">
                  {section?.items?.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5" />
                      <span className="text-sm text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'workflow':
        return (
          <div className="space-y-4">
            {workflowSteps?.map((step, index) => (
              <div key={step?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{step?.title}</h3>
                    <p className="text-sm text-text-secondary mb-3">{step?.description}</p>
                    
                    {step?.command && (
                      <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                        <div className="flex items-center justify-between">
                          <code className="text-foreground">{step?.command}</code>
                          <button
                            onClick={() => copyToClipboard(step?.command)}
                            className="p-1 hover:bg-background rounded transition-smooth"
                          >
                            <Icon name="Copy" size={14} color="var(--color-text-secondary)" />
                          </button>
                        </div>
                      </div>
                    )}

                    {step?.action && (
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Icon name="ExternalLink" size={14} color="var(--color-primary)" />
                          <span className="text-sm font-medium text-primary">{step?.action}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'testing':
        return (
          <div className="space-y-6">
            {testingInfo?.map((section) => (
              <div key={section?.id} className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">{section?.title}</h3>
                <p className="text-sm text-text-secondary mb-4">{section?.description}</p>

                {section?.command && (
                  <div className="bg-muted rounded-lg p-3 font-mono text-sm mb-4">
                    <div className="flex items-center justify-between">
                      <code className="text-foreground">{section?.command}</code>
                      <button
                        onClick={() => copyToClipboard(section?.command)}
                        className="p-1 hover:bg-background rounded transition-smooth"
                      >
                        <Icon name="Copy" size={14} color="var(--color-text-secondary)" />
                      </button>
                    </div>
                  </div>
                )}

                {section?.commands && (
                  <div className="space-y-2 mb-4">
                    {section?.commands?.map((cmd, index) => (
                      <div key={index} className="bg-muted rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-foreground">{cmd?.label}</span>
                          <button
                            onClick={() => copyToClipboard(cmd?.command)}
                            className="p-1 hover:bg-background rounded transition-smooth"
                          >
                            <Icon name="Copy" size={12} color="var(--color-text-secondary)" />
                          </button>
                        </div>
                        <code className="text-sm text-text-secondary font-mono">{cmd?.command}</code>
                      </div>
                    ))}
                  </div>
                )}

                {section?.guidelines && (
                  <ul className="space-y-2">
                    {section?.guidelines?.map((guideline, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5" />
                        <span className="text-sm text-text-secondary">{guideline}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-card border border-border rounded-xl shadow-brand-soft overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-contribution p-6 text-white">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={24} color="white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Contribution Guide</h2>
              <p className="text-white/80">
                Everything you need to contribute to {repositoryData?.name}
              </p>
            </div>
          </div>

          {/* Repository Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Code" size={16} color="white" />
                <span className="text-sm font-medium">Language</span>
              </div>
              <span className="text-white/90">{repositoryData?.language}</span>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Package" size={16} color="white" />
                <span className="text-sm font-medium">Package Manager</span>
              </div>
              <span className="text-white/90">{repositoryData?.packageManager}</span>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Star" size={16} color="white" />
                <span className="text-sm font-medium">Difficulty</span>
              </div>
              <span className="text-white/90">{repositoryData?.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-smooth whitespace-nowrap
                  ${activeTab === tab?.id
                    ? 'border-primary text-primary bg-primary/5' :'border-transparent text-text-secondary hover:text-foreground hover:border-border'
                  }
                `}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>

        {/* Action Footer */}
        <div className="border-t border-border p-6 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-text-secondary">
                Progress: {completedSteps?.size}/{setupSteps?.length} setup steps completed
              </div>
              <div className="w-32 bg-border rounded-full h-2">
                <div
                  className="h-2 bg-gradient-contribution rounded-full transition-smooth"
                  style={{ width: `${(completedSteps?.size / setupSteps?.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <Button
              variant="default"
              size="lg"
              iconName="GitPullRequest"
              iconPosition="left"
              onClick={onStartContribution}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-brand-medium hover-lift"
            >
              Start Contributing Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionGuide;