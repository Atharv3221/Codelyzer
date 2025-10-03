import OpenAI from 'openai';

/**
 * Initializes the OpenAI client with the API key from environment variables.
 * @returns {OpenAI} Configured OpenAI client instance.
 */
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage in React
});

/**
 * Analyzes repository code and generates contribution automatically.
 * @param {string} repositoryUrl - The repository URL to analyze.
 * @param {Object} repositoryData - Repository metadata.
 * @returns {Promise<Object>} AI analysis and contribution result.
 */
export async function analyzeAndContributeToRepository(repositoryUrl, repositoryData) {
  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-5',
      messages: [
        { 
          role: 'system', 
          content: `You are an expert open source contributor with deep knowledge of software development. You will analyze a repository and automatically generate meaningful contributions. Focus on:
          1. Code quality improvements
          2. Bug fixes
          3. Documentation enhancements
          4. Performance optimizations
          5. Adding useful features
          
          Generate realistic contribution data including files changed, lines added/removed, and PR details.` 
        },
        { 
          role: 'user', 
          content: `Analyze this repository and generate an automatic contribution:
          Repository: ${repositoryUrl}
          Name: ${repositoryData?.name}
          Owner: ${repositoryData?.owner}
          Language: ${repositoryData?.language}
          Description: ${repositoryData?.description}
          
          Provide a realistic contribution with specific details about what was improved.` 
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'contribution_result',
          schema: {
            type: 'object',
            properties: {
              contributionType: { 
                type: 'string',
                enum: ['bug-fix', 'feature', 'documentation', 'performance', 'refactor'],
                description: 'Type of contribution made'
              },
              title: { type: 'string', description: 'Pull request title' },
              description: { type: 'string', description: 'Detailed description of changes made' },
              filesChanged: { type: 'number', description: 'Number of files modified' },
              linesAdded: { type: 'number', description: 'Lines of code added' },
              linesRemoved: { type: 'number', description: 'Lines of code removed' },
              impact: { 
                type: 'string',
                enum: ['Low', 'Medium', 'High'],
                description: 'Impact level of the contribution'
              },
              technicalDetails: {
                type: 'array',
                items: { type: 'string' },
                description: 'List of technical improvements made'
              },
              estimatedTimeToComplete: { type: 'string', description: 'Time it would take to complete manually' },
              confidence: { type: 'number', minimum: 0.7, maximum: 1.0 }
            },
            required: ['contributionType', 'title', 'description', 'filesChanged', 'linesAdded', 'linesRemoved', 'impact', 'technicalDetails', 'estimatedTimeToComplete', 'confidence'],
            additionalProperties: false,
          },
        },
      },
      reasoning_effort: 'high',
      verbosity: 'medium',
    });

    const result = JSON.parse(response?.choices?.[0]?.message?.content);
    
    // Generate mock PR number
    const pullRequestNumber = Math.floor(Math.random() * 1000) + 1;
    const pullRequestUrl = `${repositoryUrl}/pull/${pullRequestNumber}`;
    
    return {
      pullRequestNumber,
      pullRequestUrl,
      filesChanged: result?.filesChanged,
      linesAdded: result?.linesAdded,
      linesRemoved: result?.linesRemoved,
      type: result?.contributionType,
      impact: result?.impact,
      timeSaved: result?.estimatedTimeToComplete,
      title: result?.title,
      description: result?.description,
      technicalDetails: result?.technicalDetails,
      confidence: result?.confidence,
      isFirstContribution: Math.random() < 0.3
    };
  } catch (error) {
    console.error('Error in AI repository analysis:', error);
    throw error;
  }
}

/**
 * Gets repository analysis using AI for better understanding.
 * @param {string} repositoryUrl - The repository URL to analyze.
 * @returns {Promise<Object>} Repository analysis result.
 */
export async function getRepositoryInsights(repositoryUrl) {
  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-5-mini',
      messages: [
        { 
          role: 'system', 
          content: 'You are an expert at analyzing GitHub repositories. Provide insights about the codebase structure, potential issues, and contribution opportunities.' 
        },
        { 
          role: 'user', 
          content: `Analyze this GitHub repository and provide insights: ${repositoryUrl}` 
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'repository_insights',
          schema: {
            type: 'object',
            properties: {
              codebaseHealthScore: { type: 'number', minimum: 0, maximum: 100 },
              primaryLanguageConfidence: { type: 'number', minimum: 0, maximum: 1 },
              potentialIssuesFound: { type: 'number' },
              contributionOpportunities: {
                type: 'array',
                items: { type: 'string' },
                description: 'List of areas where contributions would be valuable'
              },
              complexity: { 
                type: 'string',
                enum: ['Beginner', 'Intermediate', 'Advanced'],
                description: 'Overall complexity of the project'
              },
              recommendedContributionTypes: {
                type: 'array',
                items: { 
                  type: 'string',
                  enum: ['documentation', 'bug-fixes', 'features', 'testing', 'performance']
                }
              }
            },
            required: ['codebaseHealthScore', 'primaryLanguageConfidence', 'potentialIssuesFound', 'contributionOpportunities', 'complexity', 'recommendedContributionTypes'],
            additionalProperties: false,
          },
        },
      },
      reasoning_effort: 'medium',
      verbosity: 'low',
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error getting repository insights:', error);
    throw error;
  }
}

export default openai;