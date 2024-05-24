"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function NewProduct() {
    const schema = z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        pictureUrl: z.string().min(1)
    })

    const { 
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    });

    return (
        <form onSubmit={handleSubmit(c => console.log(c))}>
            <label>Name</label>
            <Input {...register("name")} type="text" />
            { errors.name ? <p>Name is not valid.</p> : null }
            <label>Description</label>
            <Input {...register("description")} type="text" />
            { errors.description ? <p>Description is not valid.</p> : null }
            <label>Picture url</label>
            <Input {...register("pictureUrl")} type="text" />
            { errors.pictureUrl ? <p>pictureUrl is not valid.</p> : null }
            <button type="submit">Submit</button>
        </form>
    )
}