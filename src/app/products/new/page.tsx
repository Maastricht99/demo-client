"use client";

import { Input } from "@/components/ui/input";
import { addNewPost } from "@/server/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function NewProduct() {
    const schema = z.object({
        name: z.string().min(1),
        description: z.string().min(1)
    })

    const { 
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    });

    return (
        <form onSubmit={handleSubmit(payload => addNewPost(payload))}>
            <label>Name</label>
            <Input {...register("name")} type="text" />
            { errors.name ? <p>Name is not valid.</p> : null }
            <label>Description</label>
            <Input {...register("description")} type="text" />
            { errors.description ? <p>Description is not valid.</p> : null }
            <button type="submit">Submit</button>
        </form>
    )
}