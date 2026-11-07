const Skeleton = ({ className = '' }) => (
  <div className={`skeleton rounded-xl ${className}`} />
)

export const DashboardSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-24 w-full rounded-2xl" />
    <div className="grid gap-4 sm:grid-cols-3">
      <Skeleton className="h-32 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
    </div>
    <Skeleton className="h-64 rounded-2xl" />
  </div>
)

export const CardGridSkeleton = ({ count = 6 }) => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: count }, (_, index) => (
      <Skeleton key={index} className="h-72 rounded-2xl" />
    ))}
  </div>
)

export const ListSkeleton = ({ count = 4 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }, (_, index) => (
      <Skeleton key={index} className="h-28 rounded-2xl" />
    ))}
  </div>
)

export default Skeleton
