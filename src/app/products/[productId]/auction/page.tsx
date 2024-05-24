export default function AuctionProduct({ params }: any) {
    const productId = params.productId;

    return (
        <h1>Auction product: { productId }</h1>
    )
}