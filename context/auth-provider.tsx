"use client";

import { createPKCECodes, sleep } from "@/lib/utils";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import {
  setAccessToken,
  getAccessToken,
  setCodeVerifier,
  getCodeVerifier,
  clearAuthCookies,
  AUTH_COOKIE_NAMES
} from "@/lib/auth-cookies";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

const AuthContext = createContext<{
  access_token: string | null;
  pkce_code_verifier: string | null;
  setAccessToken: (token: string | null) => void;
  setPKCECodeVerifier: (codeVerifier: string) => void;
  oAuthLogin: () => Promise<void>;
  logout: () => void;
  generateToken: (code: string) => Promise<void>;
} | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [access_token, setStateAccessToken] = useState<string | null>(null);
  const [pkce_code_verifier, setStatePKCECodeVerifier] = useState<string | null>(null);

  const handleSetAccessToken = (token: string | null) => {
    setStateAccessToken(token);
    if (token) {
      setCookie(AUTH_COOKIE_NAMES.ACCESS_TOKEN, token);
    } else {
      clearAuthCookies();
    }
  };
  
  const handleSetPKCECodeVerifier = (codeVerifier: string) => {
    setStatePKCECodeVerifier(codeVerifier);
    setCodeVerifier(codeVerifier);
  };
  
  const handleLogout = () => {
    clearAuthCookies();
    setStateAccessToken(null);
    setStatePKCECodeVerifier(null);
    window.location.href = "/";

    toast("You have been logged out.");
  };

  const handleOAuthLogin = async () => {
    const { codeVerifier, codeChallenge } = await createPKCECodes();
    setCookie(AUTH_COOKIE_NAMES.CODE_VERIFIER, codeVerifier);

    const params = new URLSearchParams({
      scope: "API",
      response_type: "code",
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI as string,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });

    window.location.href = `${
      process.env.NEXT_PUBLIC_AUTH_ENDPOINT
    }?${params.toString()}`;
  };

  const generateToken = async (code: string) => {
    try {
      const response = await fetch(
        "https://www.superyachttimes.com/oauth/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
            redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI as string,
            code_verifier: getCodeVerifier() as string,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to exchange code for token");
      }
      const data = await response.json();
      handleSetAccessToken(data.access_token);
      router.replace("/");
      toast.success("You have been logged in.");
    } catch (err) {
      console.error("Token exchange failed", err);
      toast.error("Failed to log in.");
    }
  };

  // Load cookies on initial render
  useEffect(() => {
    const storedToken = getAccessToken();
    const storedCodeVerifier = getCodeVerifier();
    
    if (storedToken) setStateAccessToken(storedToken);
    if (storedCodeVerifier) setStatePKCECodeVerifier(storedCodeVerifier);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        access_token,
        setAccessToken: handleSetAccessToken,
        pkce_code_verifier,
        setPKCECodeVerifier: handleSetPKCECodeVerifier,
        oAuthLogin: handleOAuthLogin,
        logout: handleLogout,
        generateToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

export default AuthProvider;
