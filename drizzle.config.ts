import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  driver: "pg",
  schema: "./lib/db/schema.ts",
  dbCredentials: {
    connectionString: "postgresql://jayana.20200003:Z9PftNdGJHQ7@ep-divine-bar-80645812.ap-southeast-1.aws.neon.tech/neondb?sslmode=require" !,
  },
} satisfies Config;

// npx drizzle-kit push:pg
// https://github.com/drizzle-team/drizzle-orm/issues/654
// Refactor project
// open neon,mongose db
//env.local
//Directly string ek daala balanna
//https://github.com/drizzle-team/drizzle-orm/issues/654
