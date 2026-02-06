import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Template } from "@/lib/data";

export interface CartItem {
    template: Template;
    quantity: number;
    addedAt: Date;
}

interface CartContextValue {
    items: CartItem[];
    addItem: (template: Template) => void;
    removeItem: (templateId: string) => void;
    clearCart: () => void;
    isInCart: (templateId: string) => boolean;
    itemCount: number;
    subtotal: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("cart");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    return parsed.map((item: CartItem) => ({
                        ...item,
                        addedAt: new Date(item.addedAt),
                    }));
                } catch {
                    return [];
                }
            }
        }
        return [];
    });
    const [isOpen, setIsOpen] = useState(false);

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addItem = (template: Template) => {
        setItems((current) => {
            const existing = current.find((item) => item.template.id === template.id);
            if (existing) {
                // Item already in cart, just open the cart
                return current;
            }
            return [...current, { template, quantity: 1, addedAt: new Date() }];
        });
        setIsOpen(true);
    };

    const removeItem = (templateId: string) => {
        setItems((current) => current.filter((item) => item.template.id !== templateId));
    };

    const clearCart = () => {
        setItems([]);
    };

    const isInCart = (templateId: string) => {
        return items.some((item) => item.template.id === templateId);
    };

    const itemCount = items.length;

    const subtotal = items.reduce((total, item) => total + item.template.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                clearCart,
                isInCart,
                itemCount,
                subtotal,
                isOpen,
                setIsOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
