# Convex Setup Guide

This project is now configured to use Convex for backend functionality. Follow these steps to complete the setup:

## Step 1: Add Your Convex URL

1. Create a `.env.local` file in the root directory (if it doesn't exist)
2. Add your Convex deployment URL from your e-commerce dashboard:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

**Where to find your Convex URL:**
- Go to your Convex dashboard
- Navigate to your project
- Copy the deployment URL (it should look like: `https://xxxxx.convex.cloud`)

**Note:** If you have a deployment identifier like `dev:reminiscent-pigeon-138`, the URL format is typically:
```env
NEXT_PUBLIC_CONVEX_URL=https://reminiscent-pigeon-138.convex.cloud
```

You do NOT need to add `CONVEX_DEPLOYMENT` - that's only used by the Convex CLI, not by your Next.js app.

## Step 2: Install Convex Types (Optional but Recommended)

If you want TypeScript support for your Convex functions, you can generate types:

```bash
npx convex dev
```

This will create a `convex/_generated` directory with TypeScript types.

## Step 3: Using Convex in Your Components

### Example: Using Queries

```tsx
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ProductsList() {
  const products = useQuery(api.products.list);
  
  if (products === undefined) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Example: Using Mutations

```tsx
"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AddToCartButton({ productId }: { productId: string }) {
  const addToCart = useMutation(api.cart.add);
  
  const handleAddToCart = async () => {
    await addToCart({ productId, quantity: 1 });
  };
  
  return <button onClick={handleAddToCart}>Add to Cart</button>;
}
```

## Step 4: Accessing Mutations from Your Dashboard

Since you're using the same Convex deployment URL from your e-commerce dashboard, you can access all the mutations and queries defined there. Just import them using:

```tsx
import { api } from "@/convex/_generated/api";
```

Then use them with `useQuery`, `useMutation`, or `useAction` hooks.

## File Structure

- `src/lib/convex.ts` - Convex client configuration
- `src/components/providers/ConvexProvider.tsx` - Convex provider wrapper
- `src/app/layout.tsx` - Root layout with ConvexProvider
- `convex.json` - Convex configuration file

## Troubleshooting

1. **Error: Missing NEXT_PUBLIC_CONVEX_URL**
   - Make sure you've created `.env.local` file
   - Make sure the environment variable name is exactly `NEXT_PUBLIC_CONVEX_URL`
   - Restart your development server after adding the variable

2. **Cannot find module '@/convex/_generated/api'**
   - Run `npx convex dev` to generate the types
   - Or if you're using a shared deployment, you may need to sync the generated files

3. **Connection issues**
   - Verify your Convex URL is correct
   - Check that your Convex deployment is active in the dashboard

