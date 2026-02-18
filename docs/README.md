# 📚 Photoverse Documentation

Welcome to the comprehensive documentation for Photoverse - a modern cloud-based photo management platform.

## 📖 Documentation Index

### Getting Started
- [Main README](../README.md) - Project overview and quick start
- [Installation Guide](#installation-guide) - Detailed setup instructions
- [Environment Configuration](#environment-configuration) - Environment variables explained

### Architecture & Design
- [Architecture Overview](./ARCHITECTURE.md) - System architecture and design patterns
- [Project Structure](./ARCHITECTURE.md#project-structure) - Detailed folder structure
- [State Management](./ARCHITECTURE.md#state-management) - Redux store and data flow
- [Routing](./ARCHITECTURE.md#routing) - Next.js App Router structure

### Features & Components
- [Components Guide](./COMPONENTS.md) - All components documented
- [UI Components](./COMPONENTS.md#ui-components) - Base UI component library
- [Feature Components](./COMPONENTS.md#feature-components) - Feature-specific components
- [Custom Hooks](./COMPONENTS.md#custom-hooks) - Reusable React hooks

### API & Backend
- [API Documentation](./API.md) - Complete API reference
- [Authentication](./AUTHENTICATION.md) - Auth flows and security
- [Error Handling](./API.md#error-handling) - Error responses and handling

### Deployment & Operations
- [Deployment Guide](./DEPLOYMENT.md) - Deploy to various platforms
- [Environment Setup](./DEPLOYMENT.md#environment-setup) - Production configuration
- [Performance Optimization](./DEPLOYMENT.md#performance) - Optimization tips

### Development
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute
- [Code Style](./CONTRIBUTING.md#code-style) - Coding standards
- [Testing](./CONTRIBUTING.md#testing) - Testing guidelines

---

## 🚀 Quick Links

### For Users
- **Live Application**: [https://photoverse-eight.vercel.app](https://photoverse-eight.vercel.app)
- **User Guide**: Coming soon
- **FAQ**: Coming soon

### For Developers
- **GitHub Repository**: [Your Repository URL]
- **API Documentation**: [API.md](./API.md)
- **Component Library**: [COMPONENTS.md](./COMPONENTS.md)
- **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)

### For Contributors
- **Contributing Guide**: [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Code of Conduct**: Coming soon
- **Development Setup**: [Installation Guide](#installation-guide)

---

## 📦 Installation Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.x or higher
  ```bash
  node --version  # Should be v20.x.x or higher
  ```

- **npm**: Version 10.x or higher
  ```bash
  npm --version  # Should be 10.x.x or higher
  ```

- **Git**: Latest version
  ```bash
  git --version
  ```

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/yourusername/photoverse.git

# Or using SSH
git clone git@github.com:yourusername/photoverse.git

# Navigate to project directory
cd photoverse
```

#### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 4
- Redux Toolkit 2.8
- And all other dependencies listed in `package.json`

#### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# On Windows
copy .env.example .env

# On macOS/Linux
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Application URLs
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:8000/api/v1/

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDNAME=your_cloudinary_cloud_name

# Environment
NODE_ENV=development
```

#### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

#### 5. Verify Installation

Open your browser and navigate to:
- **Landing Page**: http://localhost:3000
- **Login Page**: http://localhost:3000/auth/login
- **Register Page**: http://localhost:3000/auth/register

---

## ⚙️ Environment Configuration

### Required Environment Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_URL` | Frontend application URL | `https://photoverse-eight.vercel.app` | Yes |
| `NEXT_PUBLIC_BASE_URL` | Backend API base URL | `http://localhost:8000/api/v1/` | Yes |
| `NEXT_PUBLIC_CLOUDNAME` | Cloudinary cloud name | `your_cloud_name` | Yes |
| `NODE_ENV` | Environment mode | `development` or `production` | Yes |

### Environment-Specific Configuration

#### Development Environment

```env
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:8000/api/v1/
NEXT_PUBLIC_CLOUDNAME=your_dev_cloudname
NODE_ENV=development
```

#### Production Environment

```env
NEXT_PUBLIC_URL=https://photoverse-eight.vercel.app
NEXT_PUBLIC_BASE_URL=https://api.photoverse.com/api/v1/
NEXT_PUBLIC_CLOUDNAME=your_prod_cloudname
NODE_ENV=production
```

### Cloudinary Setup

1. **Create a Cloudinary Account**
   - Go to [cloudinary.com](https://cloudinary.com/)
   - Sign up for a free account

2. **Get Your Cloud Name**
   - Navigate to Dashboard
   - Copy your "Cloud name"
   - Add it to `NEXT_PUBLIC_CLOUDNAME`

3. **Configure Upload Presets** (if needed)
   - Go to Settings > Upload
   - Create an unsigned upload preset
   - Note the preset name for backend configuration

---

## 🏗️ Build & Production

### Building for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Build Output

The build process creates:
- Optimized JavaScript bundles
- Static HTML pages
- Optimized images
- CSS files

Output location: `.next/` directory

### Build Verification

After building, verify:
1. No TypeScript errors
2. No ESLint warnings
3. All pages render correctly
4. Images load properly
5. API calls work

---

## 🧪 Development Tools

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Type check (if configured)
npm run type-check
```

### Recommended VS Code Extensions

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Tailwind CSS IntelliSense**: Tailwind autocomplete
- **TypeScript**: Enhanced TypeScript support
- **Auto Rename Tag**: HTML/JSX tag renaming
- **Path Intellisense**: Path autocomplete

### Browser DevTools

Recommended browser extensions:
- **React Developer Tools**: Component inspection
- **Redux DevTools**: State debugging
- **Lighthouse**: Performance auditing

---

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Error: Port 3000 is already in use

# Solution: Use a different port
PORT=3001 npm run dev
```

#### Module Not Found

```bash
# Error: Cannot find module 'xyz'

# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Environment Variables Not Loading

```bash
# Solution: Restart development server
# Environment variables are loaded at build time
npm run dev
```

#### Image Loading Issues

```bash
# Check Cloudinary configuration
# Verify NEXT_PUBLIC_CLOUDNAME is correct
# Check next.config.ts image domains
```

### Getting Help

If you encounter issues:

1. **Check Documentation**: Review relevant docs
2. **Search Issues**: Check GitHub issues
3. **Ask Community**: Open a new issue
4. **Contact Support**: Email support@photoverse.com

---

## 📚 Additional Resources

### Official Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)

### Learning Resources

- [Next.js Learn Course](https://nextjs.org/learn)
- [React Tutorial](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/utility-first)

### Community

- [Next.js Discord](https://discord.gg/nextjs)
- [React Community](https://react.dev/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

---

## 🔄 Keeping Up to Date

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all dependencies
npm update

# Update specific package
npm update package-name

# Update to latest versions (use with caution)
npx npm-check-updates -u
npm install
```

### Following Project Updates

- **Watch Repository**: Get notified of new releases
- **Read Changelog**: Check CHANGELOG.md for updates
- **Follow Blog**: Stay updated with new features

---

## 📞 Support & Contact

### Getting Support

- **Documentation**: Start here first
- **GitHub Issues**: Report bugs or request features
- **Email**: support@photoverse.com
- **Community**: Join our Discord (coming soon)

### Reporting Issues

When reporting issues, include:
1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: How to reproduce the issue
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, Node version, browser
6. **Screenshots**: If applicable

---

<div align="center">

**[⬆ Back to Top](#-photoverse-documentation)**

Made with ❤️ by the Photoverse Team

</div>
