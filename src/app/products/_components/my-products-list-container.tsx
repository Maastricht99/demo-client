import { getMyProducts } from "@/server/actions";
import MyProductsList from "./my-products-list";

/* Container are mainly used to render initial data server side 
    when children are client components with lot of interactions
*/
export default async function MyProductsListContainer() {
    const products = await getMyProducts();

    return <MyProductsList products={products} />
}