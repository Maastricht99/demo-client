interface AuctionLayoutProps {
    productsList: React.ReactNode;
    singleProduct: React.ReactNode;
}

export default function AuctionLayout({ productsList, singleProduct }: AuctionLayoutProps) {
    return (
        <div className="h-full flex">
            { productsList }
            { singleProduct }
        </div>
    )
}