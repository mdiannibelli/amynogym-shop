import { getUserAdress } from '@/actions/adress/get-user-adress'
import { getOrderById } from '@/actions/order/get-order-by-id'
import { placeOrders } from '@/actions/order/place-orders'
import { auth } from '@/auth.config'
import Titlte from '@/components/ui/Title/Title'
import { sairaFont } from '@/config/font'
import { initialData } from '@/seed/seed'
import { useAdressStore } from '@/store/adress/adress-store'
import { getCurrencyFormat } from '@/utils/getCurrencyFormat'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { IoCardOutline, IoCloseCircleOutline } from 'react-icons/io5'

// Productos en carrito (simulación)
const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

interface Props {
  params: {
    id: string;
  }
}

export default async function OrderIdPage({params}: Props) {
  const {id} = params;

  const {order, ok} = await getOrderById(id);
  if(!ok) {
    redirect('/')
  }

  const adress = order?.OrderAdress;
  const products = order?.OrderItems

  //Todo verificar si el orderId corresponde al cliente
  // Redirect('/')
  return (
    <div className='flex justify-center items-center mb-72 px-4'>
        
        <div className='flex flex-col w-[1000px]'>
          <Titlte title={`Orden #${id.split('-').at(-1)}`} classNameTitle='text-4xl font-[600]'/>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
            {/* Carrito */}
            <div className='flex flex-col mt-5 order-2 sm:order-1'>

              {/* Orden pagada / Pendiente de pago */}
              <div className={
                clsx(
                  `flex items-center rounded-lg py-2 px-3.5 text-lg font-medium text-white mb-5 ${sairaFont.className}`,
                  {
                    'bg-red-700': !order?.isPaid,
                    'bg-green-700': order?.isPaid,
                  }
                )
              }>
                <IoCardOutline size={30}/>
                {/* <span className='mx-2'>Pendiente de pago</span> */}
                <span className='mx-2'>{order?.isPaid ? 'Pagada' : 'No pagada'}</span>
              </div>

            {/* Items */}
            {/* { //! Before order created
              productsInCart.map((product) => (
                <div key={product.slug} className='flex mb-5'>
                  <Image 
                  src={`/products/${product.images[0]}`} width={100} height={100} alt={product.title} 
                  className='mr-5 rounded'
                  style={{
                    width: '100px',
                    height: '100px'
                  }}/>

                  <div>
                  <div className='flex justify-end items-start w-full gap-x-2'>
                    <p>{product.title}</p>
                    <button className='text-red-400'><IoCloseCircleOutline size={20}/></button>
                  </div>
                    <p>${(product.price).toFixed(2)} x 3</p>
                    <p className='font-bold'>Subtotal: ${(product.price * 2).toFixed(2)}</p>
                  </div>
                </div>
              ))
            }
            </div> */}
            {
              products?.map((product) => (
                <div key={product.product.slug} className='flex mb-5'>
                  <Image 
                  src={`/products/${product.product.ProductImages[0].url}`} width={100} height={100} alt={product.product.title} 
                  className='mr-5 rounded'
                  style={{
                    width: '100px',
                    height: '100px'
                  }}/>

                  <div>
                  <div className='flex justify-end items-start w-full gap-x-2'>
                    <p>{product.product.title}</p>
                   
                  </div>
                    <p>${(product.price).toFixed(2)} x {product.quantity}</p>
                    <p className='font-bold'>Subtotal: ${(product.price * 2).toFixed(2)}</p>
                  </div>
                </div>
              ))
            }
            </div>

            {/* Checkout */}
            <div className='bg-white rounded-xl shadow-xl p-7 w-full order-1 sm:order-2'>
              {/* Confirmar dirección de entrega */}
                <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
                <div className='mb-10'>
                  <p>{adress?.firstName} {adress?.lastName}</p>
                  <p >Dirección: {adress?.adress}</p>
                  <p>Dirección 2: {adress?.adress2}</p>
                  <p>Ciudad: {adress?.city}</p>
                  <p>Código postal: {adress?.postalCode}</p>
                  <p>Teléfono: {adress?.phone}</p>
                </div>

                {/* Divider */}
                <div className='w-full h-0.5 rounded bg-gray-200 mb-10'></div>

                <h2 className='text-2xl mb-2'>Resumen de orden</h2>
                <div className='grid grid-cols-2'>

                  <span>Cantidad de productos</span>
                  <span className='text-right'>{order?.itemsInOrder === 1 ? '1 artículo' : `${order?.itemsInOrder} artículos`} </span>

                  <span>Subtotal</span>
                  <span className='text-right'>{getCurrencyFormat(order!.subTotal)}</span>

                  <span>Impuestos (15%)</span>
                  <span className='text-right'>{getCurrencyFormat(order!.tax)}</span>

                  <span className='text-2xl mt-5'>Total:</span>
                  <span className='text-right mt-5 text-2xl'>{getCurrencyFormat(order!.total)}</span>

                  <div className='col-span-2 mt-5 mb-2 w-full'>
                  
                    {/* Orden pagada / Pendiente de pago */}
                      <div className={
                        clsx(
                          `flex items-center rounded-lg py-2 px-3.5 text-lg font-medium text-white mb-5 ${sairaFont.className}`,
                          {
                            'bg-red-700': !order?.isPaid,
                            'bg-green-700': order?.isPaid,
                          }
                        )
                        }>
                        <IoCardOutline size={30}/>
                        {/* <span className='mx-2'>Pendiente de pago</span> */}
                        <span className='mx-2'>{order?.isPaid ? 'Pagada' : 'No pagada'}</span>
                      </div>

                  </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}
