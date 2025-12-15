# Path Resolution Fix

## Issue
Next.js couldn't resolve `@/convex/_generated/api` because the `convex` folder is at the root level, not inside `src`.

## Solution Applied

### 1. Updated `tsconfig.json`
Added path mapping for convex folder:
```json
"paths": {
  "@/*": ["./src/*"],
  "@/convex/*": ["./convex/*"]
}
```

### 2. Updated `next.config.ts`
Added webpack alias for convex folder:
```typescript
webpack: (config) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@/convex": path.resolve(__dirname, "convex"),
  };
  return config;
}
```

### 3. Updated `tsconfig.json` include
Added convex folder to include paths:
```json
"include": [
  ...
  "convex/**/*.ts",
  "convex/**/*.js",
  ...
]
```

## Next Steps

1. **Restart your dev server:**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

2. **If the issue persists, try:**
   - Clear Next.js cache: `rm -rf .next`
   - Restart the dev server again

3. **Verify the convex folder exists:**
   ```bash
   ls -la convex/_generated/
   ```
   You should see: `api.d.ts`, `api.js`, `dataModel.d.ts`, etc.

## Alternative Solution (if above doesn't work)

If the path resolution still doesn't work, you can use relative imports instead:

```typescript
// Instead of:
import { api } from "@/convex/_generated/api";

// Use:
import { api } from "../../../convex/_generated/api";
```

But the path alias should work with the configuration above.

