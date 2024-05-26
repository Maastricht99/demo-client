"use client";

import { useRouter } from "next/navigation";
import React from "react";
import MyProductCard from "./my-product-card";
import { IMyProduct } from "@/types";

interface MyProductsListProps {
    products: IMyProduct[];
}

export default function MyProductsList({ products }: MyProductsListProps) {

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
        <div className="w-full flex flex-wrap gap-x-[10px] gap-y-[20px] p-[40px] pt-[10px] overflow-auto">
            {
                products.map((product: any) => {
                    return <MyProductCard key={product.id} product={product} />
                })
            }
        </div>
    )
}