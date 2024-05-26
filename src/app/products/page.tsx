import { Suspense } from "react";
import MyProductsListContainer from "./my-products-list-container";
import AddProductDialog from "./add-product-dialog";
import MyProductsListSkeleton from "./my-products-list-skeleton";

export default function MyProductsPage() {

    return (
        <div className="flex flex-col items-center">
            <div className="w-full flex justify-between p-[30px] pl-[60px] pr-[60px]">
                <h1 className="text-[30px] font-bold">
                    My Products
                </h1>
                <Suspense>
                    <AddProductDialog />
                </Suspense>
            </div>
            <Suspense fallback={<MyProductsListSkeleton />}>
                <MyProductsListContainer />
            </Suspense>
        </div>
    )
}