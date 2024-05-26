import { Suspense } from "react";
import ProductBids from "./product-bids";
import ProductContainer from "./product-container";

export default function SingleProductPage({ params }: any) {
    const productId = params.productId;

    return (
        <div className="flex flex-col w-[300px] bg-white">
            <Suspense fallback={<p>Loafing</p>}>
                <>
                    <ProductContainer productId={productId} />
                    <ProductBids />
                </>
            </Suspense>
        </div>
    )
}

