import ProductBids from "./product-bids";

export default function SingleProductPage({ params }: any) {
    const productId = params.productId;

    return (
        <div className="w-[500px] bg-red-300">
            <h1>Auctioned Product Page { productId }</h1>
            <ProductBids />
        </div>
    )
}