import { getAllCategories } from "@/actions/category/get-all-categories";
import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { ProductForm } from "@/components/product/editproduct/ProductForm";
import Titlte from "@/components/ui/Title/Title";
import { redirect } from "next/navigation";

interface Props {
    params: {
        slug: string;
    }
}

export default async function ProductAdminPage({params}: Props) {
    const {slug} = params;

    // Obtener ambas promesas para mejor rendimiento
    const [product, categories] = await Promise.all([
        getProductBySlug(slug),
        getAllCategories()
    ])

    if(!product && slug !== 'new') {
        redirect('admin/productos')
    }

    const title = slug === 'new' ? 'Nuevo Producto' : 'Editar producto'

  return (
    <>
        <Titlte classNameTitle="text-4xl font-bold" title={title}/>

        <ProductForm categories={categories} product={product ?? {}}/>
    </>
  )
}
