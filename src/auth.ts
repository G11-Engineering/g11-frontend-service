import NextAuth from "next-auth"
import Asgardeo from "next-auth/providers/asgardeo"
import { services } from "@/config/appConfig"

declare module "next-auth" {
  interface User {
    given_name?: string;
    family_name?: string;
    id_token?: string;
    role?: string;
    id?: string;
    username?: string;
  }
  interface Session {
    accessToken?: string;
    user: User;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Asgardeo({
    issuer: process.env.AUTH_ASGARDEO_ISSUER
  })],
  callbacks: {
    async jwt({ token, profile, account }) {      
      if (profile) {
        token.username = profile.username;
        token.given_name = profile.given_name;
        token.family_name = profile.family_name;
      }

      if (account && account.id_token) {
        token.id_token = account.id_token;
        
        try {
          const response = await fetch(`${services.user.baseUrl}/api/auth/asgardeo/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: account.id_token }),
          });
          
          if (response.ok) {
            const data = await response.json();
            token.accessToken = data.token;
            if (data.user) {
              token.role = data.user.role;
              token.id = data.user.id;
              // Ensure username is consistent with backend if needed, or keep from profile
            }
          }
        } catch (error) {
          console.error("Error exchanging token:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {            
      if (token) {
        session.user.email = token.username as string;
        session.user.given_name = token.given_name as string;
        session.user.family_name = token.family_name as string;
        // @ts-ignore
        session.user.id_token = token.id_token as string;
        session.accessToken = token.accessToken as string;
        session.user.role = token.role as string;
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }

      return session;
    }
  }
})
