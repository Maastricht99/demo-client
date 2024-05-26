import { Suspense } from "react";
import AuctionedProducts from "./auctioned-products";

export default function ProductsListPage() {
    return (
        <div className="flex-1" >
            <div className="p-[30px] pl-[50px] pr-[50px]">
                <section className="mb-[30px]">
                    <h1 className="text-[30px] font-bold">Auction</h1>
                </section>
                <Suspense fallback={<p>Loading</p>}>
                    <AuctionedProducts />
                </Suspense>
            </div>
        </div>
    )
}