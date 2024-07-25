const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Authentication failed');
  }

  return response;
}

export async function getUsers() {
  const response = await fetchWithAuth(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

export async function getUser(id) {
  const response = await fetchWithAuth(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

export async function addUser(userData) {
  const response = await fetchWithAuth(`${API_BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to add user');
  }
  return response.json();
}

export async function updateUser(id, userData) {
  const response = await fetchWithAuth(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
  return response.json();
}

export async function deleteUser(id) {
  const response = await fetchWithAuth(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
}