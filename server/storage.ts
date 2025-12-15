import { type Project, type InsertProject } from "../shared/schema";
import { supabase } from "./db.ts";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: InsertProject): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  incrementProjectViews(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getAllProjects(): Promise<Project[]> {
    const { data, error } = await supabase.from("projects").select("*");
    if (error) throw error;
    return data as Project[];
  }

  async getProject(id: string): Promise<Project | undefined> {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return undefined;
    return data as Project;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const { data, error } = await supabase
      .from("projects")
      .insert({ id, ...insertProject })
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  }

  async updateProject(id: string, insertProject: InsertProject): Promise<Project | undefined> {
    const { data, error } = await supabase
      .from("projects")
      .update(insertProject)
      .eq("id", id)
      .select()
      .single();

    if (error) return undefined;
    return data as Project;
  }

  async deleteProject(id: string): Promise<boolean> {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    return !error;
  }

  async incrementProjectViews(id: string): Promise<void> {
    // Note: Supabase doesn't support atomic increment easily via client without RPC.
    // For now, we'll fetch, increment, and update. Ideally, use an RPC function.
    const project = await this.getProject(id);
    if (project) {
      await this.updateProject(id, { ...project, views: (project.views || 0) + 1 });
    }
  }
}

export const storage = new DatabaseStorage();
