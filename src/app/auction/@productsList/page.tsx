import AuctionedProductsList from "./auctioned-products-list";

export default function AuctionedProductsListPage() {
    return (
        <div className="flex-1">
            <div className="p-[30px] pl-[50px] pr-[20px]">
                <section className="mb-[30px]">
                    <h1 className="text-[30px] font-bold">Auction</h1>
                </section>

                <AuctionedProductsList />
            </div>
        </div>
    )
}