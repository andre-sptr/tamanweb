import { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Download,
    RefreshCw,
    CheckCircle,
    XCircle,
    Clock,
    Package,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";

// Mock orders data
const orders = [
    {
        id: "ORD-001",
        customer: { name: "Ahmad Rizki", email: "ahmad@email.com" },
        template: "Developer Portfolio Pro",
        amount: 199000,
        status: "completed",
        paymentMethod: "Bank Transfer",
        date: "2026-01-30T10:15:00",
    },
    {
        id: "ORD-002",
        customer: { name: "Sarah Putri", email: "sarah@email.com" },
        template: "SaaS Dashboard Kit",
        amount: 399000,
        status: "processing",
        paymentMethod: "Credit Card",
        date: "2026-01-30T09:30:00",
    },
    {
        id: "ORD-003",
        customer: { name: "Budi Santoso", email: "budi@email.com" },
        template: "Creative Agency Starter",
        amount: 249000,
        status: "pending",
        paymentMethod: "E-Wallet",
        date: "2026-01-29T16:45:00",
    },
    {
        id: "ORD-004",
        customer: { name: "Diana Kusuma", email: "diana@email.com" },
        template: "Minimalist Store",
        amount: 349000,
        status: "completed",
        paymentMethod: "Bank Transfer",
        date: "2026-01-29T14:20:00",
    },
    {
        id: "ORD-005",
        customer: { name: "Eko Prasetyo", email: "eko@email.com" },
        template: "Startup Launch",
        amount: 229000,
        status: "cancelled",
        paymentMethod: "Credit Card",
        date: "2026-01-28T11:00:00",
    },
];

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle }> = {
    completed: { color: "bg-success/10 text-success", icon: CheckCircle },
    processing: { color: "bg-warning/10 text-warning", icon: RefreshCw },
    pending: { color: "bg-muted text-muted-foreground", icon: Clock },
    cancelled: { color: "bg-destructive/10 text-destructive", icon: XCircle },
};

export default function OrderManagement() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.template.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalRevenue = filteredOrders
        .filter((o) => o.status === "completed")
        .reduce((sum, o) => sum + o.amount, 0);

    return (
        <AdminLayout title="Orders" description="Kelola semua pesanan">
            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
            >
                <div className="bg-card rounded-lg border border-border p-4">
                    <div className="text-sm text-muted-foreground">Total Orders</div>
                    <div className="text-2xl font-bold">{orders.length}</div>
                </div>
                <div className="bg-card rounded-lg border border-border p-4">
                    <div className="text-sm text-muted-foreground">Completed</div>
                    <div className="text-2xl font-bold text-success">
                        {orders.filter((o) => o.status === "completed").length}
                    </div>
                </div>
                <div className="bg-card rounded-lg border border-border p-4">
                    <div className="text-sm text-muted-foreground">Pending</div>
                    <div className="text-2xl font-bold text-warning">
                        {orders.filter((o) => o.status === "pending" || o.status === "processing").length}
                    </div>
                </div>
                <div className="bg-card rounded-lg border border-border p-4">
                    <div className="text-sm text-muted-foreground">Revenue</div>
                    <div className="text-2xl font-bold text-primary">{formatPrice(totalRevenue)}</div>
                </div>
            </motion.div>

            {/* Actions Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col sm:flex-row gap-4 mb-6"
            >
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Cari order..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40">
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </motion.div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-lg border border-border bg-card overflow-hidden"
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead className="min-w-[180px]">Customer</TableHead>
                            <TableHead>Template</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="w-12"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.map((order) => {
                            const StatusIcon = statusConfig[order.status].icon;
                            return (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{order.customer.name}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {order.customer.email}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{order.template}</TableCell>
                                    <TableCell className="font-medium">{formatPrice(order.amount)}</TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {order.paymentMethod}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={cn("capitalize gap-1", statusConfig[order.status].color)}>
                                            <StatusIcon className="w-3 h-3" />
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {new Date(order.date).toLocaleDateString("id-ID")}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Package className="w-4 h-4 mr-2" />
                                                    Update Status
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Download Invoice
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </motion.div>

            <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredOrders.length} of {orders.length} orders
            </div>
        </AdminLayout>
    );
}
