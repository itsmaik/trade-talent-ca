import { BASE_API_URL } from "../config/config.mjs";

export default async function getApiKey() {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const apiKeyResponse = await fetch(`${BASE_API_URL}/auth/create-api-key`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const apiKeyData = await apiKeyResponse.json();
    const apiKey = apiKeyData?.data?.key;

    if (!apiKey) {
      throw new Error('API key not available');

    }

    return apiKeyData;
  } catch (error) {
    throw new Error('Error fetching API key: ' + error);
  }
};