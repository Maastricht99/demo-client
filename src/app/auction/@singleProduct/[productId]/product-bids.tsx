"use client";

import { useSocket } from "@/hooks/use-socket";
import { useParams } from "next/navigation";
import React from "react";
import { Bid } from "../../@productsList/auctioned-products";
import { Card, CardContent } from "@/components/ui/card";



export default function ProductBids() {
    const params = useParams();

    const [bids, setBids] = React.useState<Bid[]>([]);

    const [animate, setAnimate] = React.useState(false);


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
                setAnimate(true);
            })
            
        }

    }, [socket]);

    React.useEffect(() => {
        if (animate) {
            const timer = setTimeout(() => {
              setAnimate(false);
            }, 1000);
            return () => clearTimeout(timer);
          }
    }, [animate])

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
<div className="flex-1 overflow-y-auto p-4 bg-white shadow-lg">
          <h2 className="text-xl font-bold mb-2">Offers</h2>
          <ul className="space-y-4">
            {bids.length === 0 ? <p>No offers for this product.</p> : bids.map((bid, index) => (
              <li key={index} className={`border-b pb-2 ${index === 0 && animate ? "bg-red-300" : "" }`}>
                <p className="text-gray-800 font-medium">{bid.userFirstName} {bid.userLastName}</p>
                <p className="text-gray-600">{bid.amount} $</p>
                <p className="text-gray-500 text-sm">{new Date(bid.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
    )
}