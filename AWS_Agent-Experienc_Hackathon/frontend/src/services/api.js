const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(errorData.detail || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  getHealth: () => request('/api/health'),
  getStatus: () => request('/api/status'),
  getProfile: () => request('/api/student/profile'),
  updateProfile: (profile) => request('/api/student/profile', {
    method: 'PUT',
    body: JSON.stringify(profile),
  }),
  chatWithAgent: (message, mode = 'auto', studentId = 'std_dev_001', forceAction = null) =>
    request('/api/agent/chat', {
      method: 'POST',
      body: JSON.stringify({
        message,
        mode,
        student_id: studentId,
        force_action: forceAction,
      }),
    }),
  testDecision: (testPrompt, mode = 'auto', overrideProfile = null) =>
    request('/api/agent/decision-test', {
      method: 'POST',
      body: JSON.stringify({
        test_prompt: testPrompt,
        mode,
        override_profile: overrideProfile,
      }),
    }),
  getActivities: (limit = 15) => request(`/api/activities?limit=${limit}`),
  getRoadmap: () => request('/api/roadmap'),
  getInternships: (role, location) => {
    const params = new URLSearchParams();
    if (role) params.append('role', role);
    if (location) params.append('location', location);
    const qs = params.toString() ? `?${params.toString()}` : '';
    return request(`/api/internships${qs}`);
  },
  getProjects: (difficulty) => {
    const qs = difficulty ? `?difficulty=${difficulty}` : '';
    return request(`/api/projects${qs}`);
  },
  getRoles: () => request('/api/roles'),
  getInterviewPrep: (role) => {
    const qs = role ? `?role=${encodeURIComponent(role)}` : '';
    return request(`/api/interview-prep${qs}`);
  },
};
