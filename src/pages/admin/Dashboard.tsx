import { motion } from "framer-motion";
import {
    DollarSign,
    ShoppingCart,
    Users,
    FileText,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";

// Mock data
const stats = [
    {
        title: "Total Revenue",
        value: "Rp 45.231.000",
        change: "+20.1%",
        trend: "up",
        icon: DollarSign,
    },
    {
        title: "Orders",
        value: "356",
        change: "+15.3%",
        trend: "up",
        icon: ShoppingCart,
    },
    {
        title: "Users",
        value: "2,543",
        change: "+8.2%",
        trend: "up",
        icon: Users,
    },
    {
        title: "Templates",
        value: "48",
        change: "+2",
        trend: "up",
        icon: FileText,
    },
];

const recentOrders = [
    {
        id: "ORD-001",
        customer: "Ahmad Rizki",
        email: "ahmad@email.com",
        template: "Developer Portfolio Pro",
        amount: 199000,
        status: "completed",
        date: "2026-01-30",
    },
    {
        id: "ORD-002",
        customer: "Sarah Putri",
        email: "sarah@email.com",
        template: "SaaS Dashboard Kit",
        amount: 399000,
        status: "processing",
        date: "2026-01-30",
    },
    {
        id: "ORD-003",
        customer: "Budi Santoso",
        email: "budi@email.com",
        template: "Creative Agency Starter",
        amount: 249000,
        status: "pending",
        date: "2026-01-29",
    },
    {
        id: "ORD-004",
        customer: "Diana Kusuma",
        email: "diana@email.com",
        template: "Minimalist Store",
        amount: 349000,
        status: "completed",
        date: "2026-01-29",
    },
];

const chartData = [
    { name: "Jan", revenue: 15000000 },
    { name: "Feb", revenue: 22000000 },
    { name: "Mar", revenue: 18000000 },
    { name: "Apr", revenue: 28000000 },
    { name: "May", revenue: 35000000 },
    { name: "Jun", revenue: 32000000 },
    { name: "Jul", revenue: 45000000 },
];

const topTemplates = [
    { name: "SaaS Dashboard Kit", sales: 156, revenue: 62244000 },
    { name: "Startup Launch", sales: 134, revenue: 30706000 },
    { name: "Developer Portfolio Pro", sales: 128, revenue: 25472000 },
    { name: "Fashion Boutique", sales: 89, revenue: 39961000 },
];

const statusColors: Record<string, string> = {
    completed: "bg-success/10 text-success",
    processing: "bg-warning/10 text-warning",
    pending: "bg-muted text-muted-foreground",
    cancelled: "bg-destructive/10 text-destructive",
};

export default function AdminDashboard() {
    return (
        <AdminLayout title="Dashboard" description="Overview performa TamanWEB">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <stat.icon className="w-4 h-4 text-primary" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    {stat.trend === "up" ? (
                                        <TrendingUp className="w-4 h-4 text-success" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4 text-destructive" />
                                    )}
                                    <span
                                        className={cn(
                                            "text-sm",
                                            stat.trend === "up" ? "text-success" : "text-destructive"
                                        )}
                                    >
                                        {stat.change}
                                    </span>
                                    <span className="text-sm text-muted-foreground">vs bulan lalu</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                                        <XAxis
                                            dataKey="name"
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                        />
                                        <YAxis
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "hsl(var(--card))",
                                                border: "1px solid hsl(var(--border))",
                                                borderRadius: "8px",
                                            }}
                                            formatter={(value: number) => [formatPrice(value), "Revenue"]}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="hsl(var(--primary))"
                                            strokeWidth={2}
                                            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Top Templates */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Top Templates</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topTemplates.map((template, index) => (
                                    <div
                                        key={template.name}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm">{template.name}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {template.sales} sales
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium">
                                            {formatPrice(template.revenue)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Recent Orders */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6"
            >
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Orders</CardTitle>
                        <Button variant="outline" size="sm" asChild>
                            <a href="/admin/orders">
                                View All
                                <ArrowUpRight className="w-4 h-4 ml-1" />
                            </a>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead className="hidden md:table-cell">Template</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{order.customer}</div>
                                                <div className="text-xs text-muted-foreground">{order.email}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">{order.template}</TableCell>
                                        <TableCell>{formatPrice(order.amount)}</TableCell>
                                        <TableCell>
                                            <Badge className={cn("capitalize", statusColors[order.status])}>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </motion.div>
        </AdminLayout>
    );
}
