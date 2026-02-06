import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";
export type ColorScheme = "blue" | "ocean" | "forest" | "sunset" | "purple" | "rose";

interface ThemeContextValue {
    theme: Theme;
    colorScheme: ColorScheme;
    setTheme: (theme: Theme) => void;
    setColorScheme: (scheme: ColorScheme) => void;
    resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const COLOR_SCHEMES: Record<ColorScheme, { light: Record<string, string>; dark: Record<string, string> }> = {
    blue: {
        light: {
            "--primary": "217 91% 60%",
            "--primary-foreground": "0 0% 100%",
            "--ring": "217 91% 60%",
        },
        dark: {
            "--primary": "213 94% 68%",
            "--primary-foreground": "222 47% 6%",
            "--ring": "213 94% 68%",
        },
    },
    ocean: {
        light: {
            "--primary": "192 91% 45%",
            "--primary-foreground": "0 0% 100%",
            "--ring": "192 91% 45%",
        },
        dark: {
            "--primary": "192 91% 55%",
            "--primary-foreground": "200 50% 8%",
            "--ring": "192 91% 55%",
        },
    },
    forest: {
        light: {
            "--primary": "142 76% 36%",
            "--primary-foreground": "0 0% 100%",
            "--ring": "142 76% 36%",
        },
        dark: {
            "--primary": "142 71% 45%",
            "--primary-foreground": "144 50% 8%",
            "--ring": "142 71% 45%",
        },
    },
    sunset: {
        light: {
            "--primary": "24 95% 53%",
            "--primary-foreground": "0 0% 100%",
            "--ring": "24 95% 53%",
        },
        dark: {
            "--primary": "24 95% 60%",
            "--primary-foreground": "20 50% 8%",
            "--ring": "24 95% 60%",
        },
    },
    purple: {
        light: {
            "--primary": "262 83% 58%",
            "--primary-foreground": "0 0% 100%",
            "--ring": "262 83% 58%",
        },
        dark: {
            "--primary": "262 83% 68%",
            "--primary-foreground": "260 50% 8%",
            "--ring": "262 83% 68%",
        },
    },
    rose: {
        light: {
            "--primary": "346 77% 50%",
            "--primary-foreground": "0 0% 100%",
            "--ring": "346 77% 50%",
        },
        dark: {
            "--primary": "346 77% 60%",
            "--primary-foreground": "340 50% 8%",
            "--ring": "346 77% 60%",
        },
    },
};

export const COLOR_SCHEME_INFO: Record<ColorScheme, { name: string; color: string }> = {
    blue: { name: "Biru", color: "#3b82f6" },
    ocean: { name: "Ocean", color: "#06b6d4" },
    forest: { name: "Forest", color: "#22c55e" },
    sunset: { name: "Sunset", color: "#f97316" },
    purple: { name: "Purple", color: "#8b5cf6" },
    rose: { name: "Rose", color: "#e11d48" },
};

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    defaultColorScheme?: ColorScheme;
}

export function ThemeProvider({
    children,
    defaultTheme = "system",
    defaultColorScheme = "blue",
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem("theme") as Theme) || defaultTheme;
        }
        return defaultTheme;
    });

    const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem("colorScheme") as ColorScheme) || defaultColorScheme;
        }
        return defaultColorScheme;
    });

    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const root = document.documentElement;

        // Handle theme
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        const actualTheme = theme === "system" ? systemTheme : theme;
        setResolvedTheme(actualTheme);

        root.classList.remove("light", "dark");
        root.classList.add(actualTheme);
        localStorage.setItem("theme", theme);

        // Handle color scheme
        const schemeColors = COLOR_SCHEMES[colorScheme][actualTheme];
        Object.entries(schemeColors).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        localStorage.setItem("colorScheme", colorScheme);

        // Listen for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            if (theme === "system") {
                const newTheme = e.matches ? "dark" : "light";
                setResolvedTheme(newTheme);
                root.classList.remove("light", "dark");
                root.classList.add(newTheme);
                const schemeColors = COLOR_SCHEMES[colorScheme][newTheme];
                Object.entries(schemeColors).forEach(([key, value]) => {
                    root.style.setProperty(key, value);
                });
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme, colorScheme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                colorScheme,
                setTheme,
                setColorScheme,
                resolvedTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
