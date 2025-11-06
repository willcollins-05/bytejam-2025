import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUserByEmail } from "@/lib/supabase/queries"
import { comparePasswords } from "@/lib/auth/session"

declare module 'next-auth' {
    interface Session {
        users: {
            id: string;
            username: string,
            email: string,
            pfp_url?: string | null
        } & DefaultSession['user'];
        token?: string;
    }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await getUserByEmail(credentials.email)
          
          if (!user) {
            return null
          }

          const correctPassword = await comparePasswords(
            credentials.password,
            user.password_hash
          )

          if (!correctPassword) {
            return null
          }

          return {
            id: user.id?.toString() || "",
            name: user.username || "",
            email: user.email,
            username: user.username,
            pfp_url: user.pfp_url
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = (user as any).username ?? (user as any).name
        token.pfp_url = (user as any).pfp_url ?? null
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.username = token.username as string
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }