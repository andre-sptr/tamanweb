import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartProvider";
import { formatPrice } from "@/lib/data";

export function Cart() {
    const { items, removeItem, clearCart, itemCount, subtotal, isOpen, setIsOpen } = useCart();

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <AnimatePresence>
                        {itemCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center"
                            >
                                {itemCount}
                            </motion.span>
                        )}
                    </AnimatePresence>
                    <span className="sr-only">Shopping Cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5" />
                        Keranjang Belanja
                        {itemCount > 0 && (
                            <Badge variant="secondary">{itemCount} item</Badge>
                        )}
                    </SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4"
                        >
                            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
                        </motion.div>
                        <h3 className="font-semibold text-lg mb-2">Keranjang Kosong</h3>
                        <p className="text-muted-foreground text-sm mb-6">
                            Belum ada template di keranjang Anda.
                        </p>
                        <Button asChild onClick={() => setIsOpen(false)}>
                            <Link to="/templates">
                                Jelajahi Template
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 -mx-6 px-6">
                            <div className="space-y-4 py-4">
                                <AnimatePresence mode="popLayout">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.template.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex gap-4 bg-muted/50 rounded-xl p-3"
                                        >
                                            <img
                                                src={item.template.thumbnailUrl}
                                                alt={item.template.title}
                                                className="w-20 h-16 rounded-lg object-cover"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-sm truncate">
                                                    {item.template.title}
                                                </h4>
                                                <p className="text-xs text-muted-foreground">
                                                    {item.template.category}
                                                </p>
                                                <p className="text-sm font-semibold text-primary mt-1">
                                                    {formatPrice(item.template.price)}
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                onClick={() => removeItem(item.template.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </ScrollArea>

                        <div className="border-t pt-4 space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-semibold">{formatPrice(subtotal)}</span>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <span className="font-medium">Total</span>
                                <span className="text-xl font-bold text-primary">
                                    {formatPrice(subtotal)}
                                </span>
                            </div>

                            <SheetFooter className="flex-col gap-2 sm:flex-col">
                                <Button className="w-full gap-2" size="lg">
                                    <ShoppingBag className="w-4 h-4" />
                                    Checkout
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive"
                                    onClick={clearCart}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Kosongkan Keranjang
                                </Button>
                            </SheetFooter>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
