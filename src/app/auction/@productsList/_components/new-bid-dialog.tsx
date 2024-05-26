"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React from "react";

interface NewBidDialogProps {
    name: string;
    productId: string;
    handleAddNewBid(productId: string, amount: number): void;
}

export default function NewBidDialog({ name, productId, handleAddNewBid }: NewBidDialogProps) {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [amount, setAmount] = React.useState(0);

    return (
        <>
            <Button onClick={() => setIsDialogOpen(true)}>
                <p className="font-bold">Make An Offer</p>
            </Button>
            <Dialog onOpenChange={(value) => setIsDialogOpen(value)} open={isDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <h1 className="text-[20px] font-bold">Make an offer for { name }</h1>
                    </DialogHeader>

                    <Input type="number" onChange={(e) => setAmount(+e.target.value)}/>

                    <DialogFooter>
                        <Button 
                            onClick={() => {
                                handleAddNewBid(productId, amount);
                                setIsDialogOpen(false);
                            }}
                        >
                            <p className="font-bold">Make An Offer</p>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}