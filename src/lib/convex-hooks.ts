/**
 * Utility hooks for using Convex in your components
 * 
 * Example usage:
 * ```tsx
 * import { useQuery, useMutation } from "convex/react";
 * import { api } from "@/lib/convex-hooks";
 * 
 * // In a component:
 * const products = useQuery(api.products.list);
 * const addToCart = useMutation(api.cart.add);
 * ```
 */

// Re-export Convex hooks for convenience
export { useQuery, useMutation, useAction } from "convex/react";

// Note: You'll need to import your API types from your Convex dashboard
// Example:
// import { api } from "@/convex/_generated/api";
// 
// Then use it like:
// const products = useQuery(api.products.list);
// const addToCart = useMutation(api.cart.add);

