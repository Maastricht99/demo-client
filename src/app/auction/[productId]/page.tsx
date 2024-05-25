import ProductBids from "./product-bids";

export default function AuctionedProductPage({ params }: any) {
    const productId = params.productId;

    return (
        <>
            <h1>Auctioned Product Page { productId }</h1>
            <ProductBids />
        </>
    )
}