import { getProductById } from "@/server/actions"
import ProductDetails from "./product-details";
import React from "react";

interface ProductContainerProps {
    productId: string;
}

export default async function ProductDetailsContainer({ productId }: ProductContainerProps) {

    const product = await getProductById(productId);
    return <ProductDetails product={product} />
}