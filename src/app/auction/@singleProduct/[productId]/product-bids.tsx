"use client";

import { useSocket } from "@/hooks/use-socket";
import { useParams } from "next/navigation";
import React from "react";
import { Bid } from "../../@productsList/auctioned-products";
import { Card, CardContent } from "@/components/ui/card";



export default function ProductBids() {
    const params = useParams();

    const [bids, setBids] = React.useState<Bid[]>([]);

    function handleNewBidAdded(bid: any) {
        setBids(prev => [bid, ...prev]);
    }

    const socket = useSocket("ws://localhost:4040");

    React.useEffect(() => {
        if (socket) {
            socket.emit("requestInitialProductBids", { productId: params.productId });

            socket.on("sendInitialProduct", (payload: Bid[]) => {
                setBids(payload);
            });

            socket.on("newBidAdded", (payload: Bid) => {
                if (payload.productId === params.productId) {
                    setBids(prev => [payload, ...prev]);
                }
            })
            
        }

    }, [socket]);

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
            <h1>Product bids</h1>
            {
                bids.map(bid => {
                    return (
                        <Card>
                            <CardContent>
                                <p>{ bid.userFirstName + " " + bid.userLastName} offered { bid.amount } $</p>
                                <p>{ bid.createdAt }</p>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </>
    )
}