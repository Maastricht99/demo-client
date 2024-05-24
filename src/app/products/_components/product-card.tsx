import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        description: string;
        price?: number;
        status: "PENDING" | "AUCTIONABLE" | "AUCTIONED";        
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
                        {
                            product.status === "AUCTIONABLE" ? <p>Auctionable</p> : null
                        }
                    </div>
                    <div>
                        {
                            product.price ? (
                                <p>Price: { product.price}$</p>
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