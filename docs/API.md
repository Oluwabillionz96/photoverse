# 🔌 API Documentation

Complete API reference for Photoverse backend integration.

## 📋 Table of Contents

- [Overview](#overview)
- [Base Configuration](#base-configuration)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Auth Endpoints](#auth-endpoints)
  - [Photo Endpoints](#photo-endpoints)
  - [Folder Endpoints](#folder-endpoints)
  - [Favorite Endpoints](#favorite-endpoints)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Examples](#examples)

---

## Overview

### Base URL

```
Development: http://localhost:8000/api/v1/
Production: https://api.photoverse.com/api/v1/
```

### Authentication

All authenticated endpoints require:
- **JWT Token**: Stored in HTTP-only cookie
- **CSRF Token**: Sent in `X-XSRF-TOKEN` header

### Request Format

```http
POST /api/v1/endpoint
Content-Type: application/json
X-XSRF-TOKEN: <csrf-token>
Cookie: jwt=<token>; XSRF-TOKEN=<csrf-token>

{
  "key": "value"
}
```

### Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { }
}
```

---

## Base Configuration

### Axios Instance

```typescript
// lib/axios.ts
import axios from 'axios';
import { getCsrfToken } from './utils';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add CSRF token
axiosInstance.interceptors.request.use(
  (config) => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

### RTK Query Base Query

```typescript
// services/api.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCsrfToken } from '@/lib/utils';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  credentials: 'include',
  prepareHeaders: (headers) => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      headers.set('X-XSRF-TOKEN', csrfToken);
    }
    return headers;
  },
});

// Base query with automatic token refresh
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try to refresh token
    const refreshResult = await baseQuery(
      { url: 'auth/refresh', method: 'POST' },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Redirect to login
      window.location.href = '/auth/login';
    }
  }

  return result;
};
```

---

## Authentication

### Security Features

1. **JWT Tokens**: Stored in HTTP-only cookies
2. **CSRF Protection**: X-XSRF-TOKEN header validation
3. **Token Refresh**: Automatic refresh on expiration
4. **Secure Cookies**: SameSite and Secure flags
5. **Password Hashing**: Bcrypt with salt

### Token Flow

```
1. User logs in
2. Server generates JWT + CSRF token
3. JWT stored in HTTP-only cookie
4. CSRF token stored in regular cookie
5. Client sends CSRF token in header
6. Server validates both tokens
```

---

## Endpoints

### Auth Endpoints

#### Register User

```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "data": {
    "email": "user@example.com",
    "verificationId": "abc123"
  }
}
```

**Validation Rules:**
- Email: Valid email format
- Password: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char

---

#### Verify OTP

```http
POST /auth/verify-otp
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "isVerified": true
    }
  }
}
```

**Notes:**
- OTP expires in 10 minutes
- Maximum 3 attempts
- Sets JWT cookie on success

---

#### Login

```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (Verified User):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com"
    }
  }
}
```

**Response (Unverified User):**
```json
{
  "success": false,
  "message": "Please verify your email",
  "requiresVerification": true
}
```

---

#### Logout

```http
POST /auth/logout
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Notes:**
- Clears JWT cookie
- Clears CSRF token
- Invalidates session

---

#### Refresh Token

```http
POST /auth/refresh
```

**Response:**
```json
{
  "success": true,
  "message": "Token refreshed",
  "data": {
    "expiresIn": 3600
  }
}
```

**Notes:**
- Automatically called by client on 401
- Returns new JWT in cookie
- Returns new CSRF token

---

#### Get Current User

```http
GET /auth/me
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "isVerified": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

#### Resend OTP

```http
POST /auth/resend-otp?type=account_verification
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Query Parameters:**
- `type`: `account_verification` or `password_reset`

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

---

### Photo Endpoints

#### Get Photos

```http
GET /photos?limit=60&page=1
```

**Query Parameters:**
- `limit`: Number of photos per page (default: 60)
- `page`: Page number (default: 1)

**Response:**
```json
{
  "success": true,
  "data": {
    "photos": [
      {
        "_id": "photo_id",
        "link": "https://res.cloudinary.com/...",
        "folderId": "folder_id",
        "folderName": "General",
        "isFavourite": false,
        "uploadedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "totalPages": 5,
    "currentPage": 1,
    "totalPhotos": 247
  }
}
```

---

#### Get Single Photo

```http
GET /photos/one/:photoId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "photo_id",
    "link": "https://res.cloudinary.com/...",
    "folderId": "folder_id",
    "folderName": "Vacation 2024",
    "isFavourite": true,
    "uploadedAt": "2024-01-01T00:00:00.000Z",
    "metadata": {
      "width": 1920,
      "height": 1080,
      "format": "jpg",
      "size": 245678
    }
  }
}
```

---

#### Get Folder Photos

```http
GET /photos/:folderName?limit=60&page=1
```

**Path Parameters:**
- `folderName`: Name of the folder

**Query Parameters:**
- `limit`: Number of photos per page
- `page`: Page number

**Response:**
```json
{
  "success": true,
  "data": {
    "photos": [...],
    "totalPages": 3,
    "currentPage": 1,
    "totalPhotos": 156,
    "folderName": "Vacation 2024"
  }
}
```

---

#### Upload Photos

```http
POST /photos/upload
Content-Type: multipart/form-data
```

**Request Body:**
```
FormData:
- photos: File[] (multiple files)
- folderId: string (optional)
- folderName: string (optional)
```

**Response:**
```json
{
  "success": true,
  "message": "Photos uploaded successfully",
  "data": {
    "uploaded": 5,
    "photos": [
      {
        "_id": "photo_id",
        "link": "https://res.cloudinary.com/...",
        "folderId": "folder_id"
      }
    ]
  }
}
```

---

#### Move Photos to Trash

```http
DELETE /photos/trash
```

**Request Body:**
```json
{
  "photoIds": ["photo_id_1", "photo_id_2"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Photos moved to trash",
  "data": {
    "deleted": 2
  }
}
```

---

### Folder Endpoints

#### Get Folders

```http
GET /folders?limit=12&page=1
```

**Query Parameters:**
- `limit`: Number of folders per page (default: 12)
- `page`: Page number (default: 1)

**Response:**
```json
{
  "success": true,
  "data": {
    "folders": [
      {
        "_id": "folder_id",
        "name": "Vacation 2024",
        "userId": "user_id",
        "photos": [
          {
            "_id": "photo_id",
            "link": "https://res.cloudinary.com/..."
          }
        ],
        "photoCount": 45,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-15T00:00:00.000Z"
      }
    ],
    "totalPages": 2,
    "currentPage": 1,
    "totalFolders": 18
  }
}
```

---

#### Create Folder

```http
POST /folders
```

**Request Body:**
```json
{
  "foldername": "Summer Vacation"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Folder created successfully",
  "data": {
    "folder": {
      "_id": "folder_id",
      "name": "Summer Vacation",
      "userId": "user_id",
      "photos": [],
      "photoCount": 0,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

**Validation:**
- Folder name: 3-50 characters
- No duplicate names for same user
- Cannot use reserved names

---

#### Rename Folder

```http
PATCH /folders/:folderId
```

**Request Body:**
```json
{
  "foldername": "New Folder Name"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Folder renamed successfully",
  "data": {
    "folder": {
      "_id": "folder_id",
      "name": "New Folder Name",
      "updatedAt": "2024-01-15T00:00:00.000Z"
    }
  }
}
```

**Notes:**
- Cannot rename "General" folder
- New name must be unique

---

### Favorite Endpoints

#### Toggle Favorite

```http
PUT /photos/favourite
```

**Request Body:**
```json
{
  "photoIds": ["photo_id_1", "photo_id_2"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Favorites updated",
  "data": {
    "updated": 2,
    "favorites": ["photo_id_1", "photo_id_2"]
  }
}
```

**Notes:**
- Toggles favorite status
- If photo is favorite, removes it
- If photo is not favorite, adds it

---

#### Get Favorite Photos

```http
GET /photos/favourite?limit=60&page=1
```

**Query Parameters:**
- `limit`: Number of photos per page
- `page`: Page number

**Response:**
```json
{
  "success": true,
  "data": {
    "photos": [...],
    "totalPages": 2,
    "currentPage": 1,
    "totalPhotos": 89
  }
}
```

---

### Password Reset Endpoints

#### Get Password Reset OTP

```http
POST /forgot-password/get-otp
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent to your email",
  "data": {
    "verificationId": "abc123"
  }
}
```

---

#### Verify Password Reset OTP

```http
POST /forgot-password/verify-otp
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP verified",
  "data": {
    "resetToken": "reset_token_abc123"
  }
}
```

---

#### Reset Password

```http
POST /forgot-password/reset-password
```

**Request Body:**
```json
{
  "resetToken": "reset_token_abc123",
  "newPassword": "NewSecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

#### Continue to Account

```http
POST /forgot-password/continue-to-account
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged in successfully"
}
```

**Notes:**
- Logs user in after password reset
- Sets JWT cookie

---

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional error details"
  }
}
```

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource conflict (duplicate) |
| 422 | Unprocessable Entity | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

### Common Error Codes

```typescript
// Authentication Errors
AUTH_REQUIRED = 'Authentication required'
INVALID_CREDENTIALS = 'Invalid email or password'
EMAIL_NOT_VERIFIED = 'Please verify your email'
TOKEN_EXPIRED = 'Session expired'
INVALID_TOKEN = 'Invalid authentication token'

// Validation Errors
INVALID_EMAIL = 'Invalid email format'
WEAK_PASSWORD = 'Password does not meet requirements'
PASSWORDS_DONT_MATCH = 'Passwords do not match'
INVALID_OTP = 'Invalid or expired OTP'

// Resource Errors
FOLDER_NOT_FOUND = 'Folder not found'
PHOTO_NOT_FOUND = 'Photo not found'
DUPLICATE_FOLDER = 'Folder name already exists'

// Permission Errors
UNAUTHORIZED_ACCESS = 'You do not have permission to access this resource'
CANNOT_MODIFY_GENERAL_FOLDER = 'Cannot modify the General folder'

// Rate Limiting
RATE_LIMIT_EXCEEDED = 'Too many requests. Please try again later'
```

### Error Handling in Client

```typescript
// Using Axios
try {
  const response = await axiosInstance.post('/endpoint', data);
  return response.data;
} catch (error) {
  if (error instanceof AxiosError) {
    const errorMessage = error.response?.data?.error 
      || error.response?.data 
      || error.message;
    toast.error(errorMessage);
  } else {
    toast.error('An unexpected error occurred');
  }
  throw error;
}

// Using RTK Query
const { data, error, isLoading } = useGetPhotosQuery({ page: 1 });

if (error) {
  if ('status' in error) {
    // FetchBaseQueryError
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
    toast.error(errMsg);
  } else {
    // SerializedError
    toast.error(error.message || 'An error occurred');
  }
}
```

---

## Rate Limiting

### Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/auth/login` | 5 requests | 15 minutes |
| `/auth/register` | 3 requests | 1 hour |
| `/auth/resend-otp` | 3 requests | 15 minutes |
| `/photos/upload` | 10 requests | 1 minute |
| All other endpoints | 100 requests | 15 minutes |

### Rate Limit Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

### Rate Limit Response

```json
{
  "success": false,
  "error": "Too many requests",
  "code": "RATE_LIMIT_EXCEEDED",
  "retryAfter": 900
}
```

---

## Examples

### Complete Login Flow

```typescript
// 1. Login
const loginUser = async (email: string, password: string) => {
  try {
    const response = await authApi.login(email, password);
    
    if (response.requiresVerification) {
      // Redirect to verification
      router.push('/auth/verify-email');
      return;
    }
    
    // Login successful
    toast.success('Login successful');
    router.push('/folders');
  } catch (error) {
    handleError(error);
  }
};

// 2. Verify Email (if needed)
const verifyEmail = async (email: string, otp: string) => {
  try {
    const response = await authApi.verifyOTP(email, otp);
    toast.success('Email verified');
    router.push('/folders');
  } catch (error) {
    handleError(error);
  }
};
```

### Upload Photos with Progress

```typescript
const uploadPhotos = async (files: File[], folderId?: string) => {
  const formData = new FormData();
  
  files.forEach(file => {
    formData.append('photos', file);
  });
  
  if (folderId) {
    formData.append('folderId', folderId);
  }
  
  try {
    const response = await axiosInstance.post('/photos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      },
    });
    
    toast.success(`${response.data.uploaded} photos uploaded`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
```

### Pagination with RTK Query

```typescript
const PhotosPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data, isLoading, isFetching } = useGetPhotosQuery({
    page: currentPage,
  });
  
  if (isLoading) return <PhotoLoader />;
  
  return (
    <>
      <ImageGrid photos={data.photos} />
      <Pagination
        currentPage={currentPage}
        totalPages={data.totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
```

---

<div align="center">

**[⬆ Back to Top](#-api-documentation)**

</div>
