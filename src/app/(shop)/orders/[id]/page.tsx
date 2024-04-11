import Titlte from '@/components/ui/Title/Title'
import { sairaFont } from '@/config/font'
import { initialData } from '@/seed/seed'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
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

export default function OrderIdPage({params}: Props) {
  const {id} = params;

  //Todo verificar si el orderId corresponde al cliente
  // Redirect('/')
  return (
    <div className='flex justify-center items-center mb-72 px-4'>
        
        <div className='flex flex-col w-[1000px]'>
          <Titlte title={`Orden #${id}`} classNameTitle='text-4xl font-[600]'/>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
            {/* Carrito */}
            <div className='flex flex-col mt-5 order-2 sm:order-1'>

              {/* Orden pagada / Pendiente de pago */}
              <div className={
                clsx(
                  `flex items-center rounded-lg py-2 px-3.5 text-lg font-medium text-white mb-5 ${sairaFont.className}`,
                  {
                    'bg-red-500': false,
                    'bg-green-700': true,
                  }
                )
              }>
                <IoCardOutline size={30}/>
                {/* <span className='mx-2'>Pendiente de pago</span> */}
                <span className='mx-2'>Pagada</span>
              </div>

            {/* Items */}
            {
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
            </div>

            {/* Checkout */}
            <div className='bg-white rounded-xl shadow-xl p-7 w-full order-1 sm:order-2'>
              {/* Confirmar dirección de entrega */}
                <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
                <div className='mb-10'>
                  <p>Nombre y apellido: <span className='font-semibold'>Marcos Iannibelli</span></p>
                  <p>Email: <span className='font-semibold'>dioneldeveloper@gmail.com</span></p>
                  <p >Dirección: <span className='font-semibold'>Av. Nazca 2100</span></p>
                  <p>Dirección 2: Villa Santa Rita</p>
                  <p>Ciudad: Capital Federal</p>
                  <p>Código postal: 1416</p>
                  <p>Teléfono: <span className='font-semibold'>1166315085</span></p>
                </div>

                {/* Divider */}
                <div className='w-full h-0.5 rounded bg-gray-200 mb-10'></div>

                <h2 className='text-2xl mb-2'>Resumen de orden</h2>
                <div className='grid grid-cols-2'>

                  <span>Cantidad de productos</span>
                  <span className='text-right'>2 artículos</span>

                  <span>Subtotal</span>
                  <span className='text-right'>$100</span>

                  <span>Impuestos (15%)</span>
                  <span className='text-right'>$100</span>

                  <span className='text-2xl mt-5'>Total:</span>
                  <span className='text-right mt-5 text-2xl'>$100</span>

                  <div className='col-span-2 mt-5 mb-2 w-full'>
                  
                    {/* Orden pagada / Pendiente de pago */}
                      <div className={
                        clsx(
                          `flex items-center rounded-lg py-2 px-3.5 text-lg font-medium text-white mb-5 ${sairaFont.className}`,
                          {
                            'bg-red-500': false,
                            'bg-green-700': true,
                          }
                        )
                        }>
                        <IoCardOutline size={30}/>
                        {/* <span className='mx-2'>Pendiente de pago</span> */}
                        <span className='mx-2'>Pagada</span>
                      </div>

                  </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}
