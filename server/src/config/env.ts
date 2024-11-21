import { config } from "dotenv";
config({ path: "../../.env" });

type TEnv = {
  DATABASE_URL: string;
  PORT: number;
  CLOUDINARY_SECRET_KEY: string;
  CLOUDINARY_API_KEY: string;
};

export const env: TEnv = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  PORT: process.env.PORT as unknown as number,
  CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
};
