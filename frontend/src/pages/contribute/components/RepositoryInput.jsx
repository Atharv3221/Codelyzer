import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RepositoryInput = ({ onSubmit, isProcessing }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [error, setError] = useState('');

  const validateGitHubUrl = (url) => {
    const githubPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/;
    return githubPattern?.test(url);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setError('');

    if (!repoUrl?.trim()) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    if (!validateGitHubUrl(repoUrl)) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo)');
      return;
    }

    onSubmit(repoUrl);
  };

  const handleInputChange = (e) => {
    setRepoUrl(e?.target?.value);
    if (error) setError('');
  };

  const quickActions = [
    {
      name: 'React Projects',
      url: 'https://github.com/facebook/react',
      icon: 'Code2',
      description: 'Popular React library'
    },
    {
      name: 'Vue.js',
      url: 'https://github.com/vuejs/vue',
      icon: 'Layers',
      description: 'Progressive framework'
    },
    {
      name: 'Node.js',
      url: 'https://github.com/nodejs/node',
      icon: 'Server',
      description: 'JavaScript runtime'
    },
    {
      name: 'TypeScript',
      url: 'https://github.com/microsoft/TypeScript',
      icon: 'FileCode',
      description: 'Typed JavaScript'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Input Section */}
      <div className="bg-card border border-border rounded-xl p-8 shadow-brand-soft">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-contribution rounded-full mb-4">
            <Icon name="Zap" size={24} color="white" strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">AI-Powered Contribution</h2>
          <p className="text-text-secondary">
            Paste any GitHub repository URL and our AI will automatically analyze, understand, and contribute meaningful improvements
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input
              label="GitHub Repository URL"
              type="url"
              placeholder="https://github.com/username/repository"
              value={repoUrl}
              onChange={handleInputChange}
              error={error}
              disabled={isProcessing}
              className="text-lg"
            />
            <div className="absolute right-3 top-9 text-text-secondary">
              <Icon name="Github" size={20} />
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isProcessing}
            iconName="Zap"
            iconPosition="left"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-brand-medium hover-lift"
          >
            {isProcessing ? 'AI Analyzing & Contributing...' : 'Clone & AI Contribute'}
          </Button>
        </form>

        {/* Help Text - Updated for AI */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
          <div className="flex items-start space-x-3">
            <Icon name="Brain" size={16} color="var(--color-purple-500)" className="mt-0.5" />
            <div className="text-sm text-text-secondary">
              <p className="font-medium text-foreground mb-1">AI Contribution Process:</p>
              <ul className="space-y-1">
                <li>• AI analyzes the entire repository structure and codebase</li>
                <li>• Identifies bugs, performance issues, and improvement opportunities</li>
                <li>• Automatically generates optimized code and documentation</li>
                <li>• Creates and submits pull request with detailed explanations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Try AI contribution on these popular repositories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.name}
              onClick={() => {
                setRepoUrl(action?.url);
                setError('');
              }}
              disabled={isProcessing}
              className="p-4 bg-card border border-border rounded-lg hover:border-primary hover:shadow-brand-soft transition-smooth hover-lift disabled:opacity-50 disabled:cursor-not-allowed text-left group"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                  <Icon name={action?.icon} size={16} color="var(--color-primary)" />
                </div>
                <span className="font-medium text-foreground">{action?.name}</span>
              </div>
              <p className="text-sm text-text-secondary group-hover:text-foreground transition-smooth">
                {action?.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepositoryInput;