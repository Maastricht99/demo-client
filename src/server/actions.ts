"use server";

import { currentUserId } from "@/currentUserId";
import { IMyProduct, IProductDetails } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getMyProducts() {
    const res = await fetch(`http://localhost:4040/products?userId=${currentUserId}`, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Something went wrong...");
    }

    const products = await res.json();

    return products as IMyProduct[];
}

export async function getProductById(productId: string) {
    const res = await fetch(`http://localhost:4040/products/${productId}`, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Something went wrong...");
    }

    const product = await res.json();
    return product as IProductDetails;
}

export async function addNewPost(payload: any) {

    const body = { ...payload, creatorId: currentUserId };

    const res = await fetch("http://localhost:4040/products", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        throw new Error("Something went wrong...");
    }

    revalidatePath("/products");
    redirect("/products");
}