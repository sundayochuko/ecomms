# Convex Function Naming & Troubleshooting Guide

## ❌ The Error You're Seeing

```
Could not find public function for 'dashboard/products:getAll'
```

This error means Convex cannot find the function you're trying to call. Here's how to fix it:

---

## 🔍 Understanding Convex Function Naming

In Convex, function names are based on **file paths**, not arbitrary namespaces.

### ✅ Correct Function Path Format

If your function is in:
- **File**: `convex/products.ts`
- **Export name**: `getAll`
- **Call it as**: `api.products.getAll`

If your function is in:
- **File**: `convex/dashboard/products.ts`
- **Export name**: `getAll`
- **Call it as**: `api.dashboard.products.getAll`

### ❌ Wrong Formats

- ❌ `dashboard/products:getAll` (wrong - uses colon)
- ❌ `dashboard.products.getAll` (wrong - if file is `convex/products.ts`)
- ❌ `products/getAll` (wrong - uses slash)

---

## 🔧 How to Fix Your Issue

### Step 1: Check Your Function File Structure

In your Convex dashboard, check where your function is located:

**Option A: Function is in `convex/products.ts`**
```typescript
// convex/products.ts
import { query } from "./_generated/server";

export const getAll = query({
  handler: async (ctx) => {
    // your code
  }
});
```

**Then call it as:**
```typescript
import { api } from "@/convex/_generated/api";
const products = useQuery(api.products.getAll);
```

**Option B: Function is in `convex/dashboard/products.ts`**
```typescript
// convex/dashboard/products.ts
import { query } from "../_generated/server";

export const getAll = query({
  handler: async (ctx) => {
    // your code
  }
});
```

**Then call it as:**
```typescript
import { api } from "@/convex/_generated/api";
const products = useQuery(api.dashboard.products.getAll);
```

---

## 📋 Common Issues & Solutions

### Issue 1: Function Not Exported as Public

**Problem**: Function exists but isn't exported correctly.

**Solution**: Make sure your function is exported:
```typescript
// ✅ Correct
export const getAll = query({ ... });

// ❌ Wrong - not exported
const getAll = query({ ... });
```

### Issue 2: Function Not Deployed

**Problem**: Function exists in code but hasn't been deployed.

**Solution**: 
1. In your e-commerce dashboard project, run:
   ```bash
   npx convex deploy
   ```
2. Or if developing:
   ```bash
   npx convex dev
   ```

### Issue 3: Wrong Deployment URL

**Problem**: You're connecting to a different Convex project.

**Solution**: 
1. Check your `.env.local` file has the correct URL
2. Verify the URL matches your e-commerce dashboard's Convex deployment
3. Restart your Next.js dev server after changing the URL

### Issue 4: Function Name Mismatch

**Problem**: Calling `getAll` but function is named `list` or `getAllProducts`.

**Solution**: Check the exact export name in your Convex function file.

---

## 🎯 Recommended File Structure

For your e-commerce app, organize functions like this:

```
convex/
├── _generated/
│   ├── api.d.ts
│   └── api.js
├── products.ts          # Product queries/mutations
├── cart.ts              # Cart queries/mutations
├── promotions.ts        # Promotion queries
├── categories.ts        # Category queries
└── orders.ts            # Order queries/mutations
```

**Example `convex/products.ts`:**
```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query: Get all products
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  }
});

// Query: Get product by ID
export const getById = query({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.productId);
  }
});

// Query: Get by category
export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();
  }
});
```

**Then use in your Next.js app:**
```typescript
"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ProductsPage() {
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

---

## 🔍 How to Verify Your Functions

### Method 1: Check Convex Dashboard
1. Go to your Convex dashboard
2. Navigate to "Functions" or "API" section
3. You should see all your exported functions listed
4. Check the exact path shown (e.g., `products.getAll` or `dashboard.products.getAll`)

### Method 2: Check Generated Types
If you have `convex/_generated/api.d.ts`, you can check the available functions:
```typescript
// Look for your function in the api type
type Api = {
  products: {
    getAll: Query<...>;
    getById: Query<...>;
  };
  // etc.
}
```

### Method 3: Use Convex Dashboard Console
1. Open your Convex dashboard
2. Go to the "Data" or "Functions" tab
3. Try calling the function directly to see if it exists

---

## 📝 Quick Checklist

Before calling a function, verify:

- [ ] Function is exported (has `export` keyword)
- [ ] Function is marked as `query`, `mutation`, or `action`
- [ ] Function has been deployed (`npx convex deploy` or `npx convex dev`)
- [ ] You're using the correct path: `api.[filePath].[functionName]`
- [ ] Your `.env.local` has the correct `NEXT_PUBLIC_CONVEX_URL`
- [ ] You've restarted your Next.js dev server after changes
- [ ] The function name matches exactly (case-sensitive)

---

## 🚀 Quick Fix for Your Specific Error

If you're getting `dashboard/products:getAll` error:

1. **Check the actual file path in your dashboard:**
   - If it's `convex/products.ts` → use `api.products.getAll`
   - If it's `convex/dashboard/products.ts` → use `api.dashboard.products.getAll`

2. **Verify the function is exported:**
   ```typescript
   export const getAll = query({ ... });
   ```

3. **Deploy the function:**
   ```bash
   cd /path/to/your/dashboard/project
   npx convex deploy
   ```

4. **Update your Next.js code to use the correct path:**
   ```typescript
   // Use the correct path based on your file structure
   const products = useQuery(api.products.getAll);
   // OR
   const products = useQuery(api.dashboard.products.getAll);
   ```

---

## 💡 Pro Tip

If you're sharing the same Convex deployment between your dashboard and this e-commerce app:

1. Make sure both projects point to the same deployment URL
2. Functions created in the dashboard are immediately available in this app
3. You don't need to run `npx convex dev` in this project if you're only consuming functions
4. You only need the `convex/_generated/api` types - you can copy them from your dashboard project or generate them here

---

## 📞 Still Having Issues?

1. **Check the browser console** for the exact error message
2. **Check your Convex dashboard logs** to see if the function is being called
3. **Verify the deployment URL** in `.env.local` matches your dashboard
4. **Check function visibility** - make sure it's exported as `public` (queries/mutations are public by default)

