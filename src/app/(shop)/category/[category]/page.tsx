export const revalidate = 60; // 60s
import { getProductsPerCategory } from '@/actions/category/product-per-category';
import { getPaginatedProductsWithImages } from '@/actions/products/product-pagination';
import ProductGrid from '@/components/products/ProductGrid/ProductGrid';
import Pagination from '@/components/ui/pagination/Pagination';
import Title from '@/components/ui/Title/Title';
import { ValidTypes } from '@/interfaces/product.interface';
import { notFound } from 'next/navigation';
//? import { initialData } from '@/seed/seed';

interface Props {
  searchParams: {
    page?: string;
  },
  params: {
    category: ValidTypes;
  }
}

//? const products = initialData.products;

export default async function CategoryPage({params, searchParams}: Props) {
  const {category} = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  //const productsPerCategory = products.filter(product => product.type === id)
  
  const types: Record<ValidTypes, string>= {
    'oversizes': 'Oversizes',
    'hoodies': 'Buzos',
    'shirts': 'Remeras',
    'pants': 'Pantalones',
    'hats': 'Gorras'
  }

  const {products, totalPages, currentPage} = await getProductsPerCategory({
    category,
    page
  })

  if(!products) {
    notFound()
  }

  return (
    <div>
      <Title
      title={`${types[category]}`}
      subtitle={`Todas nuestros modelos ${(types[category]).toLowerCase()}`}/>
      {
        products.length === 0 ? (
          <h1 className='text-4xl flex justify-center items-center p-48'>No se encontraron productos.</h1>
        )
        :
        <>
          <ProductGrid products={products}/>
          <Pagination totalPages={totalPages}/>
        </>

      }
    </div>
  )
}
