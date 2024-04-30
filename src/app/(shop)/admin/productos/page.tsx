export const revalidate = 0;
// https://tailwindcomponents.com/component/hoverable-table

import { getPaginatedProductsWithImages } from '@/actions/products/product-pagination';
import Pagination from '@/components/ui/pagination/Pagination';
import Titlte from '@/components/ui/Title/Title';
import { getCurrencyFormat } from '@/utils/getCurrencyFormat';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface Props {
    searchParams: {
        page?: string;
    }
}

export default async function OrdersPage({searchParams}: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;


  const {products = [], currentPage, totalPages} = await getPaginatedProductsWithImages({page});
  return (
    <>
      <Titlte title="Mantenimiento de productos" />
      
      <div className='flex justify-end mb-5'>
        <Link href='/admin/productos/new' className='bg-blue-600 text-white text-md py-2 px-3 text-center hover:bg-blue-700 duration-300'>Nuevo producto</Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imágen
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nombre de producto
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th> 
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Género
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Categoría
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Stock
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Talles
              </th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product) => (
              <tr key={product.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/products/${product.slug}`}><Image src={`/products/${product.ProductImages[0].url}`} width={80} height={80} alt={product.title} className='w-20 h-20 object-cover rounded'/></Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium hover:underline text-gray-900'><Link href={`/admin/productos/${product.slug}`}>{product.title}</Link></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getCurrencyFormat(product.price)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.tags}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.inStock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.sizes.join(', ')}</td>
                

              </tr>
              ))
            }

          </tbody>
        </table>
        <Pagination totalPages={totalPages}/>
      </div>
    </>
  );
}