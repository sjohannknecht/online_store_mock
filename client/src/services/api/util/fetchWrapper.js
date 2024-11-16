async function get(url) {
  const response = await fetch(url, {
    method: "GET",
  });
  return handleResponse(response);
}

async function post(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
}

async function put(url, body) {
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url) {
  const response = await fetch(url, {
    method: "DELETE",
  });
  return handleResponse(response);
}

async function handleResponse(response) {
  const text = await response.text();
  const data = text && JSON.parse(text);
  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
}

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};
