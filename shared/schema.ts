import { z } from "zod";

export const PROJECT_CATEGORIES = [
  "Web Development",
  "Mobile App",
  "UI/UX Design",
  "Branding",
  "E-commerce",
  "Dashboard",
  "API Development",
  "Other",
] as const;

export type ProjectCategory = typeof PROJECT_CATEGORIES[number];

export const insertProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  imageUrl: z.string(),
  galleryImages: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  category: z.string().default("Other"),
  liveUrl: z.string().optional().nullable(),
  repoUrl: z.string().optional().nullable(),
  client: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  date: z.string().optional().nullable(),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;

export interface Project extends InsertProject {
  id: string;
  views: number;
}
