const baseUrl = '/api/users';

const getAll = async () => {
  const response = await fetch(baseUrl);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to fetch blog ${result.error}`);
  }

  return result;
};

export default { getAll };
