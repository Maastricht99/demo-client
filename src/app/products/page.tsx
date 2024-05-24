import Link from "next/link";
import ProductCard from "../../components/product-card";
import { getMyProducts } from "@/server/actions";
import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import ProductsGrid from "./products-grid";
import ProductsContainer from "./products-container";

export default async function ProductsPage() {

    const products = await getMyProducts();

    return (
        <>
            <h1>Products</h1>
            <Suspense fallback={<p>Loading</p>}>
                <ProductsContainer />
            </Suspense>
            <Link href="/products/new">Add</Link>
        </>
    )
}