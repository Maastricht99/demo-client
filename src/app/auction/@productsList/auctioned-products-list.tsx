"use client";

import { currentUserId } from "@/currentUserId";
import { useSocket } from "@/hooks/use-socket";
import React from "react";
import AuctionedProductCardSkeleton from "./auctioned-product-card-skeleton";
import AuctionedProductCard from "./auctioned-product-card";
import { IAuctionedProduct, IBid } from "@/types";


export default function AuctionedProductsList() {

    const [products, setProducts] = React.useState<IAuctionedProduct[]>([]);
    const [newProductToAnimateId, setNewProductToAnimateId] = React.useState("");
    const [newBidProductToAnimateId, setNewBidProductToAnimateId] = React.useState("");

    const socket = useSocket(process.env.wsHost as string);

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

    function handleNewBidAdded(bid: IBid) {
        setProducts(prev => prev.map(p => {
            if (p.id === bid.productId) {
                return {
                    ...p,
                    currentPrice: bid.amount,
                    lastBid: {
                        id: bid.id,
                        amount: bid.amount,
                        createdAt: bid.createdAt,
                        userId: bid.userId,
                        userFirstName: bid.userFirstName,
                        userLastName: bid.userLastName
                    } as IBid
                }
            }

            return p;
        }))

        setNewBidProductToAnimateId(bid.productId!);
    }

    React.useEffect(() => {
        if (socket) {
            socket.emit("requestInitialAuctionedProducts");

            socket.on("sendInitialAuctionedProducts", (payload: IAuctionedProduct[]) => {
                setProducts(payload);
            });

            socket.on("newBidAdded", (payload: IBid) => {
                handleNewBidAdded(payload);
            });

            socket.on("newProductAdded", (payload: IAuctionedProduct) => {
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