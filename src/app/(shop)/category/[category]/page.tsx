export const revalidate = 60; // 60s
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
  //const types: Record<ValidTypes, string>= {
  //  'oversizes': 'Oversizes',
  //  'hoodies': 'Hoodies',
  //  'shirts': 'Remeras',
  //  'pants': 'Pantalones',
  //  'hats': 'Gorras'
  //}

  const {products, totalPages} = await getPaginatedProductsWithImages({
    page,
    category: category as ValidTypes
  })

  if(!products) {
    notFound()
  }

  return (
    <div>
      <Title
      title={`${category}`}
      subtitle={`Todas nuestros modelos ${category}`}/>
      <ProductGrid products={products}/>
      <Pagination totalPages={totalPages}/>
    </div>
  )
}
