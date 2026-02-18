# 🚀 Deployment Documentation

Guide to deploying Photoverse to various platforms.

## 📋 Table of Contents

- [Vercel Deployment](#vercel-deployment)
- [Environment Variables](#environment-variables)
- [Build Configuration](#build-configuration)
- [Performance Tips](#performance-tips)

---

## Vercel Deployment

### Quick Deploy

1. **Push to GitHub**

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Click "Deploy"

3. **Configure Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records

### Automatic Deployments

Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

---

## Environment Variables

### Required Variables

Add these in Vercel dashboard (Settings → Environment Variables):

```env
NEXT_PUBLIC_URL=https://your-domain.vercel.app
NEXT_PUBLIC_BASE_URL=https://your-api-domain.com/api/v1/
NEXT_PUBLIC_CLOUDNAME=your_cloudinary_cloud_name
NODE_ENV=production
```

### Variable Scopes

- **Production**: Used in production deployments
- **Preview**: Used in preview deployments
- **Development**: Used locally (not needed in Vercel)

---

## Build Configuration

### next.config.ts

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async rewrites() {
    return [
      { 
        source: '/api/v1/:path*', 
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}:path*` 
      }
    ];
  },
};
```

### Build Command

```bash
npm run build
```

### Output

- Static pages: `.next/static/`
- Server functions: `.next/server/`
- Build manifest: `.next/build-manifest.json`

---

## Performance Tips

### 1. Image Optimization

- Use Next.js Image component
- Configure Cloudinary loader
- Set appropriate image sizes

### 2. Code Splitting

- Use dynamic imports for large components
- Lazy load modals and heavy features

### 3. Caching

- Configure cache headers
- Use RTK Query cache
- Enable SWR for data fetching

### 4. Bundle Size

```bash
# Analyze bundle size
npm run build
```

Check `.next/analyze/` for bundle analysis.

---

<div align="center">

**[⬆ Back to Top](#-deployment-documentation)**

</div>
