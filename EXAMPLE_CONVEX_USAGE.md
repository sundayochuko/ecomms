# Example: How to Use Convex Functions

## The Problem

You're getting this error:
```
Could not find public function for 'dashboard/products:getAll'
```

## The Solution

Convex functions are called using **dot notation** based on file paths, not colons or slashes.

---

## ✅ Correct Way to Call Functions

### If your function is in `convex/products.ts`:

**In your Convex dashboard:**
```typescript
// convex/products.ts
import { query } from "./_generated/server";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  }
});
```

**In your Next.js app:**
```typescript
"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ProductsList() {
  // ✅ Correct: api.products.getAll
  const products = useQuery(api.products.getAll);
  
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

### If your function is in `convex/dashboard/products.ts`:

**In your Convex dashboard:**
```typescript
// convex/dashboard/products.ts
import { query } from "../_generated/server";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  }
});
```

**In your Next.js app:**
```typescript
"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ProductsList() {
  // ✅ Correct: api.dashboard.products.getAll
  const products = useQuery(api.dashboard.products.getAll);
  
  // ... rest of component
}
```

---

## ❌ Wrong Ways (What NOT to do)

```typescript
// ❌ Wrong - uses colon
const products = useQuery(api["dashboard/products:getAll"]);

// ❌ Wrong - uses slash
const products = useQuery(api["dashboard/products/getAll"]);

// ❌ Wrong - wrong path
const products = useQuery(api.products.getAll); // if file is in dashboard/products.ts
```

---

## 🔍 How to Find the Correct Path

1. **Check your Convex dashboard:**
   - Go to Functions/API section
   - Find your function
   - Note the exact path shown (e.g., `products.getAll` or `dashboard.products.getAll`)

2. **Check the file location:**
   - If file is `convex/products.ts` → use `api.products.getAll`
   - If file is `convex/dashboard/products.ts` → use `api.dashboard.products.getAll`
   - If file is `convex/dashboard/products/getAll.ts` → use `api.dashboard.products.getAll.getAll` (not recommended structure)

---

## 📝 Step-by-Step Fix

1. **Identify where your function is:**
   - Check your Convex dashboard project structure
   - Find the file containing `getAll`

2. **Use the correct path:**
   ```typescript
   // Based on file location
   api.products.getAll              // if in convex/products.ts
   api.dashboard.products.getAll   // if in convex/dashboard/products.ts
   ```

3. **Make sure the function is deployed:**
   ```bash
   # In your dashboard project
   npx convex deploy
   ```

4. **Generate types (if needed):**
   ```bash
   # In your dashboard project (to generate types)
   npx convex dev
   # Then copy convex/_generated/api.* to this project
   ```

5. **Use in your component:**
   ```typescript
   import { useQuery } from "convex/react";
   import { api } from "@/convex/_generated/api";
   
   const products = useQuery(api.products.getAll); // or api.dashboard.products.getAll
   ```

---

## 🎯 Most Likely Fix for Your Case

Based on the error `dashboard/products:getAll`, you probably need to:

1. **Check if the function is actually in `convex/dashboard/products.ts`**
   - If YES → use `api.dashboard.products.getAll`
   - If NO → check where it actually is

2. **If the function is in `convex/products.ts`, use:**
   ```typescript
   const products = useQuery(api.products.getAll);
   ```

3. **Make sure you have the generated API types:**
   - Copy `convex/_generated/api.d.ts` and `api.js` from your dashboard project
   - OR run `npx convex dev` in this project (if you have convex folder set up)

---

## 💡 Quick Test

Create a simple test component to verify:

```typescript
"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function TestProducts() {
  // Try both variations to see which works
  const products1 = useQuery(api.products.getAll);
  // const products2 = useQuery(api.dashboard.products.getAll);
  
  console.log("Products:", products1);
  
  return <div>Check console for products</div>;
}
```

The one that doesn't error is the correct path!

