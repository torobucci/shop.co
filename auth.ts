import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from './lib/definitions';
import bcrypt from 'bcrypt'



async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM shopco_users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {

    throw new Error('Failed to fetch user.',error);
  }
}


export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password_hash);

          if (passwordsMatch) return user;
        }
         alert('Invalid credentials');
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If user object is present, this is a sign-in callback
      if (user) {
        token.id = (user as User).id.toString(); // Ensure id is a string
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID to session object
      if (token) {
        session.user.id = token.id as string; // Ensure id is a string
      }
      return session;
    },
  },
});
