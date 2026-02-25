/**
 * Shimmer skeleton placeholders for loading states.
 * Used as Suspense fallback and for image loading.
 */

function Shimmer({ className = '' }) {
  return (
    <div className={`animate-pulse bg-forest/5 ${className}`} />
  )
}

/** Skeleton for a single product card (matches Products.jsx / ProductsPage.jsx layout) */
export function ProductCardSkeleton() {
  return (
    <div className="card-kazepices bg-cream overflow-hidden flex flex-col">
      <Shimmer className="h-48 w-full" />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <Shimmer className="h-3 w-16 rounded" />
          <Shimmer className="h-3 w-20 rounded" />
        </div>
        <Shimmer className="h-5 w-3/4 rounded mt-1" />
        <Shimmer className="h-3 w-full rounded mt-3" />
        <Shimmer className="h-3 w-5/6 rounded mt-2" />
        <Shimmer className="h-10 w-full rounded-3xl mt-auto pt-4" />
      </div>
    </div>
  )
}

/** Grid of product card skeletons */
export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

/** Full page skeleton with hero banner and product grid (for ProductsPage Suspense) */
export function PageSkeleton() {
  return (
    <div className="min-h-dvh" role="status" aria-label="Loading page">
      {/* Hero skeleton */}
      <div className="bg-charcoal pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <Shimmer className="h-6 w-32 mx-auto rounded-4xl" />
          <Shimmer className="h-12 w-3/4 mx-auto rounded mt-8" />
          <Shimmer className="h-4 w-1/2 mx-auto rounded mt-6" />
        </div>
      </div>
      {/* Content skeleton */}
      <div className="py-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <ProductGridSkeleton />
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Shimmer
