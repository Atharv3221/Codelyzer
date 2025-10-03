import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingTimeline = ({ currentStep, steps, error }) => {
  const getStepStatus = (stepIndex) => {
    if (error && stepIndex === currentStep) return 'error';
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const getStepIcon = (step, status) => {
    if (status === 'error') return 'AlertCircle';
    if (status === 'completed') return 'CheckCircle';
    if (status === 'active') return step?.activeIcon || step?.icon;
    return step?.icon;
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'var(--color-success)';
      case 'active': return 'var(--color-primary)';
      case 'error': return 'var(--color-error)';
      default: return 'var(--color-text-secondary)';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card border border-border rounded-xl p-8 shadow-brand-soft">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Processing Your Repository</h2>
          <p className="text-text-secondary">
            We're analyzing the repository and preparing your contribution environment
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
              <div>
                <h3 className="font-medium text-error">Processing Error</h3>
                <p className="text-sm text-error/80 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {steps?.map((step, index) => {
            const status = getStepStatus(index);
            const isLast = index === steps?.length - 1;

            return (
              <div key={step?.id} className="relative">
                {/* Timeline Line */}
                {!isLast && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
                )}
                <div className="flex items-start space-x-4">
                  {/* Step Icon */}
                  <div className={`
                    flex items-center justify-center w-12 h-12 rounded-full border-2 transition-smooth
                    ${status === 'completed' ? 'bg-success border-success' : ''}
                    ${status === 'active' ? 'bg-primary border-primary animate-pulse' : ''}
                    ${status === 'error' ? 'bg-error border-error' : ''}
                    ${status === 'pending' ? 'bg-muted border-border' : ''}
                  `}>
                    <Icon
                      name={getStepIcon(step, status)}
                      size={20}
                      color={status === 'pending' ? 'var(--color-text-secondary)' : 'white'}
                      strokeWidth={2}
                    />
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`
                        font-semibold transition-smooth
                        ${status === 'active' ? 'text-primary' : ''}
                        ${status === 'completed' ? 'text-success' : ''}
                        ${status === 'error' ? 'text-error' : ''}
                        ${status === 'pending' ? 'text-text-secondary' : ''}
                      `}>
                        {step?.title}
                      </h3>
                      
                      {/* Status Badge */}
                      <div className={`
                        px-2 py-1 rounded-full text-xs font-medium transition-smooth
                        ${status === 'completed' ? 'bg-success/10 text-success' : ''}
                        ${status === 'active' ? 'bg-primary/10 text-primary' : ''}
                        ${status === 'error' ? 'bg-error/10 text-error' : ''}
                        ${status === 'pending' ? 'bg-muted text-text-secondary' : ''}
                      `}>
                        {status === 'completed' && 'Completed'}
                        {status === 'active' && 'In Progress'}
                        {status === 'error' && 'Failed'}
                        {status === 'pending' && 'Pending'}
                      </div>
                    </div>

                    <p className="text-text-secondary text-sm mb-3">
                      {step?.description}
                    </p>

                    {/* Progress Details */}
                    {status === 'active' && step?.details && (
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-foreground">
                            {step?.details?.current}
                          </span>
                        </div>
                        {step?.details?.items && (
                          <ul className="text-xs text-text-secondary space-y-1 ml-4">
                            {step?.details?.items?.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-center space-x-2">
                                <Icon name="ArrowRight" size={12} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    {/* Completion Details */}
                    {status === 'completed' && step?.completedDetails && (
                      <div className="bg-success/5 border border-success/20 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                          <span className="text-sm font-medium text-success">
                            {step?.completedDetails?.summary}
                          </span>
                        </div>
                        {step?.completedDetails?.metrics && (
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            {step?.completedDetails?.metrics?.map((metric, metricIndex) => (
                              <div key={metricIndex} className="text-xs">
                                <span className="text-text-secondary">{metric?.label}: </span>
                                <span className="font-medium text-foreground">{metric?.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Error Details */}
                    {status === 'error' && step?.errorDetails && (
                      <div className="bg-error/5 border border-error/20 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="AlertCircle" size={16} color="var(--color-error)" />
                          <span className="text-sm font-medium text-error">
                            {step?.errorDetails?.message}
                          </span>
                        </div>
                        {step?.errorDetails?.suggestion && (
                          <p className="text-xs text-text-secondary mt-1">
                            {step?.errorDetails?.suggestion}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Progress */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm text-text-secondary">
              {error ? 'Failed' : `${currentStep}/${steps?.length} steps`}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-smooth ${
                error ? 'bg-error' : 'bg-gradient-contribution'
              }`}
              style={{
                width: error ? '100%' : `${(currentStep / steps?.length) * 100}%`
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingTimeline;