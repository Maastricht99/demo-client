import Link from "next/link";
import ProductCard from "./_components/product-card";

const products = [
    {
        id: 0,
        name: "xxx",
        description: "Product practically new, never used. 3000 kms weyfeyh rvfyhrfbhrfb3er frhbfeibrfgeyirhb",
        status: "PENDING" as "PENDING"
    },
    {
        id: 1,
        name: "xxx ceirhbve frjbeurbv vebjrfviej",
        description: "xxx",
        price: 200,
        status: "AUCTIONED" as "AUCTIONED"
    },
    {
        id: 2,
        name: "xxx",
        description: "xxx",
        price: 200,
        status: "AUCTIONABLE" as "AUCTIONABLE"
    },
]

export default function Products() {
    return (
        <>
            <h1>Products</h1>
            <div className="grid grid-cols-4 gap-4 ml-10 mr-10">
                {
                    products.map(product => {
                        return <ProductCard product={product} />
                    })
                }
            </div>
            <Link href="/products/new">Add</Link>
        </>
    )
}