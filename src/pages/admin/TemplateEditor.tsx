import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Save,
    Eye,
    Image,
    Upload,
    X,
    Plus,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getTemplateBySlug, templates } from "@/lib/data";

export default function TemplateEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    // Find existing template if editing
    const existingTemplate = isEditing
        ? templates.find((t) => t.id === id)
        : null;

    const [formData, setFormData] = useState({
        title: existingTemplate?.title || "",
        slug: existingTemplate?.slug || "",
        shortDescription: existingTemplate?.shortDescription || "",
        description: existingTemplate?.description || "",
        price: existingTemplate?.price?.toString() || "",
        category: existingTemplate?.category || "",
        tags: existingTemplate?.tags || [] as string[],
        techStack: existingTemplate?.techStack || [] as string[],
        featured: existingTemplate?.featured || false,
    });

    const [newTag, setNewTag] = useState("");
    const [newTech, setNewTech] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In real app, save to API
        console.log("Saving template:", formData);
        navigate("/admin/templates");
    };

    const addTag = () => {
        if (newTag && !formData.tags.includes(newTag)) {
            setFormData({ ...formData, tags: [...formData.tags, newTag] });
            setNewTag("");
        }
    };

    const removeTag = (tag: string) => {
        setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
    };

    const addTech = () => {
        if (newTech && !formData.techStack.includes(newTech)) {
            setFormData({ ...formData, techStack: [...formData.techStack, newTech] });
            setNewTech("");
        }
    };

    const removeTech = (tech: string) => {
        setFormData({
            ...formData,
            techStack: formData.techStack.filter((t) => t !== tech),
        });
    };

    return (
        <AdminLayout
            title={isEditing ? "Edit Template" : "New Template"}
            description={isEditing ? "Edit template details" : "Create a new template"}
        >
            <form onSubmit={handleSubmit}>
                {/* Header Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-6"
                >
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => navigate("/admin/templates")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Templates
                    </Button>
                    <div className="flex gap-2">
                        <Button type="button" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                        </Button>
                        <Button type="submit">
                            <Save className="w-4 h-4 mr-2" />
                            {isEditing ? "Update" : "Create"} Template
                        </Button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Basic Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData({ ...formData, title: e.target.value })
                                            }
                                            placeholder="Template title"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="slug">Slug</Label>
                                        <Input
                                            id="slug"
                                            value={formData.slug}
                                            onChange={(e) =>
                                                setFormData({ ...formData, slug: e.target.value })
                                            }
                                            placeholder="template-slug"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="shortDescription">Short Description</Label>
                                    <Input
                                        id="shortDescription"
                                        value={formData.shortDescription}
                                        onChange={(e) =>
                                            setFormData({ ...formData, shortDescription: e.target.value })
                                        }
                                        placeholder="Brief description for cards"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Full Description (Markdown)</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                        placeholder="Detailed description with markdown support..."
                                        rows={10}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Images */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Images</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                    <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground mb-4">
                                        Drag and drop images here, or click to browse
                                    </p>
                                    <Button type="button" variant="outline">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Images
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tags & Tech Stack */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Tags & Tech Stack</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Tags */}
                                <div className="space-y-2">
                                    <Label>Tags</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            placeholder="Add a tag"
                                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                                        />
                                        <Button type="button" variant="outline" onClick={addTag}>
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="gap-1">
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag(tag)}
                                                    className="hover:text-destructive"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div className="space-y-2">
                                    <Label>Tech Stack</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={newTech}
                                            onChange={(e) => setNewTech(e.target.value)}
                                            placeholder="Add technology"
                                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                                        />
                                        <Button type="button" variant="outline" onClick={addTech}>
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.techStack.map((tech) => (
                                            <Badge key={tech} className="gap-1">
                                                {tech}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTech(tech)}
                                                    className="hover:text-destructive"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Pricing */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Pricing</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price (IDR)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) =>
                                            setFormData({ ...formData, price: e.target.value })
                                        }
                                        placeholder="199000"
                                        required
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Category */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Category</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, category: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Portfolio">Portfolio</SelectItem>
                                        <SelectItem value="Landing Page">Landing Page</SelectItem>
                                        <SelectItem value="SaaS">SaaS</SelectItem>
                                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                                    </SelectContent>
                                </Select>
                            </CardContent>
                        </Card>

                        {/* Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Featured</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Display in featured section
                                        </p>
                                    </div>
                                    <Switch
                                        checked={formData.featured}
                                        onCheckedChange={(checked) =>
                                            setFormData({ ...formData, featured: checked })
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </form>
        </AdminLayout>
    );
}
