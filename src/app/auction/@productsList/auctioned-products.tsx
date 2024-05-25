"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { currentUserId } from "@/currentUserId";
import { useSocket } from "@/hooks/use-socket";
import Link from "next/link";
import React from "react";

interface AuctionedProduct {
    id: string;
    name: string;
    description: string;
    currentPrice: number;
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
    // on connect, retrieve all products

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
                            } as any
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

    // on connection, receive list of products, set product

    // on product added, receive new product, push to list

    // on bid added, receive data, update product 


    return (
        <>
            <h1>Auctioned Products</h1>
            <div className="grid grid-cols-4 gap-10 m-20">
            {
                products.map(p => {
                    return (
                                <Card>
                                <CardHeader>
                                    <Link href={`/auction/${p.id}`}>
                                        <div style={{ height: 200, width: 150, backgroundColor: "red" }} />
                                    </Link>
                                </CardHeader>
                                <CardContent>
                                    <p>{p.name}</p>
                                    <p>{p.description }</p>
                                    <p>Current Price: {p.currentPrice} $</p>
                                </CardContent>
                                <CardFooter>
                                    {
                                        p.lastBid !== null ? (
                                            <>
                                            <p>Last Bidder: { p.lastBid.userFirstName + " " + p.lastBid.userLastName }</p>
                                            <p>{ p.lastBid.amount }$</p>
                                            </>
        
                                        ) : <p>No bids</p>
                                    }
                                    <Button onClick={() => bidOnProduct(p.id, p.currentPrice + 10)}>Bid { p.currentPrice + 10 } $</Button>
                                </CardFooter>
                            </Card>

                    )
                })
            }
            </div>
        </>
    )
}