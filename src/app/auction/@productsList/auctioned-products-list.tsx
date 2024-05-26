"use client";

import { currentUserId } from "@/currentUserId";
import { useSocket } from "@/hooks/use-socket";
import React from "react";
import AuctionedProductCardSkeleton from "./auctioned-product-card-skeleton";
import AuctionedProductCard from "./auctioned-product-card";

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

export default function AuctionedProductsList() {

    const [products, setProducts] = React.useState<AuctionedProduct[]>([]);
    const [newProductToAnimateId, setNewProductToAnimateId] = React.useState("");
    const [newBidProductToAnimateId, setNewBidProductToAnimateId] = React.useState("");

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

                setNewBidProductToAnimateId(payload.productId!);
            });

            socket.on("newProductAdded", (payload: AuctionedProduct) => {
                setProducts(prev => [payload, ...prev]);
                setNewProductToAnimateId(payload.id);
            })
        }
    }, [socket]);

    React.useEffect(() => {
        if (newProductToAnimateId) {
            const timer = setTimeout(() => {
                setNewProductToAnimateId("");
            }, 2000);
            return () => clearTimeout(timer);
            }
    }, [newProductToAnimateId]);

    React.useEffect(() => {
        if (newBidProductToAnimateId) {
            const timer = setTimeout(() => {
                setNewBidProductToAnimateId("");
            }, 2000);
            
            return () => clearTimeout(timer);
        }
    }, [newBidProductToAnimateId]);

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

    return (
        <div className="flex flex-wrap gap-x-[10px] gap-y-[20px]">
            {
                products.length === 0 ? 
                    new Array(20).fill(0).map(s => <AuctionedProductCardSkeleton />) 
                : products.map(p => {
                    return (
                        <AuctionedProductCard 
                            product={p}
                            bidOnProduct={bidOnProduct}
                            isProductNewlyAdded={newProductToAnimateId === p.id}
                            hasProductNewBid={newBidProductToAnimateId === p.id}
                        />
                    )
                })
            }
        </div>
    )
}