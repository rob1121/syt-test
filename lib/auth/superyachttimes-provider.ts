import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

// interface SuperYachtTimesProfile {
//   id: string;
//   name: string;
//   email: string;
//   image?: string;
//   url?: string;
// }

export function SuperYachtTimesProvider(
  config: OAuthUserConfig<Record<string, unknown>> & { redirectUri: string }
): OAuthConfig<Record<string, unknown>> {
  console.log("[next-auth][debug][PROVIDER_INIT] Initializing SuperYachtTimes provider with redirectUri:", config.redirectUri);
  return {
    id: "superyachttimes",
    name: "SuperYachtTimes",
    type: "oauth",
    authorization: {
      url: process.env.AUTH_ENDPOINT as string,
      params: { 
        scope: "API",
        response_type: "code",
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
      },
    },
    // We'll handle the callback in the token request
    token: {
      url: process.env.TOKEN_ENDPOINT as string,
      params: { grant_type: "authorization_code" },
      async request({ params, provider, checks }) {
        // Log complete params for debugging
        console.log("[next-auth][debug][TOKEN_REQUEST] Starting token request with params:", JSON.stringify({ params, provider: { id: provider.id, clientId: provider.clientId }, checks }));
        
        const tokenUrl = typeof provider.token === 'string' ? provider.token : provider.token?.url;
        if (!tokenUrl) {
          console.error("[next-auth][error] Token URL is undefined");
          throw new Error("Token URL is undefined");
        }
        
        // Log the code parameter which should be present
        console.log("[next-auth][debug][TOKEN_REQUEST] Code param:", params.code);
        
        // Construct the request body with all necessary parameters
        const requestBody = {
          ...params,
          client_id: provider.clientId as string,
          redirect_uri: config.redirectUri,
        };
        
        // Add code_verifier for PKCE if available
        if (checks && 'pkce' in checks && typeof checks.pkce === 'object' && checks.pkce !== null) {
          const pkceObj = checks.pkce as Record<string, unknown>;
          if ('verifier' in pkceObj && typeof pkceObj.verifier === 'string') {
            console.log("[next-auth][debug][TOKEN_REQUEST] Adding PKCE verifier");
            (requestBody as Record<string, string | undefined>).code_verifier = pkceObj.verifier as string;
          } else {
            console.warn("[next-auth][warn] PKCE verifier not found or not a string");
          }
        } else {
          console.warn("[next-auth][warn] No PKCE verifier found in checks");
        }
        
        console.log("[next-auth][debug][TOKEN_REQUEST] Full request body:", JSON.stringify(requestBody));
        
        try {
          const response = await fetch(tokenUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(requestBody),
          });
          
          const responseText = await response.text();
          console.log(`[next-auth][debug][TOKEN_RESPONSE] Status: ${response.status}, Body: ${responseText}`);
          
          if (!response.ok) {
            console.error(`[next-auth][error] Token request failed with status ${response.status}: ${responseText}`);
            throw new Error(`Failed to get token: ${response.status} ${responseText}`);
          }
          
          try {
            const data = JSON.parse(responseText);
            console.log("[next-auth][debug][TOKEN_SUCCESS] Received token response", { 
              has_access_token: !!data.access_token,
              has_refresh_token: !!data.refresh_token,
              expires_in: data.expires_in
            });
            return data;
          } catch (e) {
            console.error("[next-auth][error] Failed to parse token response as JSON:", e);
            throw new Error("Invalid JSON in token response");
          }
        } catch (error) {
          console.error("[next-auth][error] Error during token request:", error);
          throw error;
        }
      },
    },
    userinfo: {
      url: "https://www.superyachttimes.com/api/v1/me", // Replace with actual endpoint
      async request({ tokens, provider }) {
        console.log({
          tokens,
provider
        })
        try {
          const response = await fetch(provider.userinfo?.url as string, {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          });
          
          if (!response.ok) {
            console.warn("Failed to fetch user info from SuperYachtTimes API");
            // Return a minimal profile if userinfo endpoint fails or doesn't exist
            return {
              id: "user_id", // You might want to extract this from the token if possible
              name: "SuperYachtTimes User",
              email: null,
            };
          }
          
          return await response.json();
        } catch (error) {
          console.error("Error fetching user info", error);
          // Return a minimal profile if userinfo endpoint fails
          return {
            id: "user_id",
            name: "SuperYachtTimes User",
            email: null,
          };
        }
      },
    },
    profile(profile: Record<string, unknown>) {
      return {
        id: String(profile.id || ""),
        name: String(profile.name || ""),
        email: profile.email ? String(profile.email) : null,
        image: profile.image ? String(profile.image) : null,
      };
    },
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    checks: ["pkce"],
    accessTokenUrl: process.env.TOKEN_ENDPOINT as string,
  };
}