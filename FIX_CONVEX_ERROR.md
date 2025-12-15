# Fix Convex Error: dashboard/products:getAll

## Issue
The store-front is showing an error: `Could not find public function for 'dashboard/products:getAll'`

## Solution

The store-front needs to sync with Convex. Since both dashboard and store-front use the same Convex deployment, you need to run:

```bash
cd store-front
npx convex dev
```

This will:
1. Sync the Convex functions
2. Generate the API types
3. Connect to the shared deployment

## Important Notes

- The store-front should **ONLY** use `api.frontend.*` functions
- The dashboard should **ONLY** use `api.dashboard.*` functions
- Both share the same deployment: `reminiscent-pigeon-138`

## After Running `npx convex dev`

The error should be resolved and the store-front will be able to access all `frontend/*` functions:
- `api.frontend.products.*`
- `api.frontend.cart.*`
- `api.frontend.promotions.*`
- `api.frontend.categories.*`
- etc.

