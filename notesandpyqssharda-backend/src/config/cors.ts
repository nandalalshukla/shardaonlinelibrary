import cors from "cors";

const allowedOrigins = [
  process.env.VERCEL_FRONTEND_URL, // Production frontend
  "http://localhost:3000", // Local development (default Next.js port)
  "http://localhost:3100", // Alternative local port
].filter(Boolean); // Remove any undefined values

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.some(
        (allowedOrigin) =>
          origin.startsWith(allowedOrigin as string) ||
          allowedOrigin === origin,
      )
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
