"use client";

import ProductCard from "@/components/product-card";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductsGridProps {
    products: any[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {

    const router = useRouter();

    // Short polling, refetch periodically for updates almost in real time
    React.useEffect(() => {
        let interval: NodeJS.Timeout;

        const isAnyProductPending = products.some(product => product.status === "PENDING");

        if (isAnyProductPending) {
            interval = setInterval(() => {
                router.refresh();
            }, 3000)
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };

    }, [products, router])

    return (
        <div className="grid grid-cols-4 gap-4 ml-10 mr-10">
            {
                products.map((product: any) => {
                    return <ProductCard key={product.id} product={product} />
                })
            }
        </div>
    )
}