const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAll = async () => {
  const response = await fetch(baseUrl);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to fetch blog ${result.error}`);
  }

  return result;
};

export const create = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(content),
  };

  const response = await fetch(baseUrl, options);
  const result = await response.json();
  console.log(result);

  if (!response.ok) {
    throw new Error(`${result.error}`);
  }

  return result;
};

export const update = async (content) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(content),
  };

  const response = await fetch(`${baseUrl}/${content.id}`, options);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to update blog ${result.error}`);
  }

  return result;
};

export const remove = async (id) => {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: token },
  };

  const response = await fetch(`${baseUrl}/${id}`, options);

  if (!response.ok) {
    throw new Error(`Failed to remove blog`);
  }
};

export default { getAll, create, update, remove, setToken };
