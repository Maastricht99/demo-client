"use client";

import Link from "next/link";
import ProductCard from "../../components/product-card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyProducts } from "@/server/actions";
import { useRouter } from "next/navigation";
import React from "react";

export default function Products() {

    const { data, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: () => getMyProducts()
    });

    const queryClient = useQueryClient();

    React.useEffect(() => {
        let interval: NodeJS.Timeout;

        if (!data) {
            return;
        } 

        const isAnyProductPending = data.some(product => product.status === "PENDING");

        if (isAnyProductPending) {
            console.log("some products pending")
            interval = setInterval(() => {
                console.log("refetching")
                queryClient.invalidateQueries({ queryKey: ["products"] })
            }, 3000)
        }

        return () => clearInterval(interval);

    }, [data])

    return (
        <>
            <h1>Products</h1>
            <div className="grid grid-cols-4 gap-4 ml-10 mr-10">
                {
                    data?.map((product: any) => {
                        return <ProductCard product={product} />
                    })
                }
            </div>
            <Link href="/products/new">Add</Link>
        </>
    )
}