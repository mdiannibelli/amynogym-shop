export const revalidate = 0;
// https://tailwindcomponents.com/component/hoverable-table

import { getPaginatedOrders } from '@/actions/order/get-paginated-orders';
import Pagination from '@/components/ui/pagination/Pagination';
import Titlte from '@/components/ui/Title/Title';
import { getCurrencyFormat } from '@/utils/getCurrencyFormat';
import clsx from 'clsx';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
    searchParams: {
        page?: string;
    }
}

export default async function OrdersPage({searchParams}: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;


  const {orders = [], ok, currentPage, totalPages} = await getPaginatedOrders({page});

  if(!ok) {
    redirect('/auth/login');
  }
  return (
    <>
      <Titlte title="Todas las orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nombre completo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Estado
              </th> 
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Monto
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map((order:any) => (
              <tr key={order.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.OrderAdress?.firstName} {order.OrderAdress?.lastName}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                  <IoCardOutline className={clsx(
                    {
                      "text-green-600" : order.isPaid,
                      "text-red-600" : !order.isPaid,
                    }
                  )} />
                  <span className={clsx(
                    {
                      "text-green-600 ml-2" : order.isPaid,
                      "text-red-600 ml-2" : !order.isPaid,
                    }
                  )}>
                    {order.isPaid ? 'Pagada' : 'No pagada'}
                  </span>

                </td>

                <td className='text-sm px-6'>
                  {getCurrencyFormat(order.total)}
                </td>

                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link href={`orders/${order.id}`} className="hover:underline">
                    Ver orden
                  </Link>
                </td>

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