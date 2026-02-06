import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Monitor, Check, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useTheme, Theme, ColorScheme, COLOR_SCHEME_INFO } from "@/contexts/ThemeProvider";

const themes: { value: Theme; label: string; icon: React.ElementType }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
];

export function ThemeSwitcher() {
    const { theme, colorScheme, setTheme, setColorScheme, resolvedTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={resolvedTheme}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ duration: 0.2 }}
                        >
                            {resolvedTheme === "dark" ? (
                                <Moon className="h-5 w-5" />
                            ) : (
                                <Sun className="h-5 w-5" />
                            )}
                        </motion.div>
                    </AnimatePresence>
                    <span className="sr-only">Toggle theme</span>
                    {/* Color indicator dot */}
                    <span
                        className="absolute bottom-1 right-1 w-2 h-2 rounded-full border border-background"
                        style={{ backgroundColor: COLOR_SCHEME_INFO[colorScheme].color }}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Tema
                </DropdownMenuLabel>
                {themes.map((t) => (
                    <DropdownMenuItem
                        key={t.value}
                        onClick={() => setTheme(t.value)}
                        className="flex items-center justify-between cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <t.icon className="h-4 w-4" />
                            {t.label}
                        </div>
                        {theme === t.value && <Check className="h-4 w-4 text-primary" />}
                    </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <DropdownMenuLabel>Warna</DropdownMenuLabel>
                <div className="grid grid-cols-3 gap-1 p-2">
                    {(Object.keys(COLOR_SCHEME_INFO) as ColorScheme[]).map((scheme) => (
                        <button
                            key={scheme}
                            onClick={() => setColorScheme(scheme)}
                            className="relative flex flex-col items-center gap-1 p-2 rounded-md hover:bg-accent transition-colors"
                            title={COLOR_SCHEME_INFO[scheme].name}
                        >
                            <span
                                className="w-6 h-6 rounded-full border-2 transition-all"
                                style={{
                                    backgroundColor: COLOR_SCHEME_INFO[scheme].color,
                                    borderColor:
                                        colorScheme === scheme ? COLOR_SCHEME_INFO[scheme].color : "transparent",
                                    boxShadow: colorScheme === scheme ? `0 0 0 2px ${COLOR_SCHEME_INFO[scheme].color}40` : "none",
                                }}
                            />
                            {colorScheme === scheme && (
                                <motion.div
                                    layoutId="colorCheck"
                                    className="absolute top-1 right-1"
                                    initial={false}
                                >
                                    <Check className="h-3 w-3 text-primary" />
                                </motion.div>
                            )}
                        </button>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
