import { betterAuth } from 'better-auth'
import { Pool } from 'pg'

export const auth = betterAuth({
  database: new Pool({
    connectionString:
      'postgresql://neondb_owner:npg_HfSJ2w0GTWkj@ep-sweet-base-achzbwjd-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  }),
  socialProviders: {
    twitch: {
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
    },
    // kick: {
    //   clientId: process.env.KICK_CLIENT_ID as string,
    //   clientSecret: process.env.KICK_CLIENT_SECRET as string,
    // },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  session: {
    freshAge: 60 * 5, // 5 minutes
  },
})
