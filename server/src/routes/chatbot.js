import express from 'express';
import OpenAI from 'openai';
import Skill from '../models/Skill.js';
import Work from '../models/Work.js';

const router = express.Router();

// Initialize OpenAI client lazily to ensure env vars are loaded
let openai = null;
let useOpenAI = true; // Flag to track if we should use OpenAI

function getOpenAIClient() {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY is not set in environment variables');
      return null;
    }
    try {
      openai = new OpenAI({ apiKey: apiKey.trim() });
      console.log('OpenAI client initialized successfully');
    } catch (error) {
      console.error('Failed to initialize OpenAI client:', error);
      return null;
    }
  }
  return openai;
}

// Intelligent Rule-Based Chatbot (Fallback)
class IntelligentChatbot {
  constructor() {
    this.greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
    this.aboutKeywords = ['about', 'who are you', 'introduce', 'background', 'experience', 'expertise'];
    this.skillsKeywords = ['skill', 'technology', 'tech', 'language', 'framework', 'tool', 'proficient', 'know'];
    this.servicesKeywords = ['service', 'offer', 'do', 'provide', 'work', 'project', 'portfolio'];
    this.contactKeywords = ['contact', 'reach', 'email', 'phone', 'get in touch', 'hire', 'collaborate'];
  }

  normalizeText(text) {
    return text.toLowerCase().trim().replace(/[^\w\s]/g, '');
  }

  findKeywords(text, keywordList) {
    const normalized = this.normalizeText(text);
    return keywordList.some(keyword => normalized.includes(keyword));
  }

  generateGreeting() {
    const greetings = [
      "Hello! I'm here to help you learn about the portfolio owner. What would you like to know?",
      "Hi there! Feel free to ask me anything about their skills, experience, or services.",
      "Hey! I can answer questions about the portfolio owner's background, skills, and work. What interests you?",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  generateAboutResponse(skills, works) {
    const topSkills = skills.slice(0, 5).map(s => s.name).join(', ');
    const projectCount = works.length;
    
    return `The portfolio owner is a passionate technician with over 5 years of experience in the industry. They specialize in web development, mobile applications, and UI/UX design. ` +
           `They have worked on ${projectCount} project${projectCount !== 1 ? 's' : ''} and are skilled in technologies like ${topSkills || 'various modern technologies'}. ` +
           `They deliver high-quality solutions using various technologies and frameworks.`;
  }

  generateSkillsResponse(skills) {
    if (!skills || skills.length === 0) {
      return "I don't have specific skill information available right now, but the portfolio owner has expertise in web development, mobile applications, and UI/UX design.";
    }

    const designSkills = skills.filter(s => s.type === 'design');
    const devSkills = skills.filter(s => s.type === 'development');
    
    let response = "Here are the skills:\n\n";
    
    if (devSkills.length > 0) {
      response += "Development Skills:\n";
      devSkills.slice(0, 5).forEach(skill => {
        response += `• ${skill.name} (${skill.percentage}%)\n`;
      });
    }
    
    if (designSkills.length > 0) {
      response += "\nDesign Skills:\n";
      designSkills.slice(0, 5).forEach(skill => {
        response += `• ${skill.name} (${skill.percentage}%)\n`;
      });
    }
    
    return response.trim();
  }

  generateServicesResponse() {
    return `The portfolio owner offers the following services:

1. Web Development - High-quality development of sites at the professional level
2. Mobile Apps - Professional development of applications for iOS and Android
3. UI/UX Design - Modern and mobile-ready website that will help reach all marketing goals
4. Web Design - High-quality development of sites at the professional level

Feel free to ask about any specific service or check out the portfolio section for examples of their work!`;
  }

  generateProjectsResponse(works) {
    if (!works || works.length === 0) {
      return "I don't have specific project information available right now, but you can check out the Work section to see their portfolio projects.";
    }

    const projectCount = works.length;
    const topProjects = works.slice(0, 3);
    
    let response = `They have worked on ${projectCount} project${projectCount !== 1 ? 's' : ''}. Here are some examples:\n\n`;
    
    topProjects.forEach((project, index) => {
      response += `${index + 1}. ${project.title} (${project.category})\n`;
      if (project.description) {
        response += `   ${project.description.substring(0, 100)}...\n`;
      }
      response += `\n`;
    });
    
    response += "You can view more details about these projects in the Work section of the portfolio!";
    return response;
  }

  generateContactResponse() {
    return "To get in touch with the portfolio owner, please use the Contact section on the website. You can send them a message directly through the contact form, and they'll get back to you as soon as possible!";
  }

  generateDefaultResponse() {
    const responses = [
      "I can help you learn about their background, skills, services, or work. What would you like to know?",
      "Feel free to ask me about their expertise, experience, services, or portfolio projects!",
      "I can answer questions about their skills, services, projects, or background. What interests you?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  async processMessage(message, skills, works) {
    const normalized = this.normalizeText(message);
    
    // Check for greetings
    if (this.greetings.some(g => normalized.includes(g))) {
      return this.generateGreeting();
    }

    // Check for about/introduction questions
    if (this.findKeywords(normalized, this.aboutKeywords) || 
        normalized.includes('who are') || 
        normalized.includes('tell me about')) {
      return this.generateAboutResponse(skills, works);
    }

    // Check for skills/technology questions
    if (this.findKeywords(normalized, this.skillsKeywords) || 
        normalized.includes('what can') ||
        normalized.includes('what do you know')) {
      return this.generateSkillsResponse(skills);
    }

    // Check for services questions
    if (this.findKeywords(normalized, this.servicesKeywords) || 
        normalized.includes('what services') ||
        normalized.includes('what do you offer')) {
      return this.generateServicesResponse();
    }

    // Check for projects/work questions
    if (normalized.includes('project') || 
        normalized.includes('work') || 
        normalized.includes('portfolio') ||
        normalized.includes('what have you done')) {
      return this.generateProjectsResponse(works);
    }

    // Check for contact questions
    if (this.findKeywords(normalized, this.contactKeywords) || 
        normalized.includes('how to reach') ||
        normalized.includes('how can i contact')) {
      return this.generateContactResponse();
    }

    // Check for experience questions
    if (normalized.includes('experience') || normalized.includes('years')) {
      return `The portfolio owner has over 5 years of experience in web development, mobile applications, and UI/UX design. They have worked with various technologies and frameworks to deliver high-quality solutions.`;
    }

    // Check for specific service mentions
    if (normalized.includes('web development') || normalized.includes('web dev')) {
      return `Web Development: High-quality development of sites at the professional level. They create professional, high-quality websites using modern technologies and best practices.`;
    }

    if (normalized.includes('mobile') || normalized.includes('app')) {
      return `Mobile Apps: Professional development of applications for iOS and Android. They develop native and cross-platform mobile applications.`;
    }

    if (normalized.includes('ui') || normalized.includes('ux') || normalized.includes('design')) {
      return `UI/UX Design: Modern and mobile-ready website that will help achieve marketing and business goals. They create modern, user-friendly designs.`;
    }

    // Default response
    return this.generateDefaultResponse();
  }
}

const ruleBasedChatbot = new IntelligentChatbot();

// Function to build dynamic system prompt with real-time portfolio data
async function buildSystemPrompt() {
  let skills = [];
  let works = [];
  
  try {
    // Fetch real-time data from database
    [skills, works] = await Promise.all([
      Skill.find().sort({ percentage: -1 }).limit(15),
      Work.find().sort({ createdAt: -1 }).limit(10)
    ]);
  } catch (error) {
    console.error('Error fetching portfolio data for system prompt:', error);
  }

  // Build skills information
  const designSkills = skills.filter(s => s.type === 'design');
  const devSkills = skills.filter(s => s.type === 'development');
  
  let skillsInfo = '';
  if (devSkills.length > 0) {
    skillsInfo += '\n\nDevelopment Skills:\n';
    devSkills.forEach(skill => {
      skillsInfo += `- ${skill.name} (${skill.percentage}% proficiency)\n`;
    });
  }
  if (designSkills.length > 0) {
    skillsInfo += '\nDesign Skills:\n';
    designSkills.forEach(skill => {
      skillsInfo += `- ${skill.name} (${skill.percentage}% proficiency)\n`;
    });
  }

  // Build projects information
  let projectsInfo = '';
  if (works.length > 0) {
    projectsInfo = '\n\nPortfolio Projects:\n';
    works.forEach((project, index) => {
      projectsInfo += `${index + 1}. ${project.title} (${project.category})\n`;
      if (project.description) {
        projectsInfo += `   Description: ${project.description.substring(0, 150)}${project.description.length > 150 ? '...' : ''}\n`;
      }
      projectsInfo += `   Likes: ${project.likes}\n\n`;
    });
  }

  // Base information
  const baseInfo = `You are a helpful AI assistant representing a portfolio website owner. 
You help visitors learn about the portfolio owner. Here's what you know:

About the Portfolio Owner:
- They are a passionate technician with expertise in web development, mobile applications, and UI/UX design
- They have over 5 years of experience in the industry
- They work with various technologies and frameworks to deliver high-quality solutions

Services Offered:
1. Web Development - High-quality development of sites at the professional level
2. Mobile Apps - Professional development of applications for iOS and Android
3. UI/UX Design - Modern and mobile-ready website that will help reach all marketing goals
4. Web Design - High-quality development of sites at the professional level`;

  // Combine all information
  const systemPrompt = `${baseInfo}${skillsInfo}${projectsInfo}

Your role:
- Answer questions about the portfolio owner's skills, experience, services, and projects
- Use the specific skills and projects listed above when relevant
- Be friendly, professional, and helpful
- If asked about something you don't know, politely say you don't have that information
- Keep responses concise and informative (2-4 sentences typically)
- Direct users to the contact section if they want to reach out directly
- Reference specific projects and skills when they're relevant to the question

Always be helpful and maintain a professional yet friendly tone.`;

  return systemPrompt;
}

// Chat endpoint
router.post('/', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Fetch portfolio data for both OpenAI and fallback
    let skills = [];
    let works = [];
    
    try {
      [skills, works] = await Promise.all([
        Skill.find().sort({ percentage: -1 }).limit(15),
        Work.find().sort({ createdAt: -1 }).limit(10)
      ]);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    }

    // Try OpenAI first if enabled
    if (useOpenAI) {
      const openaiClient = getOpenAIClient();
      
      if (openaiClient) {
        try {
          // Build dynamic system prompt with current portfolio data
          const systemPrompt = await buildSystemPrompt();

          // Build conversation history for context
          const messages = [
            { role: 'system', content: systemPrompt },
            ...conversationHistory.slice(-10).map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            { role: 'user', content: message.trim() }
          ];

          // Call OpenAI API
          const completion = await openaiClient.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0.7,
            max_tokens: 300,
          });

          const aiResponse = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response. Please try again.';

          return res.json({
            response: aiResponse,
            success: true,
            mode: 'openai'
          });
        } catch (error) {
          // Check if it's a quota/rate limit error
          if (error.status === 429 || error.code === 'insufficient_quota' || error.code === 'rate_limit_exceeded') {
            console.warn('OpenAI quota exceeded, falling back to rule-based chatbot');
            useOpenAI = false; // Disable OpenAI for subsequent requests
            
            // Fall through to rule-based chatbot
          } else {
            // For other errors, log and fall back
            console.error('OpenAI error, falling back to rule-based chatbot:', error.message);
            // Fall through to rule-based chatbot
          }
        }
      }
    }

    // Fallback to rule-based chatbot
    console.log('Using rule-based chatbot (fallback mode)');
    const response = await ruleBasedChatbot.processMessage(message.trim(), skills, works);

    return res.json({
      response: response,
      success: true,
      mode: 'rule-based'
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    
    // Final fallback - return a helpful message
    return res.status(500).json({ 
      error: 'Failed to process message. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Test endpoint to verify API key configuration
router.get('/test', async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const openaiClient = getOpenAIClient();
    
    if (!apiKey) {
      return res.json({ 
        error: 'OPENAI_API_KEY is not set in environment variables',
        configured: false,
        fallback: 'Rule-based chatbot will be used'
      });
    }
    
    if (!openaiClient) {
      return res.json({ 
        error: 'Failed to initialize OpenAI client',
        configured: false,
        fallback: 'Rule-based chatbot will be used'
      });
    }
    
    // Try a simple API call to verify the key works
    try {
      const testCompletion = await openaiClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Say "Hello, the API key is working!"' }],
        max_tokens: 20,
      });
      
      return res.json({
        success: true,
        configured: true,
        message: 'API key is configured and working!',
        testResponse: testCompletion.choices[0]?.message?.content || 'No response'
      });
    } catch (error) {
      if (error.status === 429 || error.code === 'insufficient_quota') {
        return res.json({
          success: false,
          configured: true,
          message: 'API key is configured but quota exceeded',
          error: 'OpenAI quota exceeded. Rule-based chatbot will be used as fallback.',
          fallback: 'Rule-based chatbot is active'
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Test endpoint error:', error);
    return res.json({
      error: 'API key test failed',
      message: error.message,
      configured: false,
      fallback: 'Rule-based chatbot will be used'
    });
  }
});

export default router;
