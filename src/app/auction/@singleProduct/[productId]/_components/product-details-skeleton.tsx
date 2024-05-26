import Skeleton from "react-loading-skeleton";

export default  function ProductDetailsSkeleton() {

    return (
        <div className="p-4 bg-white shadow-lg text-center">
            <div className="relative w-full h-[300px] flex-shrink-0">
                <Skeleton className="w-full h-full" />
            </div>
            
            <h1 className="text-2xl font-bold mt-4">
                <Skeleton width={200} height={20} />
            </h1>

            <p className="line-clamp-4 text-gray-700">
                <Skeleton width={300} height={20} />
            </p>
        </div>
    )
}