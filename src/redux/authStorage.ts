import { AUTH_STORAGE_KEY, type PersistedAuth } from "./authSlice";

export const getStoredAuth = (): PersistedAuth | null => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<PersistedAuth>;

    if (!parsed.user || !parsed.token) {
      localStorage.removeItem(AUTH_STORAGE_KEY);

      return null;
    }

    return { user: parsed.user, token: parsed.token };
  } catch (error) {
    localStorage.removeItem(AUTH_STORAGE_KEY);

    return null;
  }
};

export const saveAuth = (auth: PersistedAuth) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
};

export const clearStoredAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};
