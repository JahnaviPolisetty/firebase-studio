'use server';

import { getApiKey } from './genkit-instance';

export async function isApiKeySet() {
  return !!getApiKey();
}
