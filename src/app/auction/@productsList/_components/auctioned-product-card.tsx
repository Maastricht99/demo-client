import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { currentUserId } from "@/currentUserId";
import { TooltipContent } from "@radix-ui/react-tooltip";
import Image from "next/image";
import Link from "next/link";
import NewBidDialog from "./new-bid-dialog";
import { IAuctionedProduct } from "@/types";

interface AuctionedProductCardProps {
    product: IAuctionedProduct;
    bidOnProduct(productId: string, amount: number): void;
    isProductNewlyAdded: boolean;
    hasProductNewBid: boolean;
}

export default function AuctionedProductCard({
    product,
    bidOnProduct,
    isProductNewlyAdded,
    hasProductNewBid,
}: AuctionedProductCardProps) {
    return (
        <Card className={`w-[300px] bg-white shadow-lg rounded-lg duration-300 ease-in-out`}>
            <CardHeader className="p-0">
                <Link href={`/auction/${product.id}`}>
                    <div className="relative w-full h-[200px] flex-shrink-0">

                        <Image 
                            src={product.pictureUrl} 
                            alt="product" 
                            className="rounded-lg"
                            objectFit="cover"
                            layout="fill"
                        />
                        {
                            isProductNewlyAdded && (
                                
                            <Badge color="black" className="p-[10px] absolute left-[20px] top-[20px]">
                                <p className="font-bold">New</p>
                            </Badge>
                            )
                        }
                    </div>
                </Link>
            </CardHeader>
            <CardContent className="p-[10px] h-[110px]">
                <h1 className="text-xl font-bold truncate">{ product.name }</h1>
                <p className="text-gray-700 line-clamp-2 mt-[10px] mb-[20px]"> { product.description }</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-[20px]">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <p className={`text-lg font-bold text-black duration-300 ease-in-out ${hasProductNewBid ? "text-green-500" : ""}`}>
                                { product.currentPrice } $
                            </p>
                        </TooltipTrigger>
                        <TooltipContent className="p-[3px] bg-white rounded-md" align="start" side="bottom">
                            {product.lastBid ? (
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">{ product.lastBid.userId === currentUserId ? "You" : product.lastBid.userFirstName + " " + product.lastBid.userLastName }</span><span> made the last offer.</span>
                                </p>
                            ) : (
                                <p className="text-sm text-gray-600">No offers yet.</p>
                            )}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <NewBidDialog
                    name={product.name} 
                    productId={product.id} 
                    handleAddNewBid={bidOnProduct}
                />
            </CardFooter>
        </Card>
    )
}