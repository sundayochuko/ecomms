# Seed Default Categories

This guide explains how to populate the database with default categories for the store-front.

## Default Categories

The following categories will be created:

1. **Bakery** - Fresh bread, pastries, cakes, and baked goods
2. **Fruits & Vegetables** - Fresh fruits and vegetables, organic options available
3. **Meat & Fish** - Fresh meat, poultry, and seafood
4. **Cheese & Cold Cuts** - Artisanal cheeses, deli meats, and charcuterie
5. **Drinks & Beverages** - Soft drinks, juices, water, and alcoholic beverages
6. **Snacks & Sweets** - Chips, cookies, chocolates, and confectionery
7. **Pet Supplies** - Food, treats, and accessories for your pets

## How to Seed Categories

### Option 1: Via Dashboard (Recommended)

1. Open the Dashboard application
2. Navigate to the **Categories** page
3. Click the **"Seed Default Categories"** button
4. Confirm the action
5. The categories will be created (existing categories will be skipped)

### Option 2: Via Convex Dashboard

1. Go to your Convex Dashboard (https://dashboard.convex.dev)
2. Navigate to **Functions**
3. Find `frontend/categories:seedDefault` or `dashboard/categories:seedDefault`
4. Click **Run** to execute the function
5. The function will return a message showing which categories were created

### Option 3: Programmatically

You can also call the seed function from your code:

```typescript
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const seedDefaultCategories = useMutation(api.frontend.categories.seedDefault);

// Call it
await seedDefaultCategories();
```

## Notes

- The seed function is **idempotent** - it won't create duplicate categories
- If a category with the same slug already exists, it will be skipped
- You can run the seed function multiple times safely
- Additional categories can be added manually through the dashboard after seeding

