/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as frontend_cart from "../frontend/cart.js";
import type * as frontend_categories from "../frontend/categories.js";
import type * as frontend_orders from "../frontend/orders.js";
import type * as frontend_products from "../frontend/products.js";
import type * as frontend_promotions from "../frontend/promotions.js";
import type * as frontend_stores from "../frontend/stores.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "frontend/cart": typeof frontend_cart;
  "frontend/categories": typeof frontend_categories;
  "frontend/orders": typeof frontend_orders;
  "frontend/products": typeof frontend_products;
  "frontend/promotions": typeof frontend_promotions;
  "frontend/stores": typeof frontend_stores;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
