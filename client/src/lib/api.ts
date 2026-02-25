const API_URL = import.meta.env.VITE_API_URL || 'https://final-host-portfolio-production-6de7.up.railway.app/api/';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Work API
export const workAPI = {
  getAll: () => fetchAPI('https://final-host-portfolio-production-6de7.up.railway.app/api/work'),
  getById: (id: string) => fetchAPI(`https://final-host-portfolio-production-6de7.up.railway.app/api/work/${id}`),
};

// Blog API
export const blogAPI = {
  getAll: () => fetchAPI('https://final-host-portfolio-production-6de7.up.railway.app/api/blog'),
  getById: (id: string) => fetchAPI(`https://final-host-portfolio-production-6de7.up.railway.app/api/blog/${id}`),
};

// Skills API
export const skillsAPI = {
  getAll: (type?: 'design' | 'development' | 'tools') => {
    const url = type ? `https://final-host-portfolio-production-6de7.up.railway.app/api/skills?type=${type}` : 'https://final-host-portfolio-production-6de7.up.railway.app/api/skills';
    return fetchAPI(url);
  },
};

// CV API
export const cvAPI = {
  get: () => fetchAPI('https://final-host-portfolio-production-6de7.up.railway.app/api/cv'),
  getDownloadUrl: () => {
    const baseUrl = API_URL.replace('https://final-host-portfolio-production-6de7.up.railway.app/api', '');
    return `${baseUrl}https://final-host-portfolio-production-6de7.up.railway.app/api/uploads`;
  },
};

// Contact API
export const contactAPI = {
  send: async (data: { name: string; phone?: string; email: string; subject: string; message: string }) => {
    const response = await fetch(`${API_URL}https://final-host-portfolio-production-6de7.up.railway.app/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => ({ error: response.statusText }));

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send message. Please try again.');
    }

    return result;
  },
};

// Chatbot API
export const chatbotAPI = {
  sendMessage: async (message: string, conversationHistory: Array<{ role: string; content: string }> = []) => {
    const response = await fetch(`${API_URL}/chatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, conversationHistory }),
    });

    const result = await response.json().catch(() => ({ error: response.statusText }));

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send message. Please try again.');
    }

    return result;
  },
};

