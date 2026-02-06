import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { TemplateCardSkeleton } from "@/components/templates/TemplateCard";
import {
    Skeleton,
    SkeletonText,
    SkeletonAvatar,
    SkeletonButton,
    SkeletonImage
} from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SkeletonDemo() {
    return (
        <Layout>
            <section className="pt-32 pb-16 gradient-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Skeleton <span className="text-gradient">Demo</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Enhanced loading states dengan efek shimmer profesional
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-12 bg-background">
                <div className="container">
                    {/* Template Cards Skeleton */}
                    <h2 className="text-2xl font-bold mb-6">Template Card Skeletons</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {[...Array(6)].map((_, i) => (
                            <TemplateCardSkeleton key={i} index={i} />
                        ))}
                    </div>

                    {/* Basic Skeletons */}
                    <h2 className="text-2xl font-bold mb-6">Basic Skeleton Variants</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        <Card>
                            <CardHeader className="pb-2">
                                <h3 className="font-semibold">Default</h3>
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-20 w-full" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <h3 className="font-semibold">Circular</h3>
                            </CardHeader>
                            <CardContent className="flex gap-3">
                                <SkeletonAvatar size="sm" />
                                <SkeletonAvatar size="md" />
                                <SkeletonAvatar size="lg" />
                                <SkeletonAvatar size="xl" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <h3 className="font-semibold">Text Lines</h3>
                            </CardHeader>
                            <CardContent>
                                <SkeletonText lines={4} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <h3 className="font-semibold">Buttons</h3>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                <SkeletonButton size="sm" />
                                <SkeletonButton size="default" />
                                <SkeletonButton size="lg" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Image Skeletons */}
                    <h2 className="text-2xl font-bold mb-6">Image Aspect Ratios</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        <Card>
                            <CardContent className="pt-6">
                                <SkeletonImage aspectRatio="square" />
                                <p className="text-sm text-muted-foreground mt-2 text-center">Square (1:1)</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <SkeletonImage aspectRatio="video" />
                                <p className="text-sm text-muted-foreground mt-2 text-center">Video (16:9)</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <SkeletonImage aspectRatio="portrait" />
                                <p className="text-sm text-muted-foreground mt-2 text-center">Portrait (3:4)</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <SkeletonImage aspectRatio="wide" />
                                <p className="text-sm text-muted-foreground mt-2 text-center">Wide (21:9)</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Profile Card Skeleton Example */}
                    <h2 className="text-2xl font-bold mb-6">Profile Card Example</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <Card key={i}>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <SkeletonAvatar size="xl" />
                                        <div className="flex-1">
                                            <Skeleton className="h-5 w-32 mb-2" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                    </div>
                                    <SkeletonText lines={3} />
                                    <div className="flex gap-2 mt-4">
                                        <SkeletonButton size="default" />
                                        <SkeletonButton size="default" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
