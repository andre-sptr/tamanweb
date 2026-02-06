import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Home,
    Layout,
    User,
    Mail,
    Moon,
    Sun,
    Palette,
    FileText,
    ArrowRight,
    Command,
} from "lucide-react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { templates } from "@/lib/data";
import { useTheme, ColorScheme, COLOR_SCHEME_INFO } from "@/contexts/ThemeProvider";
import { Badge } from "@/components/ui/badge";

interface CommandPaletteProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const navPages = [
    { name: "Beranda", href: "/", icon: Home, keywords: ["home", "utama"] },
    { name: "Template", href: "/templates", icon: Layout, keywords: ["koleksi", "browse"] },
    { name: "Tentang Kami", href: "/about", icon: User, keywords: ["about", "info"] },
    { name: "Kontak", href: "/contact", icon: Mail, keywords: ["hubungi", "contact"] },
];

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { theme, setTheme, setColorScheme, resolvedTheme } = useTheme();

    const controlledOpen = open !== undefined ? open : isOpen;
    const setControlledOpen = onOpenChange || setIsOpen;

    // Keyboard shortcut
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setControlledOpen(!controlledOpen);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [controlledOpen, setControlledOpen]);

    const runCommand = useCallback(
        (command: () => void) => {
            setControlledOpen(false);
            command();
        },
        [setControlledOpen]
    );

    const filteredTemplates = useMemo(() => {
        return templates.slice(0, 6); // Limit to 6 for quick access
    }, []);

    return (
        <CommandDialog open={controlledOpen} onOpenChange={setControlledOpen}>
            <CommandInput placeholder="Cari template, halaman, atau aksi..." />
            <CommandList>
                <CommandEmpty>
                    <div className="flex flex-col items-center gap-2 py-6">
                        <Search className="w-10 h-10 text-muted-foreground/50" />
                        <p>Tidak ada hasil ditemukan.</p>
                    </div>
                </CommandEmpty>

                {/* Templates */}
                <CommandGroup heading="Template Populer">
                    {filteredTemplates.map((template) => (
                        <CommandItem
                            key={template.id}
                            value={`${template.title} ${template.category} ${template.tags.join(" ")}`}
                            onSelect={() => runCommand(() => navigate(`/templates/${template.slug}`))}
                            className="flex items-center gap-3"
                        >
                            <img
                                src={template.thumbnailUrl}
                                alt={template.title}
                                className="w-10 h-10 rounded-md object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{template.title}</div>
                                <div className="text-xs text-muted-foreground">{template.category}</div>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                                ⭐ {template.rating}
                            </Badge>
                        </CommandItem>
                    ))}
                    <CommandItem
                        onSelect={() => runCommand(() => navigate("/templates"))}
                        className="flex items-center gap-2 text-primary"
                    >
                        <ArrowRight className="w-4 h-4" />
                        <span>Lihat Semua Template</span>
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                {/* Navigation */}
                <CommandGroup heading="Navigasi">
                    {navPages.map((page) => (
                        <CommandItem
                            key={page.href}
                            value={`${page.name} ${page.keywords.join(" ")}`}
                            onSelect={() => runCommand(() => navigate(page.href))}
                        >
                            <page.icon className="mr-2 h-4 w-4" />
                            <span>{page.name}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandSeparator />

                {/* Theme Actions */}
                <CommandGroup heading="Pengaturan Tema">
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
                        }
                    >
                        {resolvedTheme === "dark" ? (
                            <Sun className="mr-2 h-4 w-4" />
                        ) : (
                            <Moon className="mr-2 h-4 w-4" />
                        )}
                        <span>Toggle Dark Mode</span>
                        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                            {resolvedTheme === "dark" ? "Light" : "Dark"}
                        </kbd>
                    </CommandItem>

                    <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
                        <Command className="mr-2 h-4 w-4" />
                        <span>Gunakan Tema System</span>
                        {theme === "system" && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                                Aktif
                            </Badge>
                        )}
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                {/* Color Scheme */}
                <CommandGroup heading="Skema Warna">
                    {(Object.keys(COLOR_SCHEME_INFO) as ColorScheme[]).map((scheme) => (
                        <CommandItem
                            key={scheme}
                            value={`warna ${scheme} ${COLOR_SCHEME_INFO[scheme].name}`}
                            onSelect={() => runCommand(() => setColorScheme(scheme))}
                            className="flex items-center"
                        >
                            <span
                                className="mr-2 w-4 h-4 rounded-full"
                                style={{ backgroundColor: COLOR_SCHEME_INFO[scheme].color }}
                            />
                            <span>{COLOR_SCHEME_INFO[scheme].name}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>

            {/* Footer hint */}
            <div className="flex items-center justify-between px-4 py-2 border-t text-xs text-muted-foreground">
                <span>
                    Tekanan{" "}
                    <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono">↵</kbd> untuk
                    memilih
                </span>
                <span>
                    <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono">ESC</kbd> untuk
                    menutup
                </span>
            </div>
        </CommandDialog>
    );
}

// Hook to control command palette from anywhere
export function useCommandPalette() {
    const [open, setOpen] = useState(false);
    return { open, setOpen, toggle: () => setOpen((o) => !o) };
}
