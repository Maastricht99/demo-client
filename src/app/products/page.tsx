import { getMyProducts } from "@/server/actions";
import { Suspense } from "react";
import ProductsContainer from "./products-container";
import Link from "next/link";
import AddProductDialog from "./add-product-dialog";

export default async function ProductsList() {
    const products = await getMyProducts();

    return (
        <>
            <h1>Products</h1>
            <Suspense fallback={<p>Loading</p>}>
                <ProductsContainer />
            </Suspense>
            <AddProductDialog />
        </>
    )
}