import { ConvexReactClient } from "convex/react";

// Get the Convex URL from environment variables
// This should be set in your .env.local file
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  console.warn(
    "⚠️  Missing NEXT_PUBLIC_CONVEX_URL environment variable. Please add it to your .env.local file."
  );
}

// Create and export the Convex client
// If URL is not provided, create a client with a placeholder (will fail at runtime if used)
export const convex = new ConvexReactClient(
  convexUrl || "https://placeholder.convex.cloud"
);

