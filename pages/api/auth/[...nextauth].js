import NextAuth from "next-auth";
import Providers from "next-auth/providers";
// import { redirect } from "next/dist/next-server/server/api-utils";

// import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  session: {
    jwt: {
      signingKey: process.env.JWT_PRIVATE_KEY,
      verificationOptions: {
        algorithms: ["HS512"],
      },
    },
    maxAge: 24 * 60 * 60, //24 Hours
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    Providers.Credentials({
      async authorize(credentials) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BACK_END}/api/login`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
                provider: "Biomarkerz",
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const resultData = await response.json();

          if (response.status === 200 || response.status === 201) {
            return {
              email: resultData.email,
              name: {
                userId: resultData.userId,
                firstName: resultData.firstName,
                lastName: resultData.lastName,
                masterAdmin: resultData.masterAdmin,
                isAdmin: resultData.isAdmin,
                // token: resultData.token,
              },
            };
          } else if (response.status !== 200 || response.status !== 201) {
            return {
              name: {
                email: resultData.email,
                error: resultData.message,
              },
            };
          } else {
            throw new Error(resultData);
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      if ((account.provider === "google" || account.provider === "facebook" ) && profile.verified_email === true) {
        await fetch(
          `${process.env.NEXT_PUBLIC_REACT_APP_BACK_END}/api/providerRegister`,
          {
            method: "POST",
            body: JSON.stringify({
              firstName: profile.given_name,
              lastName: profile.family_name,
              email: profile.email.toLowerCase(),
              provider: account.provider,
              picture: profile.picture,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return true;
      } else {
        return "/";
      }
    },
  },
});
