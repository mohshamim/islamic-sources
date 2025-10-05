import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // For now, use a simple admin check
        // TODO: Implement proper user database lookup
        const adminEmail = "admin@islamicsources.com"
        const adminPassword = "admin123" // In production, use environment variables

        if (credentials.email === adminEmail) {
          // In production, hash the password and compare with stored hash
          if (credentials.password === adminPassword) {
            return {
              id: "1",
              email: adminEmail,
              name: "Admin",
              role: "admin"
            }
          }
        }

        return null
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    }
  }
})

export { handler as GET, handler as POST }
