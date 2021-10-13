import { selectAccessToken } from '@/config/oauth-store';

export const host = 'http://127.0.0.1:7001';

// oauth2 Authorization
export function headers() {
  const header = {
    Authorization: `Bearer ${selectAccessToken()}`,
  };
  return header;
}
