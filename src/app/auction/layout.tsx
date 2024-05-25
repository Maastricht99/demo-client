export default function AuctionLayout(x: any) {
    console.log(x);
    return (
        <div className="flex">
                { x.productsList }
                { x.singleProduct }
        </div>
    )
}