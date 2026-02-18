# 🧩 Components Documentation

Complete reference for all components in Photoverse.

## 📋 Table of Contents

- [UI Components](#ui-components)
- [Feature Components](#feature-components)
- [Modal Components](#modal-components)
- [Layout Components](#layout-components)
- [Custom Hooks](#custom-hooks)

---

## UI Components

Base reusable components built with Radix UI primitives.

### Button

```typescript
import { Button } from '@/components/ui/button';

<Button variant="default" size="md">
  Click me
</Button>
```

**Variants:** `default`, `outline`, `ghost`, `destructive`
**Sizes:** `sm`, `md`, `lg`

### Input

```typescript
import { Input } from '@/components/ui/input';

<Input 
  type="text"
  placeholder="Enter text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Dialog

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

---

## Feature Components

### ImageGrid

Displays photos in a responsive grid grouped by upload date.

```typescript
import ImageGrid from '@/components/ImageGrid';

<ImageGrid photos={photos} route="photos" />
```

**Props:**
- `photos`: Photo[] - Array of photo objects
- `route`: string - Base route for photo links

**Features:**
- Responsive grid layout
- Lazy loading images
- Grouped by month
- Multi-select support
- Favorite indicators

### FolderCard

Displays a folder with thumbnail and actions.

```typescript
import FolderCard from '@/components/FolderCard';

<FolderCard 
  folder={folder}
  openRenameModal={() => setIsRenameOpen(true)}
/>
```

**Props:**
- `folder`: Folder - Folder object
- `openRenameModal`: () => void - Callback for rename action

---

## Modal Components

### CreateFolderModal

Modal for creating new folders.

```typescript
import CreateFolderModal from '@/components/modals/CreateFolderModal';

<CreateFolderModal
  value={folderName}
  setValue={setFolderName}
  setModalStatus={setModalStatus}
/>
```

### ImagePreviewModal

Full-screen image preview with actions.

```typescript
import ImageModal from '@/components/ImageModal';

<ImageModal 
  photo={selectedPhoto}
  onClose={() => setSelectedPhoto(null)}
/>
```

---

## Layout Components

### Header

Main navigation header.

```typescript
import Header from '@/components/Header';

<Header />
```

**Features:**
- Logo and branding
- Navigation links
- Auth buttons
- Mobile menu

### SideNav

Sidebar navigation for authenticated users.

```typescript
import SideNav from '@/components/SideNav';

<SideNav />
```

**Links:**
- Photos
- Folders
- Favorites
- Trash

---

## Custom Hooks

### useCurrentPage

Manages pagination state.

```typescript
import useCurrentPage from '@/hooks/useCurrentPage';

const { currentPage, setCurrentPage } = useCurrentPage();
```

### useApiMutation

Handles API mutations with error handling.

```typescript
import { handleApiMutation } from '@/hooks/useApiMutation';

const result = await handleApiMutation(
  createFolder({ foldername: 'New Folder' })
);

if (result.success) {
  // Handle success
}
```

---

<div align="center">

**[⬆ Back to Top](#-components-documentation)**

</div>
