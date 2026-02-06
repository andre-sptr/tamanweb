import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    FileText,
    Users,
    ShoppingCart,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdminAuth, RequireAdminAuth } from "@/contexts/AdminAuthContext";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: FileText, label: "Templates", href: "/admin/templates" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
];

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

export function AdminLayout({ children, title, description }: AdminLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAdminAuth();

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

    return (
        <RequireAdminAuth>
            <div className="min-h-screen bg-muted/30">
                {/* Sidebar - Desktop */}
                <motion.aside
                    initial={false}
                    animate={{ width: isSidebarOpen ? 256 : 80 }}
                    className="fixed left-0 top-0 bottom-0 z-40 hidden lg:flex flex-col bg-card border-r border-border"
                >
                    {/* Logo */}
                    <div className="h-16 flex items-center px-4 border-b border-border">
                        <Link to="/admin/dashboard" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-primary shrink-0">
                                <span className="text-xl font-bold text-primary-foreground">T</span>
                            </div>
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="text-lg font-bold text-foreground overflow-hidden whitespace-nowrap"
                                    >
                                        Admin
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                        {sidebarItems.map((item) => {
                            const isActive = location.pathname === item.href ||
                                (item.href !== "/admin/dashboard" && location.pathname.startsWith(item.href));

                            return (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                                        "hover:bg-accent",
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <item.icon className="w-5 h-5 shrink-0" />
                                    <AnimatePresence>
                                        {isSidebarOpen && (
                                            <motion.span
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: "auto" }}
                                                exit={{ opacity: 0, width: 0 }}
                                                className="font-medium overflow-hidden whitespace-nowrap"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Collapse button */}
                    <div className="p-3 border-t border-border">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <Menu className="w-5 h-5" />
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="ml-3"
                                    >
                                        Collapse
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Button>
                    </div>
                </motion.aside>

                {/* Main Content */}
                <div
                    className={cn(
                        "transition-all duration-300",
                        isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
                    )}
                >
                    {/* Header */}
                    <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-lg border-b border-border">
                        <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
                            {/* Mobile menu button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <Menu className="w-5 h-5" />
                            </Button>

                            {/* Search */}
                            <div className="flex-1 max-w-md hidden md:block">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search..."
                                        className="pl-10 bg-muted/50"
                                    />
                                </div>
                            </div>

                            {/* Right actions */}
                            <div className="flex items-center gap-2">
                                {/* Notifications */}
                                <Button variant="ghost" size="icon" className="relative">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                                </Button>

                                {/* User menu */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="flex items-center gap-2 pr-2">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={user?.avatar} />
                                                <AvatarFallback>{user?.name?.charAt(0) || "A"}</AvatarFallback>
                                            </Avatar>
                                            <span className="hidden md:inline font-medium">{user?.name}</span>
                                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>
                                            <div className="flex flex-col">
                                                <span>{user?.name}</span>
                                                <span className="text-xs text-muted-foreground font-normal">
                                                    {user?.email}
                                                </span>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link to="/admin/settings">
                                                <Settings className="w-4 h-4 mr-2" />
                                                Settings
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="p-4 lg:p-6">
                        {(title || description) && (
                            <div className="mb-6">
                                {title && (
                                    <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                                )}
                                {description && (
                                    <p className="text-muted-foreground mt-1">{description}</p>
                                )}
                            </div>
                        )}
                        {children}
                    </main>
                </div>

                {/* Mobile sidebar overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50 bg-black/50 lg:hidden"
                                onClick={() => setIsMobileMenuOpen(false)}
                            />
                            <motion.aside
                                initial={{ x: -280 }}
                                animate={{ x: 0 }}
                                exit={{ x: -280 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-card border-r border-border lg:hidden"
                            >
                                {/* Mobile header */}
                                <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                                    <Link to="/admin/dashboard" className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                                            <span className="text-xl font-bold text-primary-foreground">T</span>
                                        </div>
                                        <span className="text-lg font-bold">Admin</span>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>

                                {/* Mobile navigation */}
                                <nav className="py-4 px-3 space-y-1">
                                    {sidebarItems.map((item) => {
                                        const isActive = location.pathname === item.href;
                                        return (
                                            <Link
                                                key={item.href}
                                                to={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={cn(
                                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                                                    isActive
                                                        ? "bg-primary text-primary-foreground"
                                                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                                )}
                                            >
                                                <item.icon className="w-5 h-5" />
                                                <span className="font-medium">{item.label}</span>
                                            </Link>
                                        );
                                    })}
                                </nav>

                                {/* Mobile logout */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border">
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-destructive"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="w-5 h-5 mr-3" />
                                        Logout
                                    </Button>
                                </div>
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </RequireAdminAuth>
    );
}
