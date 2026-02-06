import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    type?: "website" | "article" | "product";
    noIndex?: boolean;
}

const defaultMeta = {
    siteName: "TamanWEB",
    title: "TamanWEB - Template Website Profesional Premium",
    description: "Koleksi template website premium untuk bisnis, portfolio, SaaS, dan e-commerce. Desain modern, responsif, dan SEO-friendly.",
    keywords: ["template website", "website premium", "template react", "template tailwind", "website profesional"],
    image: "/og-image.png",
    url: "https://tamanweb.id",
};

export function SEO({
    title,
    description,
    keywords = [],
    image,
    type = "website",
    noIndex = false,
}: SEOProps) {
    const location = useLocation();

    const fullTitle = title ? `${title} | ${defaultMeta.siteName}` : defaultMeta.title;
    const fullDescription = description || defaultMeta.description;
    const fullKeywords = [...defaultMeta.keywords, ...keywords].join(", ");
    const fullImage = image || defaultMeta.image;
    const fullUrl = `${defaultMeta.url}${location.pathname}`;

    useEffect(() => {
        // Update document title
        document.title = fullTitle;

        // Helper to update or create meta tag
        const setMetaTag = (name: string, content: string, isProperty = false) => {
            const attr = isProperty ? "property" : "name";
            let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;

            if (!tag) {
                tag = document.createElement("meta");
                tag.setAttribute(attr, name);
                document.head.appendChild(tag);
            }
            tag.content = content;
        };

        // Standard meta tags
        setMetaTag("description", fullDescription);
        setMetaTag("keywords", fullKeywords);
        if (noIndex) {
            setMetaTag("robots", "noindex, nofollow");
        }

        // Open Graph
        setMetaTag("og:title", fullTitle, true);
        setMetaTag("og:description", fullDescription, true);
        setMetaTag("og:image", fullImage, true);
        setMetaTag("og:url", fullUrl, true);
        setMetaTag("og:type", type, true);
        setMetaTag("og:site_name", defaultMeta.siteName, true);

        // Twitter Card
        setMetaTag("twitter:card", "summary_large_image");
        setMetaTag("twitter:title", fullTitle);
        setMetaTag("twitter:description", fullDescription);
        setMetaTag("twitter:image", fullImage);

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.rel = "canonical";
            document.head.appendChild(canonical);
        }
        canonical.href = fullUrl;

    }, [fullTitle, fullDescription, fullKeywords, fullImage, fullUrl, type, noIndex]);

    return null; // This component doesn't render anything
}

// JSON-LD structured data helper
export function generateProductSchema(template: {
    title: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: template.title,
        description: template.description,
        image: template.image,
        offers: {
            "@type": "Offer",
            price: template.price,
            priceCurrency: "IDR",
            availability: "https://schema.org/InStock",
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: template.rating,
            reviewCount: template.reviews,
        },
    };
}

// Component to inject JSON-LD
export function JsonLd({ data }: { data: object }) {
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(data);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [data]);

    return null;
}
