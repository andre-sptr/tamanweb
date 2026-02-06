import { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    MoreHorizontal,
    Mail,
    Ban,
    Trash2,
    Eye,
    UserCheck,
    UserX,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { cn } from "@/lib/utils";

// Mock users data
const users = [
    {
        id: "1",
        name: "Ahmad Rizki",
        email: "ahmad@email.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        role: "user",
        status: "active",
        purchases: 3,
        totalSpent: 847000,
        joinedAt: "2025-10-15",
    },
    {
        id: "2",
        name: "Sarah Putri",
        email: "sarah@email.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        role: "user",
        status: "active",
        purchases: 5,
        totalSpent: 1495000,
        joinedAt: "2025-08-22",
    },
    {
        id: "3",
        name: "Budi Santoso",
        email: "budi@email.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        role: "admin",
        status: "active",
        purchases: 0,
        totalSpent: 0,
        joinedAt: "2025-06-01",
    },
    {
        id: "4",
        name: "Diana Kusuma",
        email: "diana@email.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        role: "user",
        status: "suspended",
        purchases: 1,
        totalSpent: 249000,
        joinedAt: "2025-12-10",
    },
];

const statusColors: Record<string, string> = {
    active: "bg-success/10 text-success",
    suspended: "bg-destructive/10 text-destructive",
    pending: "bg-warning/10 text-warning",
};

const roleColors: Record<string, string> = {
    admin: "bg-primary/10 text-primary",
    user: "bg-muted text-muted-foreground",
};

export default function UserManagement() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || user.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);

    return (
        <AdminLayout title="Users" description="Kelola semua pengguna">
            {/* Actions Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-4 mb-6"
            >
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Cari user..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                </Select>
            </motion.div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-lg border border-border bg-card overflow-hidden"
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[200px]">User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Purchases</TableHead>
                            <TableHead>Total Spent</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="w-12"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-xs text-muted-foreground">{user.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge className={cn("capitalize", roleColors[user.role])}>
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge className={cn("capitalize", statusColors[user.status])}>
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{user.purchases}</TableCell>
                                <TableCell>{formatCurrency(user.totalSpent)}</TableCell>
                                <TableCell className="text-muted-foreground">
                                    {new Date(user.joinedAt).toLocaleDateString("id-ID")}
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
                                                <Mail className="w-4 h-4 mr-2" />
                                                Send Email
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            {user.status === "active" ? (
                                                <DropdownMenuItem className="text-warning">
                                                    <UserX className="w-4 h-4 mr-2" />
                                                    Suspend
                                                </DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem className="text-success">
                                                    <UserCheck className="w-4 h-4 mr-2" />
                                                    Activate
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </motion.div>

            <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {users.length} users
            </div>
        </AdminLayout>
    );
}
