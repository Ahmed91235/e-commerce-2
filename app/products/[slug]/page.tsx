import { notFound } from 'next/navigation';
import { sampleProducts } from '@/lib/sample-data';
import { Product } from '@/types/product';
import ProductDetailView from '@/components/product/ProductDetailView';

// Convert product name to slug format
function toSlug(name: string): string {
  return name.toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove multiple consecutive hyphens
}

// Find product by slug
function findProductBySlug(slug: string): Product | undefined {
  return sampleProducts.find(product => toSlug(product.name) === slug);
}

// Generate static params for static generation
export async function generateStaticParams() {
  return sampleProducts.map((product) => ({
    slug: toSlug(product.name),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found - ECommerce',
    };
  }

  return {
    title: `${product.name} - ECommerce`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = sampleProducts
    .filter(p => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
}