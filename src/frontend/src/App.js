import { useState } from 'react';
import './App.css';

const Icon = ({ type, size = 24 }) => {
  const icons = {
    zap: <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    github: <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
    code: <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    gitPr: <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
    check: <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    checkmark: <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    arrow: <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>,
    sparkles: <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    spinner: <svg width={size} height={size} viewBox="0 0 24 24" style={{animation: 'spin 1s linear infinite'}}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"/></svg>,
    circle: <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={2} /></svg>
  };
  return icons[type] || null;
};

function App() {
  const [page, setPage] = useState('home');
  const [projectUrl, setProjectUrl] = useState('');
  const [status, setStatus] = useState('idle');
  const [projectInfo, setProjectInfo] = useState(null);

  const statusSteps = [
    { id: 'cloning', label: 'Cloning repository' },
    { id: 'analyzing', label: 'Running static analysis' },
    { id: 'fixing', label: 'Generating LLM fixes' },
    { id: 'pr', label: 'Creating pull requests' },
    { id: 'complete', label: 'Analysis complete' }
  ];

  const handleAnalyze = () => {
    if (!projectUrl.trim()) return;
    
    setStatus('cloning');
    setProjectInfo({
      name: projectUrl.split('/').pop().replace('.git', ''),
      url: projectUrl,
      startTime: new Date().toLocaleTimeString()
    });

    const stages = ['cloning', 'analyzing', 'fixing', 'pr', 'complete'];
    let currentStage = 0;

    const interval = setInterval(() => {
      currentStage++;
      if (currentStage < stages.length) {
        setStatus(stages[currentStage]);
      } else {
        clearInterval(interval);
      }
    }, 2500);
  };

  const getCurrentStepIndex = () => statusSteps.findIndex(step => step.id === status);

  if (page === 'home') {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
        color: 'white',
        padding: '4rem 2rem'
      }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ color: '#60a5fa', marginRight: '1rem' }}>
                <Icon type="zap" size={48} />
              </div>
              <h1 style={{ 
                fontSize: '3.75rem', 
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #60a5fa, #67e8f9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Codelyzer</h1>
            </div>
            <p style={{ fontSize: '1.5rem', color: '#cbd5e1', marginBottom: '1rem' }}>
              AI-Powered Static Analysis for Better Code
            </p>
            <p style={{ fontSize: '1.125rem', color: '#94a3b8', maxWidth: '42rem', margin: '0 auto', lineHeight: '1.75' }}>
              Connect your repository with advanced static analysis tools and LLM-powered fixes. 
              Codelyzer-Bot automatically identifies issues and raises pull requests to improve your codebase.
            </p>
          </div>

          {/* Features */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {[
              { icon: 'github', color: '#60a5fa', title: 'Smart Integration', desc: 'Simply provide your repository URL and let Codelyzer handle the rest. Works with any public repository.' },
              { icon: 'code', color: '#22d3ee', title: 'Deep Analysis', desc: 'Advanced static analysis tools scan your code for bugs, security issues, and code quality improvements.' },
              { icon: 'gitPr', color: '#c084fc', title: 'Automated Fixes', desc: 'LLM-powered fixes are generated and Codelyzer-Bot creates pull requests ready for your review.' }
            ].map((feature, i) => (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.borderColor = `${feature.color}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}>
                <div style={{ color: feature.color, marginBottom: '1rem' }}>
                  <Icon type={feature.icon} size={40} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{feature.title}</h3>
                <p style={{ color: '#94a3b8', lineHeight: '1.625' }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => setPage('main')} style={{
              background: '#3b82f6',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.5)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2563eb';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#3b82f6';
              e.currentTarget.style.transform = 'scale(1)';
            }}>
              Get Started
              <Icon type="arrow" size={20} />
            </button>
          </div>

          <div style={{ marginTop: '6rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
            <p>Powered by cutting-edge LLM APIs and static analysis tools</p>
          </div>
        </div>
      </div>
    );
  }

  // Main Page
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
      color: 'white',
      padding: '2rem'
    }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ color: '#60a5fa', marginRight: '0.5rem' }}>
              <Icon type="zap" size={32} />
            </div>
            <h1 style={{ 
              fontSize: '1.875rem', 
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #67e8f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Codelyzer</h1>
          </div>
          <button onClick={() => {
            setPage('home');
            setStatus('idle');
            setProjectUrl('');
            setProjectInfo(null);
          }} style={{
            background: 'transparent',
            color: '#94a3b8',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#94a3b8';
          }}>
            Back to Home
          </button>
        </div>

        {/* Input Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(4px)',
          borderRadius: '0.75rem',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Analyze Your Project</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
            Enter your repository URL to begin automated analysis and improvements
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              disabled={status !== 'idle' && status !== 'complete'}
              style={{
                flex: '1',
                minWidth: '300px',
                padding: '0.75rem 1rem',
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: 'white',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button
              onClick={handleAnalyze}
              disabled={!projectUrl.trim() || (status !== 'idle' && status !== 'complete')}
              style={{
                background: (!projectUrl.trim() || (status !== 'idle' && status !== 'complete')) ? '#334155' : '#3b82f6',
                color: 'white',
                padding: '0.75rem 2rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                border: 'none',
                cursor: (!projectUrl.trim() || (status !== 'idle' && status !== 'complete')) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (projectUrl.trim() && (status === 'idle' || status === 'complete')) {
                  e.currentTarget.style.background = '#2563eb';
                }
              }}
              onMouseLeave={(e) => {
                if (projectUrl.trim() && (status === 'idle' || status === 'complete')) {
                  e.currentTarget.style.background = '#3b82f6';
                }
              }}
            >
              Analyze
            </button>
          </div>
        </div>

        {/* Progress Section */}
        {status !== 'idle' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(4px)',
            borderRadius: '0.75rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Analysis Progress</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {statusSteps.map((step, index) => {
                const currentIndex = getCurrentStepIndex();
                const isComplete = index < currentIndex;
                const isCurrent = index === currentIndex;
                const isPending = index > currentIndex;

                return (
                  <div
                    key={step.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      transition: 'all 0.5s ease',
                      background: isCurrent ? 'rgba(59, 130, 246, 0.2)' : isComplete ? 'rgba(34, 197, 94, 0.1)' : 'rgba(30, 41, 59, 0.5)',
                      border: `1px solid ${isCurrent ? 'rgba(59, 130, 246, 0.5)' : isComplete ? 'rgba(34, 197, 94, 0.3)' : '#334155'}`,
                      transform: isCurrent ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    <div style={{ 
                      color: isCurrent ? '#60a5fa' : isComplete ? '#4ade80' : '#475569',
                      flexShrink: 0
                    }}>
                      {isCurrent ? (
                        <Icon type="spinner" size={24} />
                      ) : isComplete ? (
                        <Icon type="check" size={24} />
                      ) : (
                        <Icon type="circle" size={24} />
                      )}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <p style={{ 
                        fontWeight: '500',
                        color: isPending ? '#64748b' : 'white'
                      }}>
                        {step.label}
                      </p>
                    </div>

                    {isComplete && (
                      <div style={{ animation: 'pulse 2s infinite' }}>
                        <Icon type="checkmark" size={20} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Project Info */}
        {projectInfo && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(4px)',
            borderRadius: '0.75rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Project Information</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                background: 'rgba(30, 41, 59, 0.5)'
              }}>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Project Name</p>
                <p style={{ color: 'white', fontWeight: '500' }}>{projectInfo.name}</p>
              </div>
              
              <div style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                background: 'rgba(30, 41, 59, 0.5)'
              }}>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Repository URL</p>
                <p style={{ color: 'white', fontWeight: '500', wordBreak: 'break-all' }}>{projectInfo.url}</p>
              </div>
              
              <div style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                background: 'rgba(30, 41, 59, 0.5)'
              }}>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Analysis Started</p>
                <p style={{ color: 'white', fontWeight: '500' }}>{projectInfo.startTime}</p>
              </div>

              {status === 'complete' && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ color: '#4ade80', flexShrink: 0, marginTop: '0.125rem' }}>
                      <Icon type="check" size={20} />
                    </div>
                    <div>
                      <p style={{ color: '#4ade80', fontWeight: '600', marginBottom: '0.25rem' }}>Analysis Complete!</p>
                      <p style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: '1.5' }}>
                        Codelyzer-Bot has raised pull requests with suggested improvements. 
                        Check your repository for new PRs.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;