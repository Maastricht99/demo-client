import { getMyProducts } from "@/server/actions";
import { Suspense } from "react";
import ProductsContainer from "./products-container";
import Link from "next/link";
import AddProductDialog from "./add-product-dialog";

export default async function ProductsList() {
    const products = await getMyProducts();

    return (
        <div className="flex flex-col items-center">
            <div className="w-full flex justify-between p-[30px] pl-[60px] pr-[60px]">
                <h1 className="text-[30px] font-bold">
                    My Products
                </h1>
                <AddProductDialog />
            </div>
            <Suspense fallback={<p>Loading</p>}>
                <ProductsContainer />
            </Suspense>
        </div>
    )
}