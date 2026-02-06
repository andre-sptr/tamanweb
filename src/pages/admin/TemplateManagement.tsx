import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    Copy,
    ArrowUpDown,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import { templates, formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function TemplateManagement() {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const filteredTemplates = templates.filter((template) => {
        const matchesSearch =
            template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            categoryFilter === "all" || template.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const toggleSelectAll = () => {
        if (selectedItems.length === filteredTemplates.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(filteredTemplates.map((t) => t.id));
        }
    };

    const toggleSelectItem = (id: string) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter((i) => i !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    return (
        <AdminLayout title="Templates" description="Kelola semua template website">
            {/* Actions Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-4 mb-6"
            >
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Cari template..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-40">
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Portfolio">Portfolio</SelectItem>
                            <SelectItem value="Landing Page">Landing Page</SelectItem>
                            <SelectItem value="SaaS">SaaS</SelectItem>
                            <SelectItem value="E-commerce">E-commerce</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button asChild>
                        <Link to="/admin/templates/new">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Template
                        </Link>
                    </Button>
                </div>
            </motion.div>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-primary/10 rounded-lg flex items-center justify-between"
                >
                    <span className="text-sm font-medium">
                        {selectedItems.length} template selected
                    </span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            Publish
                        </Button>
                        <Button variant="outline" size="sm">
                            Unpublish
                        </Button>
                        <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                        </Button>
                    </div>
                </motion.div>
            )}

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
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={
                                        selectedItems.length === filteredTemplates.length &&
                                        filteredTemplates.length > 0
                                    }
                                    onCheckedChange={toggleSelectAll}
                                />
                            </TableHead>
                            <TableHead className="min-w-[250px]">
                                <Button variant="ghost" size="sm" className="-ml-3">
                                    Template <ArrowUpDown className="w-4 h-4 ml-1" />
                                </Button>
                            </TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-12"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTemplates.map((template) => (
                            <TableRow key={template.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedItems.includes(template.id)}
                                        onCheckedChange={() => toggleSelectItem(template.id)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={template.thumbnailUrl}
                                            alt={template.title}
                                            className="w-16 h-12 rounded-lg object-cover"
                                        />
                                        <div>
                                            <div className="font-medium">{template.title}</div>
                                            <div className="text-xs text-muted-foreground line-clamp-1">
                                                {template.shortDescription}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{template.category}</Badge>
                                </TableCell>
                                <TableCell className="font-medium">
                                    {formatPrice(template.price)}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <span className="text-warning">★</span>
                                        <span>{template.rating}</span>
                                        <span className="text-muted-foreground">({template.reviews})</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        className={cn(
                                            template.featured
                                                ? "bg-success/10 text-success"
                                                : "bg-muted text-muted-foreground"
                                        )}
                                    >
                                        {template.featured ? "Featured" : "Standard"}
                                    </Badge>
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
                                            <DropdownMenuItem asChild>
                                                <Link to={`/templates/${template.slug}`}>
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link to={`/admin/templates/${template.id}/edit`}>
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Copy className="w-4 h-4 mr-2" />
                                                Duplicate
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
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

            {/* Pagination placeholder */}
            <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Showing {filteredTemplates.length} of {templates.length} templates
                </p>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                        Next
                    </Button>
                </div>
            </div>
        </AdminLayout>
    );
}
