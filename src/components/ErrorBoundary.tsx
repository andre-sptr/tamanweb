import { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ errorInfo });
        // Log error to service (e.g., Sentry)
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    handleGoHome = () => {
        window.location.href = "/";
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-background p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md w-full bg-card border border-border rounded-2xl shadow-xl p-8 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.1 }}
                            className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center"
                        >
                            <AlertTriangle className="w-10 h-10 text-destructive" />
                        </motion.div>

                        <h1 className="text-2xl font-bold text-foreground mb-2">
                            Oops! Terjadi Kesalahan
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            Maaf, terjadi kesalahan yang tidak terduga. Tim kami telah diberitahu.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button onClick={this.handleRetry} className="flex-1 gap-2">
                                <RefreshCw className="w-4 h-4" />
                                Coba Lagi
                            </Button>
                            <Button onClick={this.handleGoHome} variant="outline" className="flex-1 gap-2">
                                <Home className="w-4 h-4" />
                                Kembali ke Beranda
                            </Button>
                        </div>

                        {/* Debug info (only in development) */}
                        {import.meta.env.DEV && this.state.error && (
                            <details className="mt-6 text-left">
                                <summary className="cursor-pointer text-sm text-muted-foreground flex items-center gap-2 hover:text-foreground">
                                    <Bug className="w-4 h-4" />
                                    Detail Error (Development)
                                </summary>
                                <div className="mt-3 p-4 bg-muted rounded-lg overflow-auto max-h-48">
                                    <pre className="text-xs text-destructive whitespace-pre-wrap">
                                        {this.state.error.message}
                                        {"\n\n"}
                                        {this.state.errorInfo?.componentStack}
                                    </pre>
                                </div>
                            </details>
                        )}
                    </motion.div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Simple error fallback for smaller sections
export function ErrorFallback({
    error,
    onRetry
}: {
    error?: Error;
    onRetry?: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-destructive/60 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
                Gagal Memuat Konten
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
                {error?.message || "Terjadi kesalahan saat memuat konten."}
            </p>
            {onRetry && (
                <Button onClick={onRetry} variant="outline" size="sm" className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Coba Lagi
                </Button>
            )}
        </div>
    );
}
