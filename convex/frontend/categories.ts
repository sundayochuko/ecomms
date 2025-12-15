import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

// 21. categories.list - Get all categories
export const list = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("categories")
      .order("asc")
      .collect();
  },
});

// 22. categories.getBySlug - Get category by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("categories")
      .withIndex("by_slug", (q: any) => q.eq("slug", args.slug))
      .first();
  },
});

// 23. categories.seedDefault - Seed default categories (idempotent)
export const seedDefault = mutation({
  handler: async (ctx) => {
    const defaultCategories = [
      {
        name: "Local Products",
        slug: "localproducts",
        description: "Locally sourced and produced products",
      },
      {
        name: "Bakery",
        slug: "bakery",
        description: "Fresh bread, pastries, cakes, and baked goods",
      },
      {
        name: "Fruits & Vegetables",
        slug: "fruits-&-vegetables",
        description: "Fresh fruits and vegetables, organic options available",
      },
      {
        name: "Meat & Fish",
        slug: "meat-&-fish",
        description: "Fresh meat, poultry, and seafood",
      },
      {
        name: "Dairy & Eggs",
        slug: "dairy-&-eggs",
        description: "Fresh dairy products, milk, cheese, and eggs",
      },
      {
        name: "Cheese & Cold Cuts",
        slug: "cheese-&-coldcuts",
        description: "Artisanal cheeses, deli meats, and charcuterie",
      },
      {
        name: "Snacks & Sweets",
        slug: "snacks-&-sweets",
        description: "Chips, cookies, chocolates, and confectionery",
      },
      {
        name: "Drinks & Beverages",
        slug: "drinks-&-beverages",
        description: "Soft drinks, juices, water, and alcoholic beverages",
      },
      {
        name: "Pet Supplies",
        slug: "pet-supplies",
        description: "Food, treats, and accessories for your pets",
      },
      {
        name: "Weekly Promotions",
        slug: "weekly-promotions",
        description: "Special deals and promotions available this week",
      },
    ];

    const createdCategories = [];
    const skippedCategories = [];

    for (const category of defaultCategories) {
      // Check if category with this slug already exists
      const existing = await ctx.db
        .query("categories")
        .withIndex("by_slug", (q: any) => q.eq("slug", category.slug))
        .first();

      if (existing) {
        skippedCategories.push(category.slug);
        continue;
      }

      // Create the category
      const categoryId = await ctx.db.insert("categories", {
        name: category.name,
        slug: category.slug,
        description: category.description,
      });

      createdCategories.push({
        id: categoryId,
        name: category.name,
        slug: category.slug,
      });
    }

    return {
      message: `Seeded ${createdCategories.length} categories. ${skippedCategories.length} already existed.`,
      created: createdCategories,
      skipped: skippedCategories,
    };
  },
});
