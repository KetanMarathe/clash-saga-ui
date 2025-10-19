import { getToken } from '../utils/storage';
import { apiCall } from '../api/api';

export const authLoader = async () => {
  const token = getToken();
  if (!token) return { valid: false };

  try {
    const res = await apiCall<{ valid: boolean }>('/auth/validate');
    return res;
  } catch {
    return { valid: false };
  }
};
