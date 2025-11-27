import env from '../config/env';

export interface ReverseGeocodeResult {
  latitude: number;
  longitude: number;
  address?: string;
}

export const reverseGeocode = async (latitude: number, longitude: number): Promise<ReverseGeocodeResult> => {
  const url = `${env.externalGeocodeUrl}?format=json&lat=${latitude}&lon=${longitude}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'disaster-response-backend/1.0',
    },
  });

  if (!response.ok) {
    const body = await response.text();
    const error = new Error(`Failed to reverse geocode (${response.status}): ${body}`);
    (error as Error & { status?: number }).status = 502;
    throw error;
  }

  const data = (await response.json()) as { display_name?: string };
  return {
    latitude,
    longitude,
    address: data.display_name,
  };
};
