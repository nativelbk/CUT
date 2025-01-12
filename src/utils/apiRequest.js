const apiRequest = async (url, options = {}) => {
  const { method = "GET", body = null, headers = {} } = options;
  console.log("okok");
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    console.log(response, "salut");

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export default apiRequest;
