import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import RepositoryInput from './components/RepositoryInput';
import AutomatedProcessingTimeline from './components/AutomatedProcessingTimeline';
import RecentRepositories from './components/RecentRepositories';
import ContributionSuccess from './components/ContributionSuccess';
import { analyzeAndContributeToRepository } from '../../services/aiService';

const ContributePage = () => {
  const [currentStep, setCurrentStep] = useState('input');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [processingError, setProcessingError] = useState(null);
  const [repositoryData, setRepositoryData] = useState(null);
  const [contributionData, setContributionData] = useState(null);

  // Mock recent repositories data
  const recentRepositories = [
    {
      id: 1,
      name: 'react',
      owner: 'facebook',
      description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
      url: 'https://github.com/facebook/react',
      language: 'JavaScript',
      languageColor: 'yellow-500',
      stars: '220k',
      forks: '45k',
      difficulty: 'Advanced',
      lastWorked: '2 days ago',
      progress: {
        percentage: 75,
        status: 'Environment setup completed'
      }
    },
    {
      id: 2,
      name: 'vue',
      owner: 'vuejs',
      description: 'Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.',
      url: 'https://github.com/vuejs/vue',
      language: 'TypeScript',
      languageColor: 'blue-500',
      stars: '206k',
      forks: '33k',
      difficulty: 'Intermediate',
      lastWorked: '1 week ago',
      progress: {
        percentage: 100,
        status: 'Contribution completed'
      }
    },
    {
      id: 3,
      name: 'awesome-react',
      owner: 'enaqx',
      description: 'A collection of awesome things regarding React ecosystem.',
      url: 'https://github.com/enaqx/awesome-react',
      language: 'Markdown',
      languageColor: 'gray-500',
      stars: '62k',
      forks: '7k',
      difficulty: 'Beginner',
      lastWorked: '3 days ago',
      progress: {
        percentage: 25,
        status: 'Repository cloned'
      }
    },
    {
      id: 4,
      name: 'node',
      owner: 'nodejs',
      description: 'Node.js JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
      url: 'https://github.com/nodejs/node',
      language: 'C++',
      languageColor: 'pink-500',
      stars: '104k',
      forks: '28k',
      difficulty: 'Advanced',
      lastWorked: '5 days ago',
      progress: {
        percentage: 50,
        status: 'Dependencies installed'
      }
    }
  ];

  // Updated automated processing steps with AI-powered contribution
  const automatedProcessingSteps = [
    {
      id: 'clone',
      title: 'Repository Cloning',
      description: 'Cloning repository and setting up secure environment',
      icon: 'Download',
      activeIcon: 'Loader2',
      details: {
        current: 'Cloning repository files...',
        items: [
          'Establishing secure connection to GitHub',
          'Downloading repository content',
          'Setting up isolated environment',
          'Verifying repository integrity'
        ]
      },
      completedDetails: {
        summary: 'Repository successfully cloned',
        metrics: [
          { label: 'Files downloaded', value: '1,247' },
          { label: 'Size', value: '23.4 MB' },
          { label: 'Clone time', value: '2.1s' },
          { label: 'Security scan', value: 'Passed' }
        ]
      }
    },
    {
      id: 'ai-analyze',
      title: 'AI Code Analysis',
      description: 'Advanced AI analyzing codebase structure and identifying contribution opportunities',
      icon: 'Brain',
      activeIcon: 'Loader2',
      details: {
        current: 'AI scanning codebase patterns...',
        items: [
          'Analyzing code structure and dependencies',
          'Identifying potential improvements',
          'Scanning for bugs and security issues',
          'Finding optimization opportunities',
          'Assessing code quality metrics'
        ]
      },
      completedDetails: {
        summary: 'AI analysis completed - opportunities found',
        metrics: [
          { label: 'Files analyzed', value: '1,247' },
          { label: 'Issues found', value: '23' },
          { label: 'Improvements', value: '15' },
          { label: 'AI confidence', value: '94%' }
        ]
      }
    },
    {
      id: 'ai-contribute',
      title: 'Automated Contribution',
      description: 'AI generating and implementing meaningful code contributions',
      icon: 'Code',
      activeIcon: 'Loader2',
      details: {
        current: 'AI creating contributions...',
        items: [
          'Generating optimized code solutions',
          'Implementing bug fixes automatically',
          'Adding comprehensive documentation',
          'Running automated tests',
          'Creating pull request'
        ]
      },
      completedDetails: {
        summary: 'AI contribution successfully created',
        metrics: [
          { label: 'Files modified', value: '8' },
          { label: 'Lines added', value: '156' },
          { label: 'Lines removed', value: '42' },
          { label: 'Tests passing', value: '100%' }
        ]
      }
    },
    {
      id: 'finalize',
      title: 'Contribution Complete',
      description: 'Pull request submitted and ready for review',
      icon: 'CheckCircle',
      completedDetails: {
        summary: 'AI-powered contribution completed',
        metrics: [
          { label: 'Status', value: 'Success' },
          { label: 'PR created', value: 'Yes' },
          { label: 'Time saved', value: '4+ hrs' },
          { label: 'Impact', value: 'High' }
        ]
      }
    }
  ];

  const handleRepositorySubmit = async (repoUrl) => {
    setIsProcessing(true);
    setCurrentStep('processing');
    setProcessingStep(0);
    setProcessingError(null);

    try {
      // Process through automated steps
      for (let i = 0; i < automatedProcessingSteps?.length; i++) {
        setProcessingStep(i);
        
        // Simulate step timing (real implementation would have actual processing)
        const stepDuration = i === 1 ? 3000 : i === 2 ? 4000 : 2000; // AI steps take longer
        await new Promise(resolve => setTimeout(resolve, stepDuration));
        
        // Simulate occasional errors (5% chance)
        if (Math.random() < 0.05 && i === 1) {
          setProcessingError('AI analysis encountered an error. Please try again or check your API key.');
          setIsProcessing(false);
          return;
        }
      }

      // Extract repository info from URL
      const urlParts = repoUrl?.replace('https://github.com/', '')?.split('/');
      const owner = urlParts?.[0];
      const name = urlParts?.[1];

      const mockRepositoryData = {
        name,
        owner,
        url: repoUrl,
        cloneUrl: repoUrl,
        description: `AI-analyzed repository: ${name}`,
        language: 'JavaScript', // Default for demo
        packageManager: 'npm',
        difficulty: 'Intermediate',
        stars: `${Math.floor(Math.random() * 100)}k`,
        forks: `${Math.floor(Math.random() * 20)}k`,
        testCommand: 'npm test',
        hasContributingGuide: true,
        goodFirstIssues: Math.floor(Math.random() * 15) + 1,
        lastCommit: '1 day ago'
      };

      setRepositoryData(mockRepositoryData);
      
      // Generate AI-powered contribution
      const aiContribution = await analyzeAndContributeToRepository(repoUrl, mockRepositoryData);
      setContributionData(aiContribution);
      
      setProcessingStep(automatedProcessingSteps?.length);
      setIsProcessing(false);
      setCurrentStep('success');
      
    } catch (error) {
      console.error('Error in automated contribution:', error);
      setProcessingError('Failed to generate AI contribution. Please check your OpenAI API key and try again.');
      setIsProcessing(false);
    }
  };

  const handleSelectRepository = async (repo) => {
    // Use existing repository data but trigger AI contribution
    const repoData = {
      name: repo?.name,
      owner: repo?.owner,
      url: repo?.url,
      cloneUrl: repo?.url,
      description: repo?.description,
      language: repo?.language,
      packageManager: 'npm',
      difficulty: repo?.difficulty,
      stars: repo?.stars,
      forks: repo?.forks,
      testCommand: 'npm test',
      hasContributingGuide: true,
      goodFirstIssues: Math.floor(Math.random() * 15) + 1,
      lastCommit: repo?.lastWorked
    };

    setRepositoryData(repoData);

    try {
      // Generate AI contribution for selected repo
      const aiContribution = await analyzeAndContributeToRepository(repo?.url, repoData);
      setContributionData(aiContribution);
      setCurrentStep('success');
    } catch (error) {
      console.error('Error generating AI contribution:', error);
      setProcessingError('Failed to generate AI contribution. Please check your OpenAI API key.');
    }
  };

  const handleRetryProcessing = () => {
    if (repositoryData?.url) {
      handleRepositorySubmit(repositoryData?.url);
    }
  };

  const handleStartNew = () => {
    setCurrentStep('input');
    setRepositoryData(null);
    setContributionData(null);
    setProcessingStep(0);
    setProcessingError(null);
    setIsProcessing(false);
  };

  const handleViewDashboard = () => {
    // Navigate to dashboard (would use router in real app)
    window.location.href = '/dashboard';
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'input':
        return (
          <>
            <RepositoryInput
              onSubmit={handleRepositorySubmit}
              isProcessing={isProcessing}
            />
            <RecentRepositories
              repositories={recentRepositories}
              onSelectRepository={handleSelectRepository}
            />
          </>
        );

      case 'processing':
        return (
          <AutomatedProcessingTimeline
            currentStep={processingStep}
            steps={automatedProcessingSteps}
            error={processingError}
            repositoryData={repositoryData}
            onRetry={handleRetryProcessing}
          />
        );

      case 'success':
        return (
          <ContributionSuccess
            repositoryData={repositoryData}
            contributionData={contributionData}
            onStartNew={handleStartNew}
            onViewDashboard={handleViewDashboard}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>AI-Powered Contribution - ContribHub | Automated Open Source</title>
        <meta name="description" content="Let AI automatically contribute to open source projects. Paste any GitHub repository URL and our AI will analyze, understand, and create meaningful contributions automatically." />
        <meta name="keywords" content="ai contribution, open source, github, automated contribution, ai development, gpt-5" />
        <meta property="og:title" content="AI-Powered Contribution - ContribHub" />
        <meta property="og:description" content="Revolutionize open source contribution with AI. Automated analysis, code generation, and pull request creation." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://contribhub.io/contribute" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-6">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-contribution rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                AI-Powered Open Source Contribution
              </h1>
              
              <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                Revolutionary AI automatically analyzes repositories, understands code patterns, 
                and creates meaningful contributions without any manual coding required.
              </p>
            </div>

            {/* Dynamic Content */}
            <div className="animate-progressive-reveal">
              {renderCurrentStep()}
            </div>

            {/* Help Section - Updated for AI */}
            {currentStep === 'input' && (
              <div className="mt-16 text-center">
                <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-teal-500/10 rounded-xl p-8 max-w-4xl mx-auto border border-purple-500/20">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    How AI Contribution Works
                  </h2>
                  <p className="text-text-secondary mb-6">
                    Our advanced AI powered by GPT-5 analyzes repositories, understands code patterns, 
                    and automatically generates meaningful contributions that improve the codebase.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">AI Analysis</h3>
                      <p className="text-sm text-text-secondary">
                        Deep codebase understanding and opportunity identification
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Auto Generation</h3>
                      <p className="text-sm text-text-secondary">
                        Intelligent code generation and optimization
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500/20 to-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Instant PR</h3>
                      <p className="text-sm text-text-secondary">
                        Automated pull request creation and submission
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ContributePage;