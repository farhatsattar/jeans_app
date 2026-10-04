import { getAllProducts, getProduct } from "@/lib/firebase/products";
import { Product as AdminProduct } from "@/types/admin";
import { Product as StoreProduct, products as fallbackProducts } from "@/lib/products";

function toStoreProduct(product: AdminProduct): StoreProduct {
  const createdAt = new Date(product.createdAt);
  const isNew =
    Date.now() - createdAt.getTime() < 1000 * 60 * 60 * 24 * 30;

  const validImages = product.images.filter(
    (image): image is string => Boolean(image?.trim())
  );

  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.discountPrice ?? product.price,
    description: product.description,
    images: validImages.length > 0 ? validImages : ["/images/image.jpg"],
    sizes: product.sizes,
    colors: product.colors,
    rating: 4.5,
    reviews: 0,
    isFeatured: Boolean(product.isFeatured),
    isNew,
  };
}

export async function fetchStoreProducts(): Promise<StoreProduct[]> {
  try {
    const products = await getAllProducts();
    // Treat missing isActive as active so newly added products still show
    const activeProducts = products.filter((product) => product.isActive !== false);

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
