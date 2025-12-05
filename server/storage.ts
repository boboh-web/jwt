import { type Project, type InsertProject } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: InsertProject): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;

  constructor() {
    this.projects = new Map();
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      id,
      title: insertProject.title,
      description: insertProject.description,
      shortDescription: insertProject.shortDescription,
      imageUrl: insertProject.imageUrl,
      galleryImages: insertProject.galleryImages || [],
      techStack: insertProject.techStack || [],
      liveUrl: insertProject.liveUrl || null,
      repoUrl: insertProject.repoUrl || null,
      client: insertProject.client || null,
      role: insertProject.role || null,
      date: insertProject.date || null,
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, insertProject: InsertProject): Promise<Project | undefined> {
    const existing = this.projects.get(id);
    if (!existing) {
      return undefined;
    }
    const updated: Project = {
      id,
      title: insertProject.title,
      description: insertProject.description,
      shortDescription: insertProject.shortDescription,
      imageUrl: insertProject.imageUrl,
      galleryImages: insertProject.galleryImages || [],
      techStack: insertProject.techStack || [],
      liveUrl: insertProject.liveUrl || null,
      repoUrl: insertProject.repoUrl || null,
      client: insertProject.client || null,
      role: insertProject.role || null,
      date: insertProject.date || null,
    };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }
}

export const storage = new MemStorage();
