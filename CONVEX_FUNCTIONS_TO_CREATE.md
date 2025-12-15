# Convex Functions You Need to Create

## ⚠️ Important
You need to create these functions in your **e-commerce dashboard's Convex project**, not in this project. This project is just consuming the functions.

## Required File Structure

In your dashboard's Convex project, create these files:

### 1. `convex/frontend/products.ts`

```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";

// Get all local products
export const getLocal = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("isLocal"), true))
      .collect();
  },
});

// Get product by ID
export const getById = query({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.productId);
  },
});

// Get products by category
export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();
  },
});

// Search products
export const search = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const searchTerm = args.query.toLowerCase();
    const allProducts = await ctx.db.query("products").collect();
    
    return allProducts.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";
      return name.includes(searchTerm) || description.includes(searchTerm);
    });
  },
});
```

### 2. `convex/frontend/promotions.ts`

```typescript
import { query } from "./_generated/server";

// Get promotion statistics
export const getStats = query({
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    
    const productsOnSale = products.filter(
      (p) => p.originalPrice && p.originalPrice > p.price
    );
    
    const maxDiscount = productsOnSale.reduce((max, product) => {
      if (product.originalPrice && product.price) {
        const discount = Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        );
        return Math.max(max, discount);
      }
      return max;
    }, 0);
    
    return {
      totalProductsOnSale: productsOnSale.length,
      maxDiscount: maxDiscount,
      daysRemaining: 7, // You can calculate this based on promotion end dates
    };
  },
});

// Get products on sale
export const getProductsOnSale = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const products = await ctx.db.query("products").collect();
    
    const saleProducts = products
      .filter((p) => p.originalPrice && p.originalPrice > p.price)
      .slice(0, args.limit || 10);
    
    return saleProducts;
  },
});
```

### 3. `convex/frontend/cart.ts`

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get user's cart
export const get = query({
  args: {
    sessionId: v.optional(v.string()),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identifier = args.userId || args.sessionId;
    if (!identifier) return [];
    
    const cartItems = await ctx.db
      .query("cartItems")
      .filter((q) =>
        args.userId
          ? q.eq(q.field("userId"), args.userId)
          : q.eq(q.field("sessionId"), args.sessionId)
      )
      .collect();
    
    // Populate product data
    const itemsWithProducts = await Promise.all(
      cartItems.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        return {
          ...item,
          product,
        };
      })
    );
    
    return itemsWithProducts;
  },
});

// Get cart totals
export const getTotal = query({
  args: {
    sessionId: v.optional(v.string()),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cartItems")
      .filter((q) =>
        args.userId
          ? q.eq(q.field("userId"), args.userId)
          : q.eq(q.field("sessionId"), args.sessionId)
      )
      .collect();
    
    let subtotal = 0;
    for (const item of cartItems) {
      const product = await ctx.db.get(item.productId);
      if (product) {
        subtotal += product.price * item.quantity;
      }
    }
    
    const pickupFee = 0; // FREE
    const total = subtotal + pickupFee;
    
    return {
      subtotal,
      pickupFee,
      total,
    };
  },
});

// Add item to cart
export const add = mutation({
  args: {
    productId: v.id("products"),
    quantity: v.number(),
    sessionId: v.optional(v.string()),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identifier = args.userId || args.sessionId;
    if (!identifier) {
      throw new Error("Session ID or User ID required");
    }
    
    // Check if item already exists in cart
    const existingItem = await ctx.db
      .query("cartItems")
      .filter((q) =>
        q.and(
          q.eq(q.field("productId"), args.productId),
          args.userId
            ? q.eq(q.field("userId"), args.userId)
            : q.eq(q.field("sessionId"), args.sessionId)
        )
      )
      .first();
    
    if (existingItem) {
      // Update quantity
      await ctx.db.patch(existingItem._id, {
        quantity: existingItem.quantity + args.quantity,
      });
    } else {
      // Create new cart item
      await ctx.db.insert("cartItems", {
        productId: args.productId,
        quantity: args.quantity,
        sessionId: args.sessionId,
        userId: args.userId,
      });
    }
  },
});

// Update cart item quantity
export const updateQuantity = mutation({
  args: {
    cartItemId: v.id("cartItems"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    if (args.quantity <= 0) {
      await ctx.db.delete(args.cartItemId);
    } else {
      await ctx.db.patch(args.cartItemId, {
        quantity: args.quantity,
      });
    }
  },
});

// Remove item from cart
export const remove = mutation({
  args: { cartItemId: v.id("cartItems") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.cartItemId);
  },
});

// Checkout
export const checkout = mutation({
  args: {
    sessionId: v.optional(v.string()),
    userId: v.optional(v.string()),
    storeLocationId: v.optional(v.string()),
    customerEmail: v.optional(v.string()),
    customerName: v.optional(v.string()),
    paymentMethod: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identifier = args.userId || args.sessionId;
    if (!identifier) {
      throw new Error("Session ID or User ID required");
    }
    
    // Get cart items
    const cartItems = await ctx.db
      .query("cartItems")
      .filter((q) =>
        args.userId
          ? q.eq(q.field("userId"), args.userId)
          : q.eq(q.field("sessionId"), args.sessionId)
      )
      .collect();
    
    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }
    
    // Calculate totals
    let subtotal = 0;
    const orderItems = [];
    
    for (const item of cartItems) {
      const product = await ctx.db.get(item.productId);
      if (product) {
        subtotal += product.price * item.quantity;
        orderItems.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        });
      }
    }
    
    const pickupFee = 0;
    const total = subtotal + pickupFee;
    
    // Create order
    const orderId = await ctx.db.insert("orders", {
      userId: args.userId,
      items: orderItems,
      storeLocationId: args.storeLocationId,
      subtotal,
      pickupFee,
      total,
      status: "pending",
      customerEmail: args.customerEmail,
      customerName: args.customerName,
      paymentMethod: args.paymentMethod,
    });
    
    // Clear cart
    for (const item of cartItems) {
      await ctx.db.delete(item._id);
    }
    
    return { orderId };
  },
});
```

## Required Schema

Make sure you have these tables in your Convex schema:

### `products` table
- `_id`: Id<"products">
- `name`: string
- `description`: string (optional)
- `price`: number
- `originalPrice`: number (optional)
- `image`: string
- `imageUrl`: string (optional)
- `category`: string
- `isLocal`: boolean
- `unit`: string (optional)
- `inStock`: boolean

### `cartItems` table
- `_id`: Id<"cartItems">
- `productId`: Id<"products">
- `quantity`: number
- `sessionId`: string (optional)
- `userId`: string (optional)

### `orders` table
- `_id`: Id<"orders">
- `userId`: string (optional)
- `items`: Array<{ productId, quantity, price }>
- `storeLocationId`: string (optional)
- `subtotal`: number
- `pickupFee`: number
- `total`: number
- `status`: string
- `customerEmail`: string (optional)
- `customerName`: string (optional)
- `paymentMethod`: string (optional)

## Steps to Create

1. **Go to your e-commerce dashboard Convex project**
2. **Create the folder structure**: `convex/frontend/`
3. **Create the three files** above with the functions
4. **Deploy**: Run `npx convex deploy` in your dashboard project
5. **Verify**: Check that the functions appear in your Convex dashboard

## After Creating Functions

Once you've created and deployed these functions:
1. The errors will disappear
2. Your app will be able to fetch data from Convex
3. Make sure your `.env.local` has the correct `NEXT_PUBLIC_CONVEX_URL`

## Note

These are basic implementations. You may need to adjust them based on your actual schema and business logic.

