import { IProductDetails } from "@/types";
import Image from "next/image";


interface ProductDetailsProps {
    product: IProductDetails;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    return (
        <div className="p-4 bg-white shadow-lg text-center ">
            <div className="relative w-full h-[300px] flex-shrink-0">
                <Image
                    src={product.pictureUrl}
                    alt="product"
                    className="rounded-lg"
                    objectFit="cover"
                    layout="fill"
                />
            </div>
            <h1 className="text-2xl font-bold mt-4 mb-[10px]">{product.name}</h1>
            <p className="line-clamp-4 text-md text-gray-700">{product.description}</p>
        </div>
    )
}