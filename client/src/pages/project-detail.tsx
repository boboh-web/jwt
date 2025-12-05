import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ArrowLeft, ExternalLink, Github, Calendar, User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectDetailSkeleton } from "@/components/project-skeleton";
import type { Project } from "@shared/schema";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ["/api/projects", id],
  });

  if (isLoading) {
    return <ProjectDetailSkeleton />;
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Project not found</h1>
          <p className="text-muted-foreground mb-6">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/">
            <Button data-testid="button-back-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-[60vh] w-full">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-4xl mx-auto">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="mb-6 w-fit bg-white/10 border-white/20 text-white backdrop-blur-sm"
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            {project.shortDescription}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-xs font-mono"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {project.date && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Calendar className="h-5 w-5" />
              <div>
                <p className="text-xs uppercase tracking-wider mb-1">Date</p>
                <p className="text-foreground font-medium">{project.date}</p>
              </div>
            </div>
          )}
          {project.client && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Briefcase className="h-5 w-5" />
              <div>
                <p className="text-xs uppercase tracking-wider mb-1">Client</p>
                <p className="text-foreground font-medium">{project.client}</p>
              </div>
            </div>
          )}
          {project.role && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <User className="h-5 w-5" />
              <div>
                <p className="text-xs uppercase tracking-wider mb-1">Role</p>
                <p className="text-foreground font-medium">{project.role}</p>
              </div>
            </div>
          )}
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none mb-12">
          <p className="text-base md:text-lg leading-relaxed whitespace-pre-wrap">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          {project.liveUrl && (
            <Button asChild data-testid="button-live-site">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Live Site
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <Button variant="outline" asChild data-testid="button-repo">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                View Repository
              </a>
            </Button>
          )}
        </div>

        {project.galleryImages && project.galleryImages.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-auto rounded-md object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
