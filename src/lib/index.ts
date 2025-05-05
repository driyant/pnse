export const fetchData = async (baseUrl: string, queryInput: string) => {
  if (process.env.NODE_ENV === 'development') {
    const response = await fetch(baseUrl);
    const data = await response.json();
    console.log(data);
  } else {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: queryInput }),
    });
    const data = await response.json();
    console.log(data);
  }
};
