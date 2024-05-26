export default function AuctionLayout(x: any) {
    return (
        <div className="h-full flex">
                { x.productsList }
                { x.singleProduct }
        </div>
    )
}