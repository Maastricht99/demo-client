import { Suspense } from "react";
import ProductBidsList from "./product-bids-list";
import ProductDetailsSkeleton from "./product-details-skeleton";
import ProductDetailsContainer from "./product-details-container";

export default function AuctionedSingleProductPage({ params }: { params: { productId: string }}) {
    const productId = params.productId;

    return (
        <div className="flex flex-col w-[340px] bg-white">
            <Suspense fallback={<ProductDetailsSkeleton/>}>
                    <ProductDetailsContainer productId={productId} />
            </Suspense>

            <ProductBidsList />
        </div>
    )
}

