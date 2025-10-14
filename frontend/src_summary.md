# Project: src

## File: App.css
```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

## File: App.jsx
```jsx
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Auth/Login';
import {useAuthStore} from './stores/authStore';

function App() {
    const isAuthenticated = useAuthStore();

    return (
        <Router>
            <div className="min-h-screen bg-background">
                <Routes>
                    {/* Public routes */}
                    <Route
                        path="/login"
                        element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/signup"
                        element={!isAuthenticated ? <div>Signup Page Coming Soon</div> : <Navigate to="/" />}
                    />

                    {/* Protected routes - show placeholder for now */}
                    <Route
                        path="/chat"
                        element={isAuthenticated ? <div>Chat Page Coming Soon</div> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/profile"
                        element={isAuthenticated ? <div>Profile Page Coming Soon</div> : <Navigate to="/login" />}
                    />

                    {/* Default route */}
                    <Route
                        path="/"
                        element={<Navigate to={isAuthenticated ? "/chat" : "/login"} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
```

## File: components/layout/Layout.jsx
```jsx

```

## File: components/layout/Navbar.jsx
```jsx

```

## File: components/layout/ProtectedRoute.jsx
```jsx

```

## File: components/layout/Sidebar.jsx
```jsx

```

## File: components/ui/button.jsx
```jsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }

```

## File: components/ui/card.jsx
```jsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

## File: components/ui/form.jsx
```jsx
"use client";
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

const FormFieldContext = React.createContext({})

const FormField = (
  {
    ...props
  }
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

const FormItemContext = React.createContext({})

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props} />
  );
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props} />
  );
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props} />
  );
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}>
      {body}
    </p>
  );
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

## File: components/ui/input.jsx
```jsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props} />
  );
})
Input.displayName = "Input"

export { Input }

```

## File: components/ui/label.jsx
```jsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```

## File: constants/config.js
```js
export const APP_CONFIG = {
    APP_NAME: "JustChat",
    API_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
    WS_URL: import.meta.env.VITE_WS_URL || "ws://localhost:5001",
    UPLOAD: {
        MAX_FILE_SIZE: 5 * 1024 * 1024,
        ALLOWED_IMAGE_TYPES: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
        ],
    },
    MESSAGES: {
        MAX_LENGTH: 1000,
        LOAD_LIMIT: 50,
        EDIT_TIMEOUT: 5 * 60 * 1000,
    },
    REALTIME: {
        TYPING_INDICATOR_TIMEOUT: 3000,
        RECONNECT_DELAY: 1000,
        MAX_RECONNECT_ATTEMPTS: 5,
    },
};

```

## File: constants/endpoints.js
```js

```

## File: index.css
```css
@import '@fontsource/jetbrains-mono/400.css';
@import '@fontsource/jetbrains-mono/500.css';
@import '@fontsource/jetbrains-mono/600.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Your Rose theme variables remain the same */
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 346.8 77.2% 49.8%;
    --primary-foreground: 355.7 100% 97.3%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 346.8 77.2% 49.8%;
    --radius: 0.65rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    --background: 20 14.3% 4.1%;
    --foreground: 0 0% 95%;
    --card: 24 9.8% 10%;
    --card-foreground: 0 0% 95%;
    --popover: 0 0% 9%;
    --popover-foreground: 0 0% 95%;
    --primary: 346.8 77.2% 49.8%;
    --primary-foreground: 355.7 100% 97.3%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 15%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 12 6.5% 15.1%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 85.7% 97.3%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 346.8 77.2% 49.8%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: 'JetBrains Mono', monospace;
  }
}
```

## File: lib/utils.js
```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

```

## File: main.jsx
```jsx
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
```

## File: pages/Auth/Login.jsx
```jsx
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', formData);
        // Will connect to auth service later
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">Welcome to JustChat</CardTitle>
                    <CardDescription className="text-center">
                        Sign in to your account to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary hover:text-primary/90 font-medium">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
```

## File: pages/Auth/Signup.jsx
```jsx

```

## File: pages/Chat/Chat.jsx
```jsx

```

## File: pages/Profile/Profile.jsx
```jsx

```

## File: services/api.js
```js
import axios from "axios";

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) throw new Error("No refresh token");

                const response = await axios.post(
                    `${API_BASE_URL}/auth/refresh-token`,
                    {
                        refreshToken,
                    }
                );

                const { accessToken } = response.data.data;
                localStorage.setItem("accessToken", accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;

```

## File: services/authService.js
```js
import api from "./api";

export const authService = {
    login: async (credentials) => {
        const response = await api.post("/auth/login", credentials);
        return response;
    },

    signup: async (userData) => {
        const response = await api.post("/auth/signup", userData);
        return response;
    },

    refreshToken: async (tokenData) => {
        const response = await api.post("/auth/refresh-token", tokenData);
        return response;
    },

    logout: async (tokenData) => {
        const response = await api.post("/auth/logout", tokenData);
        return response;
    },

    logoutAll: async () => {
        const response = await api.post("/auth/logout-all");
        return response;
    },
};

```

## File: services/chatService.js
```js
import api from "./api";

export const chatService = {
    // Conversations
    getConversations: async () => {
        const response = await api.get("/conversations");
        return response;
    },

    createConversation: async (user2Id) => {
        const response = await api.post("/conversations", {
            user2_id: user2Id,
        });
        return response;
    },

    checkConversation: async (user2Id) => {
        const response = await api.get(`/conversations/check/${user2Id}`);
        return response;
    },

    getConversation: async (conversationId) => {
        const response = await api.get(`/conversations/${conversationId}`);
        return response;
    },

    getConversationParticipants: async (conversationId) => {
        const response = await api.get(
            `/conversations/${conversationId}/participants`
        );
        return response;
    },

    deleteConversation: async (conversationId) => {
        const response = await api.delete(`/conversations/${conversationId}`);
        return response;
    },

    // Messages
    getMessages: async (conversationId, page = 1, limit = 50) => {
        const response = await api.get(
            `/conversations/${conversationId}/messages`,
            {
                params: { page, limit },
            }
        );
        return response;
    },

    sendMessage: async (conversationId, messageData) => {
        const response = await api.post(
            `/conversations/${conversationId}/messages`,
            messageData
        );
        return response;
    },

    getMessage: async (conversationId, messageId) => {
        const response = await api.get(
            `/conversations/${conversationId}/messages/${messageId}`
        );
        return response;
    },

    updateMessage: async (conversationId, messageId, updateData) => {
        const response = await api.put(
            `/conversations/${conversationId}/messages/${messageId}`,
            updateData
        );
        return response;
    },

    deleteMessage: async (conversationId, messageId) => {
        const response = await api.delete(
            `/conversations/${conversationId}/messages/${messageId}`
        );
        return response;
    },

    markAsRead: async (conversationId, messageId) => {
        const response = await api.post(
            `/conversations/${conversationId}/messages/${messageId}/read`
        );
        return response;
    },

    getUnreadCount: async (conversationId) => {
        const response = await api.get(
            `/conversations/${conversationId}/unread-count`
        );
        return response;
    },
};

```

## File: services/index.js
```js
export { authService } from "./authService";
export { userService } from "./userService";
export { chatService } from "./chatService";
export { uploadService } from "./uploadService";
```

## File: services/uploadService.js
```js
import api from "./api";
import { validateFile, compressImage } from "../utils/fileUtils";

export const uploadService = {
  uploadImage: async (file, type = "message") => {
    validateFile(file);

    let processedFile = file;
    
    if (file.size > 1024 * 1024) {
      processedFile = await compressImage(file, 0.7);
    }

    const formData = new FormData();
    formData.append("image", processedFile);
    formData.append("type", type);

    const response = await api.post("/upload/image", formData, {
      headers: { "Content-Type": "
```

## File: services/userService.js
```js
import api from "./api";

export const userService = {
    searchUsers: async (query, limit = 10) => {
        const response = await api.get("/users/search", {
            params: { q: query, limit },
        });
        return response;
    },

    getAllUsers: async (limit = 50) => {
        const response = await api.get("/users", {
            params: { limit },
        });
        return response;
    },

    getUserById: async (userId) => {
        const response = await api.get(`/users/${userId}`);
        return response;
    },

    getProfile: async () => {
        const response = await api.get("/profile/me");
        return response;
    },

    updateProfile: async (profileData) => {
        const response = await api.put("/profile/update", profileData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response;
    },

    updateOnlineStatus: async (isOnline) => {
        const response = await api.put("/users/online-status", {
            is_online: isOnline,
        });
        return response;
    },
};

```

## File: stores/authStore.js
```js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../services/authService";
import { storage } from "../utils/storageUtils";
import { getErrorMessage } from "../utils/errorUtils";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.login(credentials);
                    const { user, accessToken, refreshToken } =
                        response.data.data;

                    set({
                        user,
                        accessToken,
                        refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });

                    return response;
                } catch (error) {
                    const errorMessage =
                        getErrorMessage(error) || "Login failed";
                    set({ isLoading: false, error: errorMessage });
                    throw new Error(errorMessage);
                }
            },

            signup: async (userData) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.signup(userData);
                    const { user, accessToken, refreshToken } =
                        response.data.data;

                    set({
                        user,
                        accessToken,
                        refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });

                    return response;
                } catch (error) {
                    const errorMessage =
                        getErrorMessage(error) || "Signup failed";
                    set({ isLoading: false, error: errorMessage });
                    throw new Error(errorMessage);
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    const { refreshToken } = get();
                    if (refreshToken) {
                        await authService.logout({ refreshToken });
                    }
                } catch (error) {
                    console.error("Logout API call failed:", error);
                } finally {
                    storage.clear();
                    set({
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: null,
                    });
                }
            },

            refreshTokens: async () => {
                const { refreshToken } = get();
                if (!refreshToken)
                    throw new Error("No refresh token available");

                try {
                    const response = await authService.refreshToken({
                        refreshToken,
                    });
                    const { accessToken } = response.data.data;
                    set({ accessToken, error: null });
                    return accessToken;
                } catch (error) {
                    get().logout();
                    throw new Error("Session expired. Please login again.");
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                user: state.user,
            }),
        }
    )
);

```

## File: stores/conversationStore.js
```js
import { create } from "zustand";
import { chatService } from "../services/chatService";
import { getErrorMessage } from "../utils/errorUtils";
import { sortConversations, getOtherUser } from "../utils/chatUtils";

export const useConversationStore = create((set, get) => ({
    conversations: new Map(),
    conversationsList: [],
    currentConversationId: null,
    isLoading: false,
    error: null,

    loadConversations: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await chatService.getConversations();
            const conversations = response.data.data.conversations;

            const sortedConversations = sortConversations(conversations);

            set((state) => {
                const newConversations = new Map(state.conversations);

                sortedConversations.forEach((conv) => {
                    newConversations.set(conv.id, conv);
                });

                return {
                    conversations: newConversations,
                    conversationsList: sortedConversations,
                    isLoading: false,
                };
            });
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load conversations";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    createConversation: async (user2Id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await chatService.createConversation(user2Id);
            const conversation = response.data.data.conversation;

            set((state) => {
                const newConversations = new Map(state.conversations);
                newConversations.set(conversation.id, conversation);

                const conversationsList = sortConversations([
                    conversation,
                    ...state.conversationsList,
                ]);

                return {
                    conversations: newConversations,
                    conversationsList,
                    currentConversationId: conversation.id,
                    isLoading: false,
                };
            });

            return conversation;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to create conversation";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    getOrCreateConversation: async (user2Id) => {
        const existingConversation = get().conversationsList.find(
            (conv) => conv.user1_id === user2Id || conv.user2_id === user2Id
        );

        if (existingConversation) {
            set({ currentConversationId: existingConversation.id });
            return existingConversation;
        }

        return await get().createConversation(user2Id);
    },

    setCurrentConversation: (conversationId) => {
        set({ currentConversationId: conversationId });
    },

    updateConversationLastMessage: (conversationId, lastMessage) => {
        set((state) => {
            const conversation = state.conversations.get(conversationId);
            if (!conversation) return state;

            const updatedConversation = {
                ...conversation,
                last_message: lastMessage,
            };
            const newConversations = new Map(state.conversations);
            newConversations.set(conversationId, updatedConversation);

            const conversationsList = sortConversations([
                updatedConversation,
                ...state.conversationsList.filter(
                    (conv) => conv.id !== conversationId
                ),
            ]);

            return {
                conversations: newConversations,
                conversationsList,
            };
        });
    },

    clearError: () => set({ error: null }),

    getCurrentConversation: () => {
        const state = get();
        return state.conversations.get(state.currentConversationId);
    },

    getConversationById: (conversationId) =>
        get().conversations.get(conversationId),

    getCurrentOtherUser: () => {
        const state = get();
        const conversation = state.conversations.get(
            state.currentConversationId
        );
        const currentUserId = useAuthStore.getState().user?.id;
        return conversation ? getOtherUser(conversation, currentUserId) : null;
    },
}));

```

## File: stores/messageStore.js
```js
import { create } from "zustand";
import { chatService } from "../services/chatService";
import { useAuthStore } from "./authStore";
import { getErrorMessage } from "../utils/errorUtils";
import { validateMessage, sanitizeMessage } from "../utils/validationUtils";
import { groupMessagesByDate } from "../utils/chatUtils";

export const useMessageStore = create((set, get) => ({
    messages: new Map(),
    isLoading: false,
    error: null,

    loadMessages: async (conversationId, page = 1, limit = 50) => {
        set({ isLoading: true, error: null });
        try {
            const response = await chatService.getMessages(
                conversationId,
                page,
                limit
            );
            const { messages, pagination } = response.data.data;

            set((state) => {
                const existingData = state.messages.get(conversationId) || {
                    messages: [],
                    pagination: {},
                };
                const existingMessages = existingData.messages;

                const messageMap = new Map();
                [...existingMessages, ...messages].forEach((msg) =>
                    messageMap.set(msg.id, msg)
                );
                const mergedMessages = Array.from(messageMap.values()).sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                );

                const newMessages = new Map(state.messages);
                newMessages.set(conversationId, {
                    messages: mergedMessages,
                    pagination: {
                        ...pagination,
                        hasMore: messages.length === limit,
                    },
                });

                return {
                    messages: newMessages,
                    isLoading: false,
                };
            });
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load messages";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    sendMessage: async (conversationId, messageData) => {
        // Validate message
        const validationError = validateMessage(messageData.message_text);
        if (validationError) {
            throw new Error(validationError);
        }

        const tempId = `temp-${Date.now()}`;
        const { user } = useAuthStore.getState();

        // Sanitize message text
        const sanitizedData = {
            ...messageData,
            message_text: sanitizeMessage(messageData.message_text),
        };

        const optimisticMessage = {
            id: tempId,
            ...sanitizedData,
            conversation_id: conversationId,
            sender_id: user.id,
            sender: user,
            created_at: new Date().toISOString(),
            is_delivered: false,
            is_optimistic: true,
            read_receipts: [],
        };

        set((state) => {
            const existingData = state.messages.get(conversationId) || {
                messages: [],
                pagination: {},
            };
            const newMessages = new Map(state.messages);
            newMessages.set(conversationId, {
                ...existingData,
                messages: [...existingData.messages, optimisticMessage],
            });

            return { messages: newMessages };
        });

        try {
            const response = await chatService.sendMessage(
                conversationId,
                sanitizedData
            );
            const realMessage = response.data.data.message;

            set((state) => {
                const existingData = state.messages.get(conversationId) || {
                    messages: [],
                    pagination: {},
                };
                const filteredMessages = existingData.messages.filter(
                    (msg) => msg.id !== tempId
                );

                const newMessages = new Map(state.messages);
                newMessages.set(conversationId, {
                    ...existingData,
                    messages: [...filteredMessages, realMessage],
                });

                return { messages: newMessages };
            });

            const { updateConversationLastMessage } =
                useConversationStore.getState();
            updateConversationLastMessage(conversationId, realMessage);

            return realMessage;
        } catch (error) {
            set((state) => {
                const existingData = state.messages.get(conversationId) || {
                    messages: [],
                    pagination: {},
                };
                const filteredMessages = existingData.messages.filter(
                    (msg) => msg.id !== tempId
                );

                const newMessages = new Map(state.messages);
                newMessages.set(conversationId, {
                    ...existingData,
                    messages: filteredMessages,
                });

                return {
                    messages: newMessages,
                    error: getErrorMessage(error) || "Failed to send message",
                };
            });
            throw error;
        }
    },

    markMessageAsRead: async (conversationId, messageId) => {
        try {
            await chatService.markAsRead(conversationId, messageId);

            set((state) => {
                const conversationData = state.messages.get(conversationId);
                if (!conversationData) return state;

                const updatedMessages = conversationData.messages.map((msg) => {
                    if (msg.id === messageId) {
                        const { user } = useAuthStore.getState();
                        return {
                            ...msg,
                            read_receipts: [
                                ...(msg.read_receipts || []),
                                {
                                    reader_id: user.id,
                                    read_at: new Date().toISOString(),
                                },
                            ],
                        };
                    }
                    return msg;
                });

                const newMessages = new Map(state.messages);
                newMessages.set(conversationId, {
                    ...conversationData,
                    messages: updatedMessages,
                });

                return { messages: newMessages };
            });
        } catch (error) {
            console.error("Failed to mark message as read:", error);
        }
    },

    addMessage: (conversationId, message) => {
        set((state) => {
            const existingData = state.messages.get(conversationId) || {
                messages: [],
                pagination: {},
            };
            const messageExists = existingData.messages.some(
                (msg) => msg.id === message.id
            );

            if (messageExists) return state;

            const newMessages = new Map(state.messages);
            newMessages.set(conversationId, {
                ...existingData,
                messages: [...existingData.messages, message],
            });

            return { messages: newMessages };
        });
    },

    clearMessages: (conversationId) => {
        set((state) => {
            const newMessages = new Map(state.messages);
            newMessages.delete(conversationId);
            return { messages: newMessages };
        });
    },

    clearError: () => set({ error: null }),

    getMessages: (conversationId) => {
        const data = get().messages.get(conversationId);
        return data?.messages || [];
    },

    getPagination: (conversationId) => {
        const data = get().messages.get(conversationId);
        return data?.pagination || { hasMore: true };
    },

    getGroupedMessages: (conversationId) => {
        const messages = get().getMessages(conversationId);
        return groupMessagesByDate(messages);
    },
}));

```

## File: stores/uiStore.js
```js
import { create } from "zustand";

export const useUIStore = create((set, get) => ({
    // State
    activeSidebar: "conversations",
    isMobileSidebarOpen: false,
    modals: {
        userProfile: false,
        imagePreview: false,
        deleteConfirm: false,
        newConversation: false,
    },
    toast: null,
    theme: "light",
    loadingStates: new Map(),

    // Actions - UI state only
    setActiveSidebar: (sidebar) => set({ activeSidebar: sidebar }),

    toggleMobileSidebar: () =>
        set((state) => ({
            isMobileSidebarOpen: !state.isMobileSidebarOpen,
        })),

    openModal: (modalName) =>
        set((state) => ({
            modals: { ...state.modals, [modalName]: true },
        })),

    closeModal: (modalName) =>
        set((state) => ({
            modals: { ...state.modals, [modalName]: false },
        })),

    closeAllModals: () =>
        set({
            modals: {
                userProfile: false,
                imagePreview: false,
                deleteConfirm: false,
                newConversation: false,
            },
        }),

    showToast: (toastData) => set({ toast: toastData }),

    hideToast: () => set({ toast: null }),

    setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    },

    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === "light" ? "dark" : "light";
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            return { theme: newTheme };
        }),

    setLoading: (key, isLoading) =>
        set((state) => {
            const newLoadingStates = new Map(state.loadingStates);
            if (isLoading) {
                newLoadingStates.set(key, true);
            } else {
                newLoadingStates.delete(key);
            }
            return { loadingStates: newLoadingStates };
        }),

    // Selectors
    isLoading: (key) => get().loadingStates.has(key),
    isModalOpen: (modalName) => get().modals[modalName],
}));

```

## File: stores/userStore.js
```js
import { create } from "zustand";
import { userService } from "../services/userService";
import { getErrorMessage } from "../utils/errorUtils";
import { truncateText } from "../utils/stringUtils";

export const useUserStore = create((set, get) => ({
    currentUser: null,
    users: new Map(),
    searchedUsers: [],
    onlineUsers: new Set(),
    isLoading: false,
    error: null,

    loadCurrentUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await userService.getProfile();
            const user = response.data.data.user;

            set((state) => {
                const newUsers = new Map(state.users);
                newUsers.set(user.id, user);
                return {
                    currentUser: user,
                    users: newUsers,
                    isLoading: false,
                };
            });
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load profile";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    updateProfile: async (profileData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await userService.updateProfile(profileData);
            const updatedUser = response.data.data.user;

            set((state) => {
                const newUsers = new Map(state.users);
                newUsers.set(updatedUser.id, updatedUser);
                return {
                    currentUser: updatedUser,
                    users: newUsers,
                    isLoading: false,
                };
            });

            return updatedUser;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to update profile";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    searchUsers: async (query, limit = 10) => {
        const trimmedQuery = query?.trim();
        if (!trimmedQuery || trimmedQuery.length < 2) {
            set({ searchedUsers: [] });
            return [];
        }

        set({ isLoading: true, error: null });
        try {
            const response = await userService.searchUsers(trimmedQuery, limit);
            const users = response.data.data.users;

            set((state) => {
                const newUsers = new Map(state.users);
                users.forEach((user) => newUsers.set(user.id, user));
                return {
                    searchedUsers: users,
                    users: newUsers,
                    isLoading: false,
                };
            });

            return users;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to search users";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    loadUserById: async (userId) => {
        const cachedUser = get().users.get(userId);
        if (cachedUser) return cachedUser;

        set({ isLoading: true, error: null });
        try {
            const response = await userService.getUserById(userId);
            const user = response.data.data.user;

            set((state) => {
                const newUsers = new Map(state.users);
                newUsers.set(user.id, user);
                return {
                    users: newUsers,
                    isLoading: false,
                };
            });

            return user;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load user";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    updateOnlineStatus: async (isOnline) => {
        try {
            await userService.updateOnlineStatus(isOnline);

            set((state) => {
                if (!state.currentUser) return state;

                const updatedUser = {
                    ...state.currentUser,
                    is_online: isOnline,
                };
                const newUsers = new Map(state.users);
                newUsers.set(updatedUser.id, updatedUser);

                return {
                    currentUser: updatedUser,
                    users: newUsers,
                };
            });
        } catch (error) {
            console.error("Failed to update online status:", error);
        }
    },

    setUserOnline: (userId) => {
        set((state) => {
            const newOnlineUsers = new Set(state.onlineUsers);
            newOnlineUsers.add(userId);
            return { onlineUsers: newOnlineUsers };
        });
    },

    setUserOffline: (userId) => {
        set((state) => {
            const newOnlineUsers = new Set(state.onlineUsers);
            newOnlineUsers.delete(userId);
            return { onlineUsers: newOnlineUsers };
        });
    },

    clearSearch: () => set({ searchedUsers: [] }),
    clearError: () => set({ error: null }),

    getUserById: (userId) => get().users.get(userId),
    isUserOnline: (userId) => get().onlineUsers.has(userId),
    getUserDisplayName: (userId) => {
        const user = get().users.get(userId);
        return user ? truncateText(user.full_name, 20) : "Unknown User";
    },
}));

```

## File: utils/chatUtils.js
```js
import { formatMessageTime } from "./dateUtils";

// Sort conversations by last message time or creation time
export const sortConversations = (conversations) => {
    return conversations.sort((a, b) => {
        const aTime = a.last_message?.created_at || a.created_at;
        const bTime = b.last_message?.created_at || b.created_at;
        return new Date(bTime) - new Date(aTime);
    });
};

// Get the other user in a conversation
export const getOtherUser = (conversation, currentUserId) => {
    if (!conversation) return null;

    const { user1, user2 } = conversation;
    return user1.id === currentUserId ? user2 : user1;
};

// Group messages by date
export const groupMessagesByDate = (messages) => {
    const groups = {};

    messages.forEach((message) => {
        const date = new Date(message.created_at).toDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
    });

    return groups;
};

// Check if user is online
export const isUserOnline = (user, onlineUsers) => {
    return user?.is_online || onlineUsers.has(user?.id);
};

// Format conversation preview
export const getConversationPreview = (conversation, currentUserId) => {
    if (!conversation.last_message) return "No messages yet";

    const { last_message } = conversation;
    const isCurrentUser = last_message.sender_id === currentUserId;
    const prefix = isCurrentUser ? "You: " : "";

    if (last_message.message_type === "IMAGE") {
        return `${prefix}📷 Image`;
    }

    return `${prefix}${last_message.message_text || "Message"}`;
};

```

## File: utils/dateUtils.js
```js
export const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    } else if (diffInHours < 48) {
        return "Yesterday";
    } else {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    }
};

export const formatLastSeen = (timestamp) => {
    if (!timestamp) return "Never";

    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = (now - date) / (1000 * 60);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const isToday = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    return date.toDateString() === today.toDateString();
};

```

## File: utils/errorUtils.js
```js
export const getErrorMessage = (error) => {
    if (typeof error === "string") return error;
    if (error.response?.data?.msg) return error.response.data.msg;
    if (error.message) return error.message;
    return "An unexpected error occurred";
};

export const isNetworkError = (error) => {
    return !error.response && error.message?.includes("Network");
};

export const handleApiError = (error, fallback = "Something went wrong") => {
    console.error("API Error:", error);
    return getErrorMessage(error) || fallback;
};

```

## File: utils/fileUtils.js
```js
export const validateFile = (file, options = {}) => {
    const {
        maxSize = 5 * 1024 * 1024, // 5MB
        allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
    } = options;

    if (file.size > maxSize) {
        throw new Error(
            `File size must be less than ${maxSize / 1024 / 1024}MB`
        );
    }

    if (!allowedTypes.includes(file.type)) {
        throw new Error("Only image files (JPEG, PNG, WebP, GIF) are allowed");
    }

    return true;
};

export const getFilePreview = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

export const compressImage = (file, quality = 0.8) => {
    return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(resolve, "image/jpeg", quality);
        };

        img.src = URL.createObjectURL(file);
    });
};


```

## File: utils/index.js
```js
export * from "./dateUtils";
export * from "./fileUtils";
export * from "./stringUtils";
export * from "./storageUtils";
export * from "./validationUtils";
export * from "./chatUtils";
export * from "./errorUtils";
export * from "./uiUtils";

```

## File: utils/storageUtils.js
```js
export const storage = {
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("Error removing from localStorage:", error);
        }
    },

    clear: () => {
        try {
            localStorage.clear();
        } catch (error) {
            console.error("Error clearing localStorage:", error);
        }
    },
};

export const sessionStorage = {
    get: (key, defaultValue = null) => {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    set: (key, value) => {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving to sessionStorage:", error);
        }
    },
};

// Token-specific helpers
export const tokenStorage = {
    getAccessToken: () => storage.get("accessToken"),
    setAccessToken: (token) => storage.set("accessToken", token),
    getRefreshToken: () => storage.get("refreshToken"),
    setRefreshToken: (token) => storage.set("refreshToken", token),
    clearTokens: () => {
        storage.remove("accessToken");
        storage.remove("refreshToken");
    },
};

```

## File: utils/stringUtils.js
```js
export const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
};

export const getInitials = (name) => {
    if (!name) return "?";
    return name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase()
        .substring(0, 2);
};

export const sanitizeMessage = (text) => {
    return text
        .trim()
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
};

```

## File: utils/uiUtils.js
```js
export const cn = (...classes) => {
    return classes.filter(Boolean).join(" ");
};

export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
};

```

## File: utils/validationUtils.js
```js
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPassword = (password) => {
    return password && password.length >= 6;
};

export const isValidName = (name) => {
    return name && name.trim().length >= 2;
};

export const validateMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return "Message cannot be empty";
    if (trimmed.length > 1000) return "Message too long (max 1000 characters)";
    return null;
};

```

