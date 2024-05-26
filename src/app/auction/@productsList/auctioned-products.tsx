"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { currentUserId } from "@/currentUserId";
import { useSocket } from "@/hooks/use-socket";
import Link from "next/link";
import React from "react";
import NewBidDialog from "./new-bid-dialog";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface AuctionedProduct {
    id: string;
    name: string;
    description: string;
    currentPrice: number;
    pictureUrl: string;
    lastBid: Bid | null;
}

export interface Bid {
    id: string;
    productId?: string;
    userId: string;
    userFirstName: string;
    userLastName: string; 
    amount: number;
    createdAt: string;
}

export default function AuctionedProducts() {

    const [products, setProducts] = React.useState<AuctionedProduct[]>([]);

    const socket = useSocket("ws://localhost:4040");

    React.useEffect(() => {
        if (socket) {
            socket.emit("requestInitialAuctionedProducts");

            socket.on("sendInitialAuctionedProducts", (payload: AuctionedProduct[]) => {
                setProducts(payload);
            });

            socket.on("newBidAdded", (payload: Bid) => {
                setProducts(prev => prev.map(p => {
                    if (p.id === payload.productId) {
                        return {
                            ...p,
                            currentPrice: payload.amount,
                            lastBid: {
                                id: payload.id,
                                amount: payload.amount,
                                createdAt: payload.createdAt,
                                userId: payload.userId,
                                userFirstName: payload.userFirstName,
                                userLastName: payload.userLastName
                            } as Bid
                        }
                    }

                    return p;
                }))
            });

            socket.on("newProductAdded", (payload: AuctionedProduct) => {
                setProducts(prev => [payload, ...prev]);
            })

        
        }

    }, [socket]);

    function bidOnProduct(productId: string, amount: number) {
        const bid = {
            productId,
            userId: currentUserId,
            amount
        }

        if (socket) {
            socket.emit("addNewBid", bid);
        }
    }

    React.useEffect(() => {
        if (socket) {
            socket.connect();
        };

        return () => {
            if (socket) {
                socket.disconnect();
            }
        }
    }, [])


    return (
        <>
            <div className="flex flex-wrap gap-x-[10px] gap-y-[20px]">
            {
                products.length === 0 ? <p>Loading</p> : products.map(p => {
                    return (
                        <Card className="w-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
                        <CardHeader className="p-0">
                          <Link href={`/auction/${p.id}`} className="relative">
                          <div className="relative w-full h-[200px] flex-shrink-0">

<Image 
    src={p.pictureUrl} 
    alt="product" 
    className="rounded-lg"
    objectFit="cover"
    layout="fill"
/>
</div>
                          </Link>
                        </CardHeader>
                        <CardContent className="p-[10px] h-[110px]">
                          <h1 className="text-xl font-bold truncate">{p.name}</h1>
                          <p className="text-gray-700 line-clamp-2 mt-[10px] mb-[20px]">{p.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center pt-[20px]">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                <p className="text-lg font-bold text-black">{p.currentPrice} $</p>
                                </TooltipTrigger>
                                <TooltipContent>
                                {p.lastBid ? (
                              <p className="text-sm text-gray-600">
                                <span className="font-semibold">{ p.lastBid.userId === currentUserId ? "You" : p.lastBid.userFirstName + " " + p.lastBid.userLastName}</span><span> made the last offer.</span>
                              </p>
                            ) : (
                              <p className="text-sm text-gray-600">No offers yet.</p>
                            )}
                                </TooltipContent>
                            </Tooltip>
                            </TooltipProvider>
                          <NewBidDialog 
                            name={p.name} 
                            productId={p.id} 
                            handleAddNewBid={bidOnProduct}
                          >
                          </NewBidDialog>
                        </CardFooter>
                      </Card>

                    )
                })
            }
            </div>
        </>
    )
}