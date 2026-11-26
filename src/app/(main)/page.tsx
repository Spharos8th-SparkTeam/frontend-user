import { HomePage } from "@/components/pages/HomePage";
import { getHomeCatalog } from "@/features/product/api/GetHomeProductList";

export default function Page() {
    const products = getHomeCatalog();

    return <HomePage products={products} />;
}
