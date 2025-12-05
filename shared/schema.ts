import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
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

export const projects = pgTable("projects", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  imageUrl: text("image_url").notNull(),
  galleryImages: text("gallery_images").array().default([]),
  techStack: text("tech_stack").array().notNull().default([]),
  category: text("category").default("Other"),
  liveUrl: text("live_url"),
  repoUrl: text("repo_url"),
  client: text("client"),
  role: text("role"),
  date: text("date"),
  views: integer("views").default(0),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  views: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
