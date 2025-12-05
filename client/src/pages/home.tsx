import { useQuery } from "@tanstack/react-query";
import { ProjectGrid } from "@/components/project-grid";
import { ProjectGridSkeleton } from "@/components/project-skeleton";
import type { Project } from "@shared/schema";

export default function Home() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">
            A collection of my recent work and creative projects
          </p>
        </div>
        {isLoading ? (
          <ProjectGridSkeleton />
        ) : (
          <ProjectGrid projects={projects || []} />
        )}
      </div>
    </div>
  );
}
