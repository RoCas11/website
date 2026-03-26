import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { Locale } from './i18n';

const CONTENT_DIR = join(process.cwd(), 'content');

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
  locale: Locale;
  published: boolean;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  industry: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  order: number;
  active: boolean;
}

export interface Alliance {
  id: string;
  name: string;
  logo: string;
  url: string;
  description: Record<Locale, string>;
  order: number;
  active: boolean;
}

export interface Video {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  url: string;
  thumbnail: string;
  category: string;
  duration: string;
  date: string;
  active: boolean;
}

export interface PageContent {
  slug: string;
  locale: Locale;
  sections: Record<string, any>;
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
}

function readJSON<T>(filePath: string): T | null {
  try {
    if (!existsSync(filePath)) return null;
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

function listJSONFiles(dirPath: string): string[] {
  try {
    if (!existsSync(dirPath)) return [];
    return readdirSync(dirPath)
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
  } catch {
    return [];
  }
}

export function getBlogPosts(locale: Locale): BlogPost[] {
  const dir = join(CONTENT_DIR, 'blog', locale);
  const slugs = listJSONFiles(dir);
  
  return slugs
    .map(slug => {
      const post = readJSON<Omit<BlogPost, 'slug' | 'locale'>>(join(dir, `${slug}.json`));
      if (!post) return null;
      return { ...post, slug, locale };
    })
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string, locale: Locale): BlogPost | null {
  const filePath = join(CONTENT_DIR, 'blog', locale, `${slug}.json`);
  const post = readJSON<Omit<BlogPost, 'slug' | 'locale'>>(filePath);
  if (!post) return null;
  return { ...post, slug, locale };
}

export function getClients(): Client[] {
  const dir = join(CONTENT_DIR, 'clientes');
  const ids = listJSONFiles(dir);
  
  return ids
    .map(id => {
      const client = readJSON<Omit<Client, 'id'>>(join(dir, `${id}.json`));
      if (!client) return null;
      return { ...client, id };
    })
    .filter((client): client is Client => client !== null && client.active)
    .sort((a, b) => a.order - b.order);
}

export function getAlliances(): Alliance[] {
  const dir = join(CONTENT_DIR, 'alianzas');
  const ids = listJSONFiles(dir);
  
  return ids
    .map(id => {
      const alliance = readJSON<Omit<Alliance, 'id'>>(join(dir, `${id}.json`));
      if (!alliance) return null;
      return { ...alliance, id };
    })
    .filter((alliance): alliance is Alliance => alliance !== null && alliance.active)
    .sort((a, b) => a.order - b.order);
}

export function getVideos(): Video[] {
  const dir = join(CONTENT_DIR, 'videos');
  const ids = listJSONFiles(dir);
  
  return ids
    .map(id => {
      const video = readJSON<Omit<Video, 'id'>>(join(dir, `${id}.json`));
      if (!video) return null;
      return { ...video, id };
    })
    .filter((video): video is Video => video !== null && video.active)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPageContent(slug: string, locale: Locale): PageContent | null {
  const filePath = join(CONTENT_DIR, 'pages', locale, `${slug}.json`);
  const content = readJSON<Omit<PageContent, 'slug' | 'locale'>>(filePath);
  if (!content) return null;
  return { ...content, slug, locale };
}

export function getConfig<T>(name: string): T | null {
  return readJSON<T>(join(CONTENT_DIR, 'config', `${name}.json`));
}

export function getSettings() {
  return getConfig<any>('settings');
}

export function getNavigation() {
  return getConfig<any>('navigation');
}

export function getSeoConfig() {
  return getConfig<any>('seo');
}
