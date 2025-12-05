import { Skeleton } from "@/components/ui/skeleton";

export function ProjectCardSkeleton() {
  return (
    <div className="break-inside-avoid mb-6">
      <Skeleton className="w-full aspect-[4/3] rounded-md" />
    </div>
  );
}

export function ProjectGridSkeleton() {
  const heights = ["h-48", "h-64", "h-56", "h-72", "h-60", "h-52"];
  
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="break-inside-avoid mb-6">
          <Skeleton className={`w-full ${heights[i]} rounded-md`} />
        </div>
      ))}
    </div>
  );
}

export function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen pt-16">
      <Skeleton className="w-full h-[60vh]" />
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
