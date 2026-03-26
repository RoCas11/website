import type { APIRoute } from 'astro';

const JWT_SECRET = import.meta.env.JWT_SECRET || 'development-secret';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Simple dev auth - replace with proper auth in production
    if (email === 'admin@block-builders.tech' && password === 'admin123') {
      return new Response(
        JSON.stringify({ token: 'dev-token', user: { email, role: 'admin' } }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: 'Invalid credentials' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
