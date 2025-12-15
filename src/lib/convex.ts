import { ConvexReactClient } from "convex/react";

// Get the Convex URL from environment variables
// This should be set in your .env.local file (development) or in your hosting platform (production)
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  const isProduction = typeof window !== "undefined" && window.location.hostname !== "localhost";
  const message = isProduction
    ? "🚨 CRITICAL: Missing NEXT_PUBLIC_CONVEX_URL in production. Set it in Vercel: Settings → Environment Variables → Add NEXT_PUBLIC_CONVEX_URL = https://reminiscent-pigeon-138.convex.cloud"
    : "⚠️  Missing NEXT_PUBLIC_CONVEX_URL. Add it to .env.local: NEXT_PUBLIC_CONVEX_URL=https://reminiscent-pigeon-138.convex.cloud";
  
  console.error(message);
}

// Create and export the Convex client
// If URL is missing, this will cause Convex connection errors
export const convex = new ConvexReactClient(
  convexUrl || "https://placeholder.convex.cloud"
);

