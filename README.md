# Block-Builders Tech Website

Marketing website for Block-Builders Tech built with Astro + Tailwind CSS.

## Features

- 🌐 **Multilingual** - Spanish (default), English, Portuguese
- 🎨 **Modern Design** - Tailwind CSS with custom brand colors
- 📱 **Responsive** - Mobile-first design
- ⚡ **Fast** - Static site generation with Astro
- 🔒 **Git-based CMS** - Content stored in JSON files, edited via Admin Panel
- 🚀 **Vercel Deploy** - Automatic deployments on push

## Tech Stack

- **Framework**: Astro 4.x
- **Styling**: Tailwind CSS 3.x
- **UI Components**: React (for admin panel)
- **Icons**: Lucide React
- **Hosting**: Vercel
- **Content**: JSON/MDX files in `/content`

## Getting Started

```bash
# Clone the repository
git clone https://github.com/RoCas11/website.git
cd website

# Install dependencies
npm install

# Start development server
npm run dev
```

## Configuration

### Environment Variables

Create `.env` file:

```env
PUBLIC_SITE_URL=https://block-builders.tech
GITHUB_TOKEN=ghp_xxx
JWT_SECRET=your-secret-key
```

### Brand Colors

- Primary: `#1E3A8A`
- Dark: `#162247`
- Accent: `#034E7B`
- Light: `#3B82F6`

## Deployment

1. Connect repository to Vercel
2. Set environment variables
3. Deploy automatically on push to `main`

## License

Proprietary - Block-Builders Tech © 2026
