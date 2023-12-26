import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as dotenv from "dotenv";

neonConfig.fetchConnectionCache = true;

if (!"postgresql://jayana.20200003:Z9PftNdGJHQ7@ep-divine-bar-80645812.ap-southeast-1.aws.neon.tech/neondb?sslmode=require") {
  throw new Error("database url not found");
}

const sql = neon("postgresql://jayana.20200003:Z9PftNdGJHQ7@ep-divine-bar-80645812.ap-southeast-1.aws.neon.tech/neondb?sslmode=require");

export const db = drizzle(sql);
