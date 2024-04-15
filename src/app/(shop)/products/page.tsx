export const revalidate = 60; // 60s
import { getPaginatedProductsWithImages } from '@/actions/products/product-pagination';
import ProductGrid from '@/components/products/ProductGrid/ProductGrid';
import Pagination from '@/components/ui/pagination/Pagination';
import Title from '@/components/ui/Title/Title'
import Link from 'next/link';

//? import { initialData } from '@/seed/seed'
//? seed => const products = initialData.products;

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function ProductsPage({searchParams}: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  //console.log(searchParams)
  const {products, totalPages, currentPage} = await getPaginatedProductsWithImages({
    page
  });
  //console.log({currentPage, totalPages})
  return (
    
    (
      products.length === 0 
      ? <div className='flex flex-col items-center justify-center p-24'>
        <h1 className='text-4xl'>No se han encontrado productos</h1>
        <Link href='/products' className='mt-4 rounded-md hover:bg-gray-700 duration-300 transition-all hover:text-white p-2'>Regresar a la tienda</Link>
      </div>
      : <div>
      <Title
      title='Productos'
      subtitle='Todos nuestros productos'
      />
      <ProductGrid products={products}/>
      <Pagination totalPages={totalPages}/>
    </div>
    )
  )
}
