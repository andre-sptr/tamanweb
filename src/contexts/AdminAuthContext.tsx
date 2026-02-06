import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: "admin" | "super_admin";
    avatar?: string;
}

interface AdminAuthContextType {
    user: AdminUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const STORAGE_KEY = "tamanweb_admin_auth";

// Mock admin user for demo
const MOCK_ADMIN: AdminUser = {
    id: "1",
    email: "admin@tamanweb.com",
    name: "Admin TamanWEB",
    role: "super_admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
};

export function AdminAuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AdminUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const storedAuth = localStorage.getItem(STORAGE_KEY);
        if (storedAuth) {
            try {
                const parsed = JSON.parse(storedAuth);
                if (parsed.user && parsed.expiresAt > Date.now()) {
                    setUser(parsed.user);
                } else {
                    localStorage.removeItem(STORAGE_KEY);
                }
            } catch {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock authentication (in production, this would be a real API call)
        if (email === "admin@tamanweb.com" && password === "admin123") {
            setUser(MOCK_ADMIN);

            // Store session with 24h expiry
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                user: MOCK_ADMIN,
                expiresAt: Date.now() + 24 * 60 * 60 * 1000,
            }));

            setIsLoading(false);
            return true;
        }

        setIsLoading(false);
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <AdminAuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error("useAdminAuth must be used within AdminAuthProvider");
    }
    return context;
}

// Protected route wrapper
export function RequireAdminAuth({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAdminAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/admin/login", {
                replace: true,
                state: { from: location.pathname }
            });
        }
    }, [isAuthenticated, isLoading, navigate, location]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
