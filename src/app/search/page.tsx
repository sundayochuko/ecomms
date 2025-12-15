"use client";

import { Suspense } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/Ui/ProductCard";

const SearchContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const searchResults = useQuery(
    api.frontend.products.search,
    query ? { query } : "skip"
  );

  return (
    <div className="min-h-screen w-full px-5 mt-[90px] py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-greencolor mb-4">
          Search Results
        </h1>
        {query && (
          <p className="text-gray-600 mb-8">
            Results for &quot;{query}&quot;
          </p>
        )}

        {!query ? (
          <div className="text-center py-20">
            <p>Please enter a search query</p>
          </div>
        ) : searchResults === undefined ? (
          <div className="text-center py-20">
            <p>Searching...</p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-20">
            <p>No products found for &quot;{query}&quot;</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full px-5 mt-[90px] py-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <p>Loading search...</p>
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
};

export default SearchPage;

