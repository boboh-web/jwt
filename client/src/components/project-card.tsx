import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/project/${project.id}`}>
      <article
        className="group relative overflow-hidden rounded-md cursor-pointer break-inside-avoid mb-6"
        data-testid={`card-project-${project.id}`}
      >
        <div className="relative">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-white/80 line-clamp-2 mb-3">
              {project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 3).map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-white/20 text-white border-0 text-xs font-mono"
                >
                  {tech}
                </Badge>
              ))}
              {project.techStack.length > 3 && (
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-0 text-xs font-mono"
                >
                  +{project.techStack.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
