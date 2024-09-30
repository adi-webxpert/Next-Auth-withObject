import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const userDetails = {
          id: 1,
          email: "test@gmail.com",
          password: "123456zx",
        };
        if (
          credentials.email === userDetails.email &&
          credentials.password === userDetails.password
        ) {
          return userDetails;
        } else {
         return null;
        }
      },
    }),
  ],
});
export { handler as GET, handler as POST };
