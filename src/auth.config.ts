import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod'; // Validator schema
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs'

const authenticatedRoutes = [
  '/checkout',
  '/checkout/adress'
]

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: 'auth/new-account',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = authenticatedRoutes.includes(nextUrl.pathname);
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return true;
      }
      return true;
    },

    jwt({token, user}) {
      // user <- todo el objeto de usuario
      //? console.log({token,user})
      if(user) { // Le pasamos el user al token
        token.data = user;
      }
      return token; 
    },

    session({session, token, user}) {
      //? console.log({session, token, user})
      // Ahora lo que nos paso el token.data será la sesion
      session.user = token.data as any; 
      return session
    }
  },
  providers: [
    Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
            
            if(!parsedCredentials.success) return null;
            
            const {email, password} = parsedCredentials.data;
           
            //? console.log("AuthConfig.ts:", {email, password})

            //! Post seed:
            // Buscar el correo
            const user = await prisma.user.findUnique({where: {email: email.toLowerCase()}})
            if(!user) return null;

            // Comparar las contraseñas
            if(!bcryptjs.compareSync(password, user.password)) return null;

            // Regresar el usuario sin el password
            const {password: _, ...rest} = user;
            //? console.log({rest})
            return rest;
        },
      }),
  ]
};  

export const {signIn, signOut, auth /* auth => middleware */, handlers} = NextAuth(authConfig)