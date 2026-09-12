import { getAllProducts, getProduct } from "@/lib/firebase/products";
import { Product as AdminProduct } from "@/types/admin";
import { Product as StoreProduct, products as fallbackProducts } from "@/lib/products";

function toStoreProduct(product: AdminProduct): StoreProduct {
  const createdAt = new Date(product.createdAt);
  const isNew =
    Date.now() - createdAt.getTime() < 1000 * 60 * 60 * 24 * 30;

  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.discountPrice ?? product.price,
    description: product.description,
    images: product.images.length > 0 ? product.images : ["/images/image.jpg"],
    sizes: product.sizes,
    colors: product.colors,
    rating: 4.5,
    reviews: 0,
    isFeatured: product.isFeatured,
    isNew,
  };
}

export async function fetchStoreProducts(): Promise<StoreProduct[]> {
  try {
    const products = await getAllProducts();
    const activeProducts = products.filter((product) => product.isActive);

    if (activeProducts.length === 0) {
      return fallbackProducts;
    }

    return activeProducts.map(toStoreProduct);
  } catch (error) {
    console.error("Failed to load products from Firebase:", error);
    return fallbackProducts;
  }
}

export async function fetchStoreProduct(id: string): Promise<StoreProduct | null> {
  try {
    const product = await getProduct(id);

    if (!product || !product.isActive) {
      return fallbackProducts.find((item) => item.id === id) ?? null;
    }

    return toStoreProduct(product);
  } catch (error) {
    console.error("Failed to load product from Firebase:", error);
    return fallbackProducts.find((item) => item.id === id) ?? null;
  }
}
