const dev = process.env.NODE_ENV !== "production";

export const NEXT_URL = dev
  ? "http://localhost:3000"
  : "https://viaromaninsolopizza.com";
