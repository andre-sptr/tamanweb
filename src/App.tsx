import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { CartProvider } from "@/contexts/CartProvider";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { CommandPalette } from "@/components/CommandPalette";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { CursorGlow } from "@/components/CursorGlow";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";

// Public pages
import Index from "./pages/Index";
import Templates from "./pages/Templates";
import TemplateDetail from "./pages/TemplateDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SkeletonDemo from "./pages/SkeletonDemo";

// Admin pages (lazy loaded)
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminTemplates = lazy(() => import("./pages/admin/TemplateManagement"));
const AdminTemplateEditor = lazy(() => import("./pages/admin/TemplateEditor"));
const AdminUsers = lazy(() => import("./pages/admin/UserManagement"));
const AdminOrders = lazy(() => import("./pages/admin/OrderManagement"));
const AdminAnalytics = lazy(() => import("./pages/admin/Analytics"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));

const queryClient = new QueryClient();

// Loading fallback for lazy loaded pages
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center animate-pulse">
          <span className="text-xl font-bold text-primary-foreground">T</span>
        </div>
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <CartProvider>
        <AdminAuthProvider>
          <TooltipProvider>
            <ErrorBoundary>
              {/* Global visual effects */}
              <Preloader />
              <CursorGlow />
              <ParticleBackground />
              <ScrollProgress />

              {/* Notifications */}
              <Toaster />
              <Sonner />

              <BrowserRouter>
                <CommandPalette />
                <BackToTop />

                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/templates/:slug" element={<TemplateDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/skeleton-demo" element={<SkeletonDemo />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/templates" element={<AdminTemplates />} />
                    <Route path="/admin/templates/new" element={<AdminTemplateEditor />} />
                    <Route path="/admin/templates/:id/edit" element={<AdminTemplateEditor />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/orders" element={<AdminOrders />} />
                    <Route path="/admin/analytics" element={<AdminAnalytics />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </ErrorBoundary>
          </TooltipProvider>
        </AdminAuthProvider>
      </CartProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
