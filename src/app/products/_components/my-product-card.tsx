import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Badge } from "../../../components/ui/badge";
import { IMyProduct } from "@/types";

interface ProductCardProps {
    product: IMyProduct;
}

export default function MyProductCard({ product }: ProductCardProps) {
    return (
        <Card className="w-[250px] bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="w-full p-0">
                <div className="relative w-full h-[200px] flex-shrink-0">
                    <Image 
                        src={product.pictureUrl} 
                        alt="product" 
                        className="rounded-lg"
                        objectFit="cover"
                        layout="fill"
                    />
                </div>
            </CardHeader>
            <CardContent className="pt-[10px]">
                <h1 className="text-xl font-bold line-clamp-1">{ product.name }</h1>
                <div className="h-[40px]">
                    <p className="line-clamp-2 text-gray-700">{ product.description }</p>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex w-full justify-between">
                    <div></div>
                    <div>
                        {
                            product.currentPrice ? (
                                <Badge color="black" className="h-[30px] flex justify-center items-center pl-[10px] pr-[10px]">
                                    <p className="font-bold text-white p-[5px]">
                                        { product.currentPrice} $
                                    </p>
                                </Badge>
                            ) : (
                                <Badge color="black" className="h-[30px] flex justify-center items-center pl-[10px] pr-[10px]">
                                    <ReloadIcon className="animate-spin text-white font-bold" />
                                </Badge>
                            )
                        }
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}