# 🔐 Authentication Documentation

Complete guide to Photoverse's authentication system, security measures, and implementation details.

## 📋 Table of Contents

- [Overview](#overview)
- [Authentication Flows](#authentication-flows)
- [Security Features](#security-features)
- [Implementation](#implementation)
- [Best Practices](#best-practices)

---

## Overview

Photoverse uses a secure JWT-based authentication system with the following features:

- **JWT Tokens**: Stored in HTTP-only cookies
- **CSRF Protection**: X-XSRF-TOKEN header validation
- **Email Verification**: OTP-based email verification
- **Password Reset**: Secure password recovery flow
- **Automatic Token Refresh**: Seamless session management

---

## Authentication Flows

### 1. Registration Flow

```
1. User enters email and password
2. Client validates with Zod schema
3. POST /auth/register
4. Server creates unverified account
5. Server sends OTP to email
6. User enters OTP
7. POST /auth/verify-otp
8. Server verifies OTP and activates account
9. Server returns JWT token
10. Client stores token and redirects to /folders
```

**Implementation:**

```typescript
// app/auth/register/page.tsx
const onSubmit = async (data: RegistrationData) => {
  try {
    const response = await authApi.register(data.email, data.password);
    toast.success(response?.message);
    dispatch(updateEmail(data.email));
    router.push("/auth/verify-email");
  } catch (error) {
    handleError(error);
  }
};
```

### 2. Login Flow

```
1. User enters credentials
2. POST /auth/login
3. Server validates credentials
4. If unverified → redirect to /auth/verify-email
5. If verified → return JWT token
6. Client stores token and redirects to /folders
```

**Implementation:**

```typescript
// app/auth/login/page.tsx
const onSubmit = async (data: LoginData) => {
  try {
    const response = await authApi.login(data.email, data.password);

    if (response?.requiresVerification) {
      router.push("/auth/verify-email");
      dispatch(updateEmail(data.email));
      return;
    }

    router.push("/folders");
  } catch (error) {
    handleError(error);
  }
};
```

### 3. Email Verification Flow

```
1. User receives OTP via email
2. User enters 6-digit OTP
3. POST /auth/verify-otp
4. Server validates OTP
5. Server activates account
6. Server returns JWT token
7. Client redirects to /folders
```

**Implementation:**

```typescript
// components/VerifyEmail.tsx
const verifyOTP = async (e: SubmitEvent, inputValue: string[]) => {
  e.preventDefault();
  setIsVerifying(true);

  try {
    const response = await authApi.verifyOTP(email, inputValue.join(""));
    toast.success(response?.message);
    router.push("/folders");
  } catch (error) {
    handleError(error);
  } finally {
    setIsVerifying(false);
  }
};
```

### 4. Password Reset Flow

```
1. User enters email
2. POST /forgot-password/get-otp
3. Server sends OTP to email
4. User enters OTP
5. POST /forgot-password/verify-otp
6. Server returns reset token
7. User enters new password
8. POST /forgot-password/reset-password
9. Server updates password
10. User can login with new password
```

**Implementation:**

```typescript
// Multi-step password reset
const [step, setStep] = useState<'email' | 'code' | 'reset' | 'success'>('email');

// Step 1: Email
<EmailStep setStep={setStep} />

// Step 2: Verify OTP
<VerifyPasswordRecoveryEmail setStep={setStep} />

// Step 3: Reset Password
<ResetPassword setStep={setStep} />

// Step 4: Success
<PasswordResetSuccess />
```

### 5. Token Refresh Flow

```
1. API request returns 401 Unauthorized
2. Client automatically calls POST /auth/refresh
3. Server validates refresh token
4. Server returns new JWT token
5. Client retries original request
6. If refresh fails → redirect to /auth/login
```

**Implementation:**

```typescript
// services/api.ts
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log("Token expired, refreshing...");

    const refreshResult = await baseQuery(
      { url: "auth/refresh", method: "POST" },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      console.log("Token refreshed, retrying request");
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("Refresh failed, redirecting to login");
      window.location.href = "/auth/login";
    }
  }

  return result;
};
```

---

## Security Features

### 1. JWT Tokens

**Storage:**

- Stored in HTTP-only cookies
- Cannot be accessed by JavaScript
- Prevents XSS attacks

**Configuration:**

```http
Set-Cookie: jwt=<token>; HttpOnly; Secure; SameSite=Strict; Path=/
```

**Token Structure:**

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "user_id",
    "email": "user@example.com",
    "iat": 1640000000,
    "exp": 1640003600
  },
  "signature": "..."
}
```

### 2. CSRF Protection

**How it works:**

1. Server generates CSRF token
2. Token stored in regular cookie (readable by JS)
3. Client reads token from cookie
4. Client sends token in X-XSRF-TOKEN header
5. Server validates both JWT and CSRF token

**Implementation:**

```typescript
// lib/utils.ts
export function getCsrfToken(): string | null {
  const cookies = document.cookie.split(";");
  const csrfCookie = cookies.find((c) => c.trim().startsWith("XSRF-TOKEN="));
  return csrfCookie ? csrfCookie.split("=")[1] : null;
}

// lib/axios.ts
axiosInstance.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  if (csrfToken) {
    config.headers["X-XSRF-TOKEN"] = csrfToken;
  }
  return config;
});
```

### 3. Password Requirements

**Validation Rules:**

- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character

**Implementation:**

```typescript
// lib/zod-schemas.tsx
export const RegistrationData = z
  .object({
    email: z.email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
```

### 4. OTP Security

**Features:**

- 6-digit numeric code
- 10-minute expiration
- Maximum 3 attempts
- Rate limiting on resend

**Implementation:**

```typescript
// Resend OTP with rate limiting
const [canResend, setCanResend] = useState(false);
const [countdown, setCountdown] = useState(60);

useEffect(() => {
  if (countdown > 0) {
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  } else {
    setCanResend(true);
  }
}, [countdown]);

const handleResend = async () => {
  if (!canResend) return;

  try {
    await resendOTP({ email, type: "account_verification" });
    setCountdown(60);
    setCanResend(false);
  } catch (error) {
    handleError(error);
  }
};
```

### 5. Session Management

**Features:**

- Automatic token refresh
- Secure logout
- Session timeout
- Remember me (optional)

**Logout Implementation:**

```typescript
// hooks/useLogout.ts
export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    try {
      await authApi.logout();
      dispatch(updateUser({ email: "", isAuthenticated: false }));
      router.push("/auth/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return logout;
};
```

---

## Implementation

### Auth Service

```typescript
// services/auth.ts
export const authApi = {
  async register(email: string, password: string) {
    const response = await axiosInstance.post("auth/register", {
      email,
      password,
    });
    return response.data;
  },

  async verifyOTP(email: string, otp: string) {
    const response = await axiosInstance.post("auth/verify-otp", {
      email,
      otp,
    });
    return response.data;
  },

  async login(email: string, password: string) {
    const response = await axiosInstance.post("auth/login", {
      email,
      password,
    });
    return response.data;
  },

  async logout() {
    const response = await axiosInstance.post("auth/logout");
    return response.data;
  },

  async getUser() {
    const response = await axiosInstance.get("auth/me");
    return response.data;
  },
};
```

### Auth State Management

```typescript
// lib/slices/authSlice.ts
const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    loading: false,
    verificationId: "",
    user: {
      email: "",
      isAuthenticated: false,
    },
  },
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
```

### Protected Routes

```typescript
// middleware.ts (if using middleware)
export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt");

  if (!token && request.nextUrl.pathname.startsWith("/folders")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/folders/:path*", "/photos/:path*"],
};
```

---

## Best Practices

### 1. Never Store Sensitive Data in Local Storage

```typescript
// ❌ Bad
localStorage.setItem("jwt", token);

// ✅ Good
// Let server set HTTP-only cookie
```

### 2. Always Validate on Both Client and Server

```typescript
// Client-side validation
const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

// Server-side validation (backend)
// Never trust client input
```

### 3. Handle Token Expiration Gracefully

```typescript
// Automatic refresh on 401
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Try refresh
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult.data) {
      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
```

### 4. Provide Clear Error Messages

```typescript
// ❌ Bad
toast.error("Error");

// ✅ Good
const errorMessage =
  error instanceof AxiosError
    ? error.response?.data?.error || "An unexpected error occurred"
    : "An unexpected error occurred";
toast.error(errorMessage);
```

### 5. Implement Rate Limiting

```typescript
// Prevent brute force attacks
const [attempts, setAttempts] = useState(0);
const MAX_ATTEMPTS = 3;

const handleLogin = async () => {
  if (attempts >= MAX_ATTEMPTS) {
    toast.error("Too many attempts. Please try again later.");
    return;
  }

  try {
    await authApi.login(email, password);
  } catch (error) {
    setAttempts((prev) => prev + 1);
    handleError(error);
  }
};
```

---

<div align="center">

**[⬆ Back to Top](#-authentication-documentation)**

</div>
