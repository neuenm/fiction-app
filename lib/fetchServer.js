export default async function fetchServer({ url, method, body = null, token = null }) {
  const headers = new Headers();

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  headers.append('Content-Type', 'application/json');

  body = body && JSON.stringify(body);

  try {
    const response = await fetch(`${process.env.API_URL}/${url}`, {
      headers,
      method,
      body,
    });

    if (!response.ok) {
      const resp = await response.json();
      throw resp;
    }

    return response.json();
  } catch (error) {
    throw error ?? new Error(`Request failed`);
  }
}
