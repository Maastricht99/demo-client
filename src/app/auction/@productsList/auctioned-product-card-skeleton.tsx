import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function AuctionedProductCardSkeleton() {
    return (
        <Skeleton height={400} width={300} className="rounded-lg"/>
    )
}