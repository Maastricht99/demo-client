import { getMyProducts } from "@/server/actions";
import ProductsGrid from "./products-grid";

export default async function ProductsContainer() {
    const products = await getMyProducts();

    return <ProductsGrid products={products} />
}