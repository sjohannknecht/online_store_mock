async function login(username, password) {
  const response = await fetch("http://localhost:3001/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not OK.");
  }
  return await response.json();
}

export { login };
