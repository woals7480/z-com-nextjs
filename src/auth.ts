import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import { pages } from "next/dist/build/templates/app-page";
import { NextResponse } from "next/server";

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
// } = NextAuth({
//   pages: {
//     signIn: "/i/flow/login",
//     newUser: "/i/flow/signup",
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         const authResponse = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               id: credentials.username,
//               password: credentials.password,
//             }),
//           }
//         );

//         if (!authResponse.ok) {
//           return null;
//         }

//         const user = await authResponse.json();
//         console.log("user", user);
//         return {
//           email: user.id,
//           name: user.nickname,
//           image: user.image,
//           ...user,
//         };
//       },
//     }),
//   ],
// });

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },
  providers: [
    Credentials({
      credentials: {
        id: {},
        password: {},
      },
      authorize: async (credentials) => {
          let user;
          const authResponse = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: credentials.id,
              password: credentials.password,
            })
          })

          if(!(await authResponse).ok){
            return null;
          }

          user = (await authResponse).json();
          
          // console.log(user,' !!')
          return user;
          // return {
          //   email: user.id,
          //   name: user.nickname,
          //   image: user.image,
          //   ...user,
          // }
      },
    }),
  ],
});
