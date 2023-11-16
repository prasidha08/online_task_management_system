import dotenv from "dotenv";

dotenv.config();

export const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 8080,
  SECRET_TOKEN: process.env.SECRET_TOKEN,
  ACCESS_SECRET_TOKEN: process.env.ACCESS_SECRET_TOKEN,
};
