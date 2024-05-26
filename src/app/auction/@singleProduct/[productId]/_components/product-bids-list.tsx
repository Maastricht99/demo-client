"use client";

import { useSocket } from "@/hooks/use-socket";
import { useParams } from "next/navigation";
import React from "react";
import { currentUserId } from "@/currentUserId";
import { Card } from "@/components/ui/card";
import { IBid } from "@/types";



export default function ProductBids() {
    const params = useParams();

    const [bids, setBids] = React.useState<IBid[]>([]);

    const [animate, setAnimate] = React.useState(false);

    const socket = useSocket(process.env.wsHost as string);

    React.useEffect(() => {
        if (socket) {
            socket.emit("requestInitialProductBids", { productId: params.productId });

            socket.on("sendInitialProductBids", (payload: IBid[]) => {
                setBids(payload);
            });

            socket.on("newBidAdded", (payload: IBid) => {
                if (payload.productId === params.productId) {
                    setBids(prev => [payload, ...prev]);
                }
                setAnimate(true);
            })
            
        }

    }, [socket]);

    React.useEffect(() => {
        if (animate) {
            const timer = setTimeout(() => {
              setAnimate(false);
            }, 2000);
            return () => clearTimeout(timer);
          }
    }, [animate]);


    return (
        <div className="flex-1 p-4 bg-white shadow-lg">
            <h2 className="text-xl pl-[10px] pt-[10px] font-bold mb-2">Offers</h2>
            <ul className="space-y-1">
                {bids.length === 0 ? <p>No offers for this product.</p> : bids.map((bid, index) => (
                    <Card key={index} className={` shadow-md p-1 duration-300 ease-in-out rounded-lg ${index === 0 && animate ? "bg-green-200" : "" }`}>
                            <p className="text-gray-800 font-bold pl-[5px]">
                                {
                                    bid.userId === currentUserId ? "You" : bid.userFirstName + " " + bid.userLastName
                                }
                            </p>
                            <p className="text-gray-500 font-semibold pt-[5px] pl-[5px]">{bid.amount} $</p>
                            <p className="text-gray-500 text-sm  pl-[5px] pb-[5px]">{new Date(bid.createdAt).toLocaleString()}</p>
                    </Card>
                ))}
            </ul>
        </div>
    )
}