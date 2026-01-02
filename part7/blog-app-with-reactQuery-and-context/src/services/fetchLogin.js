const baseUrl = '/api/login';

export const login = async (credentials) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  };

  const response = await fetch(baseUrl, options);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(`Failed to login ${result.error}`);
  }

  return result;
};

export default { login };
