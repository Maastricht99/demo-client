"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogPortal } from "@/components/ui/dialog";
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
            <Button onClick={() => setIsDialogOpen(true)}>Open</Button>
            <Dialog open={isDialogOpen} onOpenChange={(value) => setIsDialogOpen(value)}>
            <DialogContent>
            <form onSubmit={handleSubmit(payload => { 
                addNewPost(payload);
                reset();
                setIsDialogOpen(false);
            })}>
            <label>Name</label>
            <Input {...register("name")} type="text" autoComplete="off"/>
            { errors.name ? <p>Name is not valid.</p> : null }
            <label>Description</label>
            <Input {...register("description")} type="text" autoComplete="off" />
            { errors.description ? <p>Description is not valid.</p> : null }
            <button type="submit">Submit</button>
            </form>
            </DialogContent>
        </Dialog>
        </>

    )
}