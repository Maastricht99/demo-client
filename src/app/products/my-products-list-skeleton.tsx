import Skeleton from "react-loading-skeleton"

export default function MyProductsListSkeleton() {
    return (
        <div className="w-full flex flex-wrap gap-x-[10px] gap-y-[20px] p-[40px] overflow-auto">
            {
                new Array(20).fill(0).map(_ => {
                    return <Skeleton height={300} width={350} />
                })
            }
        </div>
    )
}