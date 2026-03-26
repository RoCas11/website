import type { APIRoute } from 'astro';

const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN;
const REPO_OWNER = 'RoCas11';
const REPO_NAME = 'website';

interface BlogPostPayload {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image?: string;
  tags?: string[];
  locale?: 'es' | 'en' | 'pt';
  slug?: string;
}

function generateSlug(title: string): string {
  return title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    const expectedToken = import.meta.env.WEBHOOK_SECRET || 'webhook-secret';
    
    if (authHeader !== `Bearer ${expectedToken}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    
    const payload: BlogPostPayload = await request.json();
    
    if (!payload.title || !payload.content || !payload.author) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    
    const locale = payload.locale || 'es';
    const slug = payload.slug || generateSlug(payload.title);
    const date = new Date().toISOString().split('T')[0];
    
    const postContent = {
      title: payload.title,
      excerpt: payload.excerpt || payload.content.substring(0, 160),
      content: payload.content,
      author: payload.author,
      date,
      image: payload.image || '/images/blog/default.jpg',
      tags: payload.tags || [],
      published: true
    };
    
    const filePath = `content/blog/${locale}/${slug}.json`;
    const encodedContent = Buffer.from(JSON.stringify(postContent, null, 2)).toString('base64');
    
    if (GITHUB_TOKEN) {
      const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `Add blog post: ${payload.title}`, content: encodedContent, branch: 'main' })
      });
      
      if (!response.ok) {
        return new Response(JSON.stringify({ error: 'Failed to commit' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }
    }
    
    return new Response(JSON.stringify({ success: true, slug, locale }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
