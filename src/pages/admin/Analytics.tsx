import { motion } from "framer-motion";
import {
    TrendingUp,
    Users,
    ShoppingCart,
    DollarSign,
    Eye,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { formatPrice } from "@/lib/data";

// Mock data
const revenueData = [
    { name: "Jan", revenue: 15000000, orders: 45 },
    { name: "Feb", revenue: 22000000, orders: 62 },
    { name: "Mar", revenue: 18000000, orders: 51 },
    { name: "Apr", revenue: 28000000, orders: 78 },
    { name: "May", revenue: 35000000, orders: 95 },
    { name: "Jun", revenue: 32000000, orders: 88 },
    { name: "Jul", revenue: 45000000, orders: 120 },
];

const categoryData = [
    { name: "Portfolio", value: 35, color: "hsl(217, 91%, 60%)" },
    { name: "Landing Page", value: 28, color: "hsl(142, 76%, 36%)" },
    { name: "SaaS", value: 22, color: "hsl(38, 92%, 50%)" },
    { name: "E-commerce", value: 15, color: "hsl(280, 65%, 60%)" },
];

const trafficData = [
    { source: "Organic Search", visits: 12500, percentage: 42 },
    { source: "Direct", visits: 8200, percentage: 28 },
    { source: "Social Media", visits: 5400, percentage: 18 },
    { source: "Referral", visits: 2100, percentage: 7 },
    { source: "Email", visits: 1500, percentage: 5 },
];

const topPages = [
    { page: "/templates", views: 15200, bounceRate: "32%" },
    { page: "/", views: 12800, bounceRate: "25%" },
    { page: "/templates/saas-dashboard-kit", views: 4500, bounceRate: "18%" },
    { page: "/templates/developer-portfolio-pro", views: 3800, bounceRate: "22%" },
    { page: "/about", views: 2100, bounceRate: "45%" },
];

const metrics = [
    { title: "Total Revenue", value: "Rp 195.000.000", change: "+23.5%", trend: "up", icon: DollarSign },
    { title: "Total Orders", value: "539", change: "+18.2%", trend: "up", icon: ShoppingCart },
    { title: "Total Users", value: "2,847", change: "+12.8%", trend: "up", icon: Users },
    { title: "Page Views", value: "48.2K", change: "-3.5%", trend: "down", icon: Eye },
];

export default function Analytics() {
    return (
        <AdminLayout title="Analytics" description="Statistik dan performa TamanWEB">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {metrics.map((metric, index) => (
                    <motion.div
                        key={metric.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{metric.title}</p>
                                        <p className="text-2xl font-bold mt-1">{metric.value}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            {metric.trend === "up" ? (
                                                <ArrowUpRight className="w-4 h-4 text-success" />
                                            ) : (
                                                <ArrowDownRight className="w-4 h-4 text-destructive" />
                                            )}
                                            <span className={metric.trend === "up" ? "text-success" : "text-destructive"}>
                                                {metric.change}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <metric.icon className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2"
                >
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Revenue & Orders Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={revenueData}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                                        <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                                        <YAxis yAxisId="left" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                                        <YAxis yAxisId="right" orientation="right" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "hsl(var(--card))",
                                                border: "1px solid hsl(var(--border))",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <Legend />
                                        <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} name="Revenue" />
                                        <Line yAxisId="right" type="monotone" dataKey="orders" stroke="hsl(var(--success))" strokeWidth={2} name="Orders" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Category Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Sales by Category</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "hsl(var(--card))",
                                                border: "1px solid hsl(var(--border))",
                                                borderRadius: "8px",
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-2 mt-4">
                                {categoryData.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                            <span>{item.name}</span>
                                        </div>
                                        <span className="font-medium">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traffic Sources */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Traffic Sources</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {trafficData.map((item) => (
                                    <div key={item.source}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm">{item.source}</span>
                                            <span className="text-sm text-muted-foreground">
                                                {item.visits.toLocaleString()} ({item.percentage}%)
                                            </span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all"
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Top Pages */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Pages</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topPages.map((page, index) => (
                                    <div key={page.page} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                                {index + 1}
                                            </span>
                                            <span className="text-sm font-medium truncate max-w-[200px]">{page.page}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium">{page.views.toLocaleString()}</div>
                                            <div className="text-xs text-muted-foreground">Bounce: {page.bounceRate}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </AdminLayout>
    );
}
