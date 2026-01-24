import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error('Invalid credentials');
        }

        // Check if user has a password (OAuth users don't have passwords)
        if (!user.password) {
          throw new Error('Please sign in with Google');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            // Create new user with Google account
            await prisma.user.create({
              data: {
                email: user.email!,
                fullName: user.name || user.email!.split('@')[0],
                password: '', // OAuth users don't have passwords
                role: 'MEMBER',
                avatar: user.image || null,
              },
            });
          } else if (!existingUser.avatar && user.image) {
            // Update avatar if not set
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { avatar: user.image },
            });
          }
        } catch (error) {
          console.error('Error in Google sign in:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // 1. Initial Sign In: Populate token with user data
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }

      // 2. Refresh Strategy:
      // If the user is logged in (has email in token), fetch the latest role from DB.
      // This ensures that if the ADMIN role is granted manually in Supabase, 
      // the user doesn't need to sign out and back in to see the changes.
      if (token.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email },
            select: { role: true, id: true }
          });

          if (dbUser) {
            token.role = dbUser.role;
            // Also ensure ID is set if missing
            if (!token.id) token.id = dbUser.id;
          }
        } catch (error) {
          console.error("Failed to refresh user role from DB:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
