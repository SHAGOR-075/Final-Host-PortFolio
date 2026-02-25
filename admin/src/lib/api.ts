const API_URL = import.meta.env.VITE_API_URL || 'https://final-host-portfolio-production-6de7.up.railway.app/api';

function getAuthToken() {
  return localStorage.getItem('admin_token');
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || `API Error: ${response.statusText}`);
  }

  return response.json();
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const data = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      localStorage.setItem('admin_token', data.token);
    }
    return data;
  },
  logout: () => {
    localStorage.removeItem('admin_token');
  },
  isAuthenticated: () => !!getAuthToken(),
};

// Work API
export const workAPI = {
  getAll: () => fetchAPI('/work'),
  getById: (id: string) => fetchAPI(`/work/${id}`),
  create: (work: any) => fetchAPI('/work', {
    method: 'POST',
    body: JSON.stringify(work),
  }),
  update: (id: string, work: any) => fetchAPI(`/work/${id}`, {
    method: 'PUT',
    body: JSON.stringify(work),
  }),
  delete: (id: string) => fetchAPI(`/work/${id}`, {
    method: 'DELETE',
  }),
};

// Blog API
export const blogAPI = {
  getAll: () => fetchAPI('/blog'),
  getById: (id: string) => fetchAPI(`/blog/${id}`),
  create: (blog: any) => fetchAPI('/blog', {
    method: 'POST',
    body: JSON.stringify(blog),
  }),
  update: (id: string, blog: any) => fetchAPI(`/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify(blog),
  }),
  delete: (id: string) => fetchAPI(`/blog/${id}`, {
    method: 'DELETE',
  }),
};

// Skills API
export const skillsAPI = {
  getAll: (type?: 'design' | 'development' | 'tools') => {
    const url = type ? `/skills?type=${type}` : '/skills';
    return fetchAPI(url);
  },
  getById: (id: string) => fetchAPI(`/skills/${id}`),
  create: (skill: any) => fetchAPI('/skills', {
    method: 'POST',
    body: JSON.stringify(skill),
  }),
  update: (id: string, skill: any) => fetchAPI(`/skills/${id}`, {
    method: 'PUT',
    body: JSON.stringify(skill),
  }),
  delete: (id: string) => fetchAPI(`/skills/${id}`, {
    method: 'DELETE',
  }),
};

// CV API
export const cvAPI = {
  get: () => fetchAPI('/cv'),
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('cv', file);
    
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/cv/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(error.error || `API Error: ${response.statusText}`);
    }

    return response.json();
  },
  delete: () => fetchAPI('/cv', {
    method: 'DELETE',
  }),
  getDownloadUrl: (filename: string) => {
    const baseUrl = API_URL.replace('/api', '');
    return `${baseUrl}/uploads/${filename}`;
  },
};

