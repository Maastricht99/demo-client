import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        description: string;
        startingPrice?: number;
        status: "PENDING" | "AUCTIONED";        
    }
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Card>
            <CardHeader>
                <div style={{ width: "100%", height: 200, border: "1px solid red" }} />
            </CardHeader>
            <CardContent>
                <h1 className="text-xl font-bold line-clamp-1">{ product.name }</h1>
                <div className="h-[50px]">
                    <p className="line-clamp-2">{ product.description }</p>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex w-full justify-between">
                    <div>
                    </div>
                    <div>
                        {
                            product.startingPrice ? (
                                <p>Price: { product.startingPrice}$</p>
                            ) : (
                                <p>Calculating price...</p>
                            )
                        }
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}