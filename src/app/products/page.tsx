import Link from "next/link";
import ProductCard from "../../components/product-card";
import { getMyProducts } from "@/server/actions";
import React from "react";
import { useRouter } from "next/navigation";
import ProductsGrid from "./products-grid";

export default async function Products() {

    const products = await getMyProducts();

    return (
        <>
            <h1>Products</h1>
            <ProductsGrid products={products} />
            <Link href="/products/new">Add</Link>
        </>
    )
}