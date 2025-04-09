import { getCookie as getClientCookie, setCookie as setClientCookie, deleteCookie as deleteClientCookie } from 'cookies-next';

// Default cookie options
const defaultOptions = {
  path: '/',
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
};

// Client-side cookie management (re-exported for convenience)
export const getClientSideCookie = getClientCookie;
export const setClientSideCookie = setClientCookie;
export const deleteClientSideCookie = deleteClientCookie;

// Auth-specific cookie helpers
export const AUTH_COOKIE_NAMES = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  CODE_VERIFIER: 'pkce_code_verifier',
};

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    const token = getClientCookie(AUTH_COOKIE_NAMES.ACCESS_TOKEN);
    return token ? token.toString() : null;
  }
  // For server-side, we'll only support client-side cookies for now
  // as the async nature of server cookies would complicate our API
  return null;
};

export const getCodeVerifier = () => {
  if (typeof window !== 'undefined') {
    const verifier = getClientCookie(AUTH_COOKIE_NAMES.CODE_VERIFIER);
    return verifier ? verifier.toString() : null;
  }
  // For server-side, we'll only support client-side cookies for now
  return null;
};

export const setAccessToken = (token: string) => {
  if (typeof window !== 'undefined') {
    setClientCookie(AUTH_COOKIE_NAMES.ACCESS_TOKEN, token, {
      ...defaultOptions,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }
  // Server-side cookie setting is async, so we'll skip it for now
};

export const setCodeVerifier = (codeVerifier: string) => {
  if (typeof window !== 'undefined') {
    setClientCookie(AUTH_COOKIE_NAMES.CODE_VERIFIER, codeVerifier, {
      ...defaultOptions,
      maxAge: 60 * 60, // 1 hour
    });
  }
  // Server-side cookie setting is async, so we'll skip it for now
};

export const clearAuthCookies = () => {
  if (typeof window !== 'undefined') {
    deleteClientCookie(AUTH_COOKIE_NAMES.ACCESS_TOKEN);
    deleteClientCookie(AUTH_COOKIE_NAMES.REFRESH_TOKEN);
    deleteClientCookie(AUTH_COOKIE_NAMES.CODE_VERIFIER);
  }
  // Server-side cookie deletion is async, so we'll skip it for now
};
