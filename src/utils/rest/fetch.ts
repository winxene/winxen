import ApiOptions from "@/types/apiOption";

const fetchApi = async (
  baseUrl: string,
  endpoint: string,
  options: ApiOptions = {},
): Promise<any> => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const url = new URL(`${baseUrl}/${cleanEndpoint}`);

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) =>
      url.searchParams.append(key, String(value)),
    );
  }

  const response = await fetch(url.toString(), {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    let errorMessage = `API error: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage += ` - ${JSON.stringify(errorData)}`;
    } catch {
      const errorText = await response.text();
      if (errorText) errorMessage += ` - ${errorText}`;
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};

export default fetchApi;
