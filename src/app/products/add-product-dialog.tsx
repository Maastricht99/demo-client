"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogPortal } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { addNewPost } from "@/server/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AddProductDialog() {
    const schema = z.object({
        name: z.string().min(1),
        description: z.string().min(1)
    })

    const { 
        register, 
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    });

    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    return (
        <>
            <Button onClick={() => setIsDialogOpen(true)}>Add New Product</Button>
            <Dialog open={isDialogOpen} onOpenChange={(value) => setIsDialogOpen(value)}>
            <DialogContent>
                <DialogHeader className="flex flex-col gap-[20px]">
                    <h1 className="text-[25px] font-bold">Add New Product</h1>
                </DialogHeader>
            <form onSubmit={handleSubmit(payload => { 
                addNewPost(payload);
                reset();
                setIsDialogOpen(false);
            })}>
                <fieldset>
                    <label className="text-[20px] font-medium text-gray-800">Name</label>
                    <Input {...register("name")} type="text" autoComplete="off" className="mt-[5px]"/>
                    { errors.name ? <p className="text-red-500 font-medium mt-[5px]">Name is not valid.</p> : null }
                </fieldset>

                <fieldset className="mt-[20px] mb-[20px]">

                    <label className="text-[20px] font-medium text-gray-800">Description</label>
                    <Input {...register("description")} type="text" autoComplete="off" className="mt-[5px]"/>
                    { errors.description ? <p className="text-red-500 font-medium mt-[5px]">Description is not valid.</p> : null }
                </fieldset>
            <DialogFooter>
            <Button type="submit">Submit</Button>

            </DialogFooter>
            </form>
            </DialogContent>
        </Dialog>
        </>

    )
}