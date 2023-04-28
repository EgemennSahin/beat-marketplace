// Call the api with the correct url depending on the environment

export async function callApi(url: string) {
  const { NEXT_PUBLIC_API_URL } = process.env;
  const response = await fetch(`${NEXT_PUBLIC_API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
}
