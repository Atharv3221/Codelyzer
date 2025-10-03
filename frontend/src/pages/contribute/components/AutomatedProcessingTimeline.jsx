import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AutomatedProcessingTimeline = ({ currentStep, steps, error, repositoryData, onRetry }) => {
  const [showDetails, setShowDetails] = useState({});

  const toggleDetails = (stepId) => {
    setShowDetails(prev => ({
      ...prev,
      [stepId]: !prev?.[stepId]
    }));
  };

  const getStepStatus = (index) => {
    if (error && index === currentStep) return 'error';
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'pending';
  };

  const getStatusIcon = (status, step) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={20} color="var(--color-success)" />;
      case 'active':
        return <Icon name={step?.activeIcon || 'Loader2'} size={20} color="var(--color-primary)" className="animate-spin" />;
      case 'error':
        return <Icon name="XCircle" size={20} color="var(--color-destructive)" />;
      default:
        return <Icon name={step?.icon} size={20} color="var(--color-text-secondary)" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'var(--color-success)';
      case 'active': return 'var(--color-primary)';
      case 'error': return 'var(--color-destructive)';
      default: return 'var(--color-border)';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card border border-border rounded-xl shadow-brand-soft overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-contribution p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={24} color="white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI-Powered Contribution</h2>
              <p className="text-white/80">
                Our AI is automatically analyzing and contributing to {repositoryData?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="p-6 bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              AI Processing Progress
            </span>
            <span className="text-sm text-text-secondary">
              {error ? 'Error occurred' : `${Math.min(currentStep + 1, steps?.length)}/${steps?.length} steps completed`}
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-3">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ 
                width: error ? '100%' : `${((currentStep + 1) / steps?.length) * 100}%`,
                backgroundColor: error ? 'var(--color-destructive)' : 'var(--color-success)'
              }}
              transition={{ duration: 0.5 }}
              className="h-3 rounded-full"
            />
          </div>
        </div>

        {/* Steps */}
        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="AlertCircle" size={20} color="var(--color-destructive)" className="mt-0.5" />
                <div>
                  <h3 className="font-semibold text-destructive mb-1">Processing Error</h3>
                  <p className="text-sm text-destructive/90">{error}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRetry}
                    className="mt-3"
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Retry AI Processing
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {steps?.map((step, index) => {
              const status = getStepStatus(index);
              const isActive = status === 'active';
              const isCompleted = status === 'completed';
              const hasError = status === 'error';

              return (
                <div key={step?.id} className="relative">
                  {/* Connecting Line */}
                  {index < steps?.length - 1 && (
                    <div 
                      className="absolute left-6 top-12 w-0.5 h-16 transition-smooth"
                      style={{ backgroundColor: getStatusColor(getStepStatus(index + 1)) }}
                    />
                  )}
                  {/* Step Container */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      flex items-start space-x-4 p-4 rounded-lg border transition-smooth
                      ${isActive ? 'border-primary bg-primary/5' : ''}
                      ${isCompleted ? 'border-success/30 bg-success/5' : ''}
                      ${hasError ? 'border-destructive/30 bg-destructive/5' : ''}
                      ${status === 'pending' ? 'border-border bg-muted/30' : ''}
                    `}
                  >
                    {/* Status Icon */}
                    <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-smooth"
                         style={{ borderColor: getStatusColor(status), backgroundColor: isCompleted ? 'var(--color-success)' : 'transparent' }}>
                      {getStatusIcon(status, step)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-semibold ${isActive ? 'text-primary' : isCompleted ? 'text-success' : hasError ? 'text-destructive' : 'text-foreground'}`}>
                          {step?.title}
                        </h3>
                        <button
                          onClick={() => toggleDetails(step?.id)}
                          className="p-1 hover:bg-background rounded transition-smooth"
                        >
                          <Icon 
                            name={showDetails?.[step?.id] ? 'ChevronUp' : 'ChevronDown'} 
                            size={16} 
                            color="var(--color-text-secondary)" 
                          />
                        </button>
                      </div>

                      <p className="text-text-secondary mb-3">{step?.description}</p>

                      {/* Active Step Details */}
                      {isActive && step?.details && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mb-3 p-3 bg-primary/5 rounded-lg border border-primary/20"
                        >
                          <p className="text-sm font-medium text-primary mb-2">
                            {step?.details?.current}
                          </p>
                          <div className="space-y-1">
                            {step?.details?.items?.map((item, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-primary rounded-full"></div>
                                <span className="text-xs text-text-secondary">{item}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Completed Step Metrics */}
                      {isCompleted && step?.completedDetails && showDetails?.[step?.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 p-3 bg-success/5 rounded-lg border border-success/20"
                        >
                          <p className="text-sm font-medium text-success mb-2">
                            {step?.completedDetails?.summary}
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            {step?.completedDetails?.metrics?.map((metric, idx) => (
                              <div key={idx} className="text-center">
                                <p className="text-lg font-bold text-success">{metric?.value}</p>
                                <p className="text-xs text-text-secondary">{metric?.label}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* AI Processing Insights */}
                      {step?.id === 'ai-analyze' && isActive && (
                        <div className="mt-3 p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
                          <div className="flex items-center space-x-2 mb-2">
                            <Icon name="Brain" size={16} color="var(--color-purple-500)" />
                            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                              AI Analysis in Progress
                            </span>
                          </div>
                          <p className="text-xs text-text-secondary">
                            Using GPT-5 to understand code patterns, identify improvement opportunities, and generate meaningful contributions automatically.
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Info */}
        {!error && (
          <div className="border-t border-border p-4 bg-muted/20">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Sparkles" size={16} color="var(--color-trust-indigo)" />
              <span className="text-sm text-text-secondary">
                AI is working in the background - no manual intervention required
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutomatedProcessingTimeline;