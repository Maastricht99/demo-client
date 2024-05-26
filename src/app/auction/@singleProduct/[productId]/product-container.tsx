import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getProductById } from "@/server/actions"
import { AccordionHeader } from "@radix-ui/react-accordion";
import Image from "next/image";

interface ProductContainerProps {
    productId: string;
}

export default async function ProductContainer({ productId }: ProductContainerProps) {


    const product = await getProductById(productId);

    return (
        <>

            <div className="p-4 bg-white shadow-lg text-center">
                <div className="relative w-full h-[300px] flex-shrink-0">
                <Image
                src={product.pictureUrl}
                alt="product"
                className="rounded-lg"
                objectFit="cover"
                layout="fill"
            />
                </div>
            
            <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
            </div>
        </>
    )
}