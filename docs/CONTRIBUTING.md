# 🤝 Contributing to Photoverse

Thank you for your interest in contributing to Photoverse! This guide will help you get started.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Git

### Setup

1. **Fork the repository**

Click the "Fork" button on GitHub.

2. **Clone your fork**

```bash
git clone https://github.com/your-username/photoverse.git
cd photoverse
```

3. **Add upstream remote**

```bash
git remote add upstream https://github.com/original-owner/photoverse.git
```

4. **Install dependencies**

```bash
npm install
```

5. **Create environment file**

```bash
cp .env.example .env
```

6. **Start development server**

```bash
npm run dev
```

---

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

**Branch naming:**

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Tests

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
npm run lint
npm run build
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Go to GitHub
- Click "New Pull Request"
- Select your branch
- Fill in the PR template
- Submit

---

## Code Style

### TypeScript

```typescript
// Use TypeScript for all files
// Define interfaces for props
interface ButtonProps {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

// Use arrow functions for components
export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  children,
  onClick
}) => {
  return (
    <button className={cn(buttonVariants({ variant, size }))} onClick={onClick}>
      {children}
    </button>
  );
};
```

### React

```typescript
// Use functional components
// Use hooks for state and effects
// Destructure props
// Use meaningful variable names

const PhotoGrid = ({ photos, onSelect }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    onSelect?.(id);
  };

  return (
    <div className="grid">
      {photos.map(photo => (
        <PhotoCard key={photo._id} photo={photo} onSelect={handleSelect} />
      ))}
    </div>
  );
};
```

### Styling

```typescript
// Use Tailwind CSS classes
// Use cn() utility for conditional classes
// Follow mobile-first approach

<div className={cn(
  "flex items-center gap-4",
  "md:gap-6 lg:gap-8",
  isActive && "bg-primary text-primary-foreground"
)}>
  {/* Content */}
</div>
```

---

## Commit Guidelines

### Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

### Examples

```bash
feat(auth): add password reset flow
fix(photos): resolve image loading issue
docs(readme): update installation instructions
refactor(components): simplify ImageGrid logic
```

---

## Pull Request Process

### 1. Update Your Branch

```bash
git fetch upstream
git rebase upstream/main
```

### 2. Resolve Conflicts

If conflicts occur, resolve them and continue:

```bash
git add .
git rebase --continue
```

### 3. Push Changes

```bash
git push origin feature/your-feature-name --force
```

### 4. PR Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors
- [ ] Build passes
- [ ] Lint passes

### 5. Review Process

- Maintainers will review your PR
- Address feedback if requested
- Once approved, PR will be merged

---

## Questions?

- Open an issue for bugs
- Start a discussion for questions
- Email: support@photoverse.com

---

<div align="center">

**Thank you for contributing!** ❤️

</div>
