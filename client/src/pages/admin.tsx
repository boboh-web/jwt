import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  X,
  ImagePlus,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Project, InsertProject } from "@shared/schema";

const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Please enter a valid URL"),
  galleryImages: z.string().optional(),
  techStack: z.string().min(1, "At least one technology is required"),
  liveUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  repoUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  client: z.string().optional(),
  role: z.string().optional(),
  date: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

export default function Admin() {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      description: "",
      imageUrl: "",
      galleryImages: "",
      techStack: "",
      liveUrl: "",
      repoUrl: "",
      client: "",
      role: "",
      date: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertProject) => {
      return apiRequest("POST", "/api/projects", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project created successfully!" });
      handleCloseForm();
    },
    onError: () => {
      toast({ title: "Failed to create project", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertProject }) => {
      return apiRequest("PATCH", `/api/projects/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project updated successfully!" });
      handleCloseForm();
    },
    onError: () => {
      toast({ title: "Failed to update project", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project deleted successfully!" });
      setDeleteProject(null);
    },
    onError: () => {
      toast({ title: "Failed to delete project", variant: "destructive" });
    },
  });

  const handleOpenCreate = () => {
    form.reset({
      title: "",
      shortDescription: "",
      description: "",
      imageUrl: "",
      galleryImages: "",
      techStack: "",
      liveUrl: "",
      repoUrl: "",
      client: "",
      role: "",
      date: "",
    });
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    form.reset({
      title: project.title,
      shortDescription: project.shortDescription,
      description: project.description,
      imageUrl: project.imageUrl,
      galleryImages: project.galleryImages?.join(", ") || "",
      techStack: project.techStack.join(", "),
      liveUrl: project.liveUrl || "",
      repoUrl: project.repoUrl || "",
      client: project.client || "",
      role: project.role || "",
      date: project.date || "",
    });
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
    form.reset();
  };

  const onSubmit = (data: ProjectFormData) => {
    const projectData: InsertProject = {
      title: data.title,
      shortDescription: data.shortDescription,
      description: data.description,
      imageUrl: data.imageUrl,
      galleryImages: data.galleryImages
        ? data.galleryImages.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      techStack: data.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      liveUrl: data.liveUrl || null,
      repoUrl: data.repoUrl || null,
      client: data.client || null,
      role: data.role || null,
      date: data.date || null,
    };

    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data: projectData });
    } else {
      createMutation.mutate(projectData);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your portfolio projects</p>
          </div>
          <Button onClick={handleOpenCreate} data-testid="button-add-project">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Tech Stack</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id} data-testid={`row-project-${project.id}`}>
                    <TableCell>
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 2).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.techStack.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {project.date || "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        {project.liveUrl && (
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            data-testid={`button-view-${project.id}`}
                          >
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(project)}
                          data-testid={`button-edit-${project.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteProject(project)}
                          data-testid={`button-delete-${project.id}`}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border rounded-md">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <ImagePlus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground max-w-sm mb-6">
              Get started by adding your first project to your portfolio.
            </p>
            <Button onClick={handleOpenCreate} data-testid="button-add-first-project">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Project
            </Button>
          </div>
        )}

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
              <DialogDescription>
                {editingProject
                  ? "Update the project details below."
                  : "Fill in the details to add a new project to your portfolio."}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Project title"
                          {...field}
                          data-testid="input-project-title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Brief one-line description"
                          {...field}
                          data-testid="input-project-short-desc"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed project description..."
                          className="min-h-32 resize-none"
                          {...field}
                          data-testid="input-project-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image URL *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                          data-testid="input-project-image"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="galleryImages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gallery Images (comma-separated URLs)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                          {...field}
                          data-testid="input-project-gallery"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="techStack"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tech Stack * (comma-separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="React, TypeScript, Node.js"
                          {...field}
                          data-testid="input-project-tech"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="liveUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Live Site URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://project.com"
                            {...field}
                            data-testid="input-project-live"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="repoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repository URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://github.com/..."
                            {...field}
                            data-testid="input-project-repo"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Client name"
                            {...field}
                            data-testid="input-project-client"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Lead Developer"
                            {...field}
                            data-testid="input-project-role"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="2024"
                            {...field}
                            data-testid="input-project-date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseForm}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending} data-testid="button-save">
                    {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingProject ? "Update Project" : "Create Project"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <AlertDialog open={!!deleteProject} onOpenChange={() => setDeleteProject(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Project</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{deleteProject?.title}"? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-testid="button-cancel-delete">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteProject && deleteMutation.mutate(deleteProject.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                data-testid="button-confirm-delete"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
