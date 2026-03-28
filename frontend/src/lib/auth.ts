import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Save user to Supabase when they sign in
      try {
        const { error } = await supabase
          .from("users")
          .upsert(
            {
              email: user.email!,
              name: user.name,
              avatar_url: user.image,
              last_active: new Date().toISOString(),
            },
            { onConflict: "email" }
          );

        if (error) {
          console.error("Supabase error:", error);
          return false;
        }
        return true;
      } catch (err) {
        console.error("Sign in error:", err);
        return false;
      }
    },
    async session({ session, token }) {
      // Add user id to session
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",     // Our custom login page
    error: "/login",      // Errors go back to login
  },
  session: {
    strategy: "jwt",
  },
});