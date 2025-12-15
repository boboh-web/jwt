CREATE TABLE projects (
  id VARCHAR(36) PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  category TEXT DEFAULT 'Other',
  live_url TEXT,
  repo_url TEXT,
  client TEXT,
  role TEXT,
  date TEXT,
  views INTEGER DEFAULT 0
);
