import { PlaceOrder } from '@/components/ui/checkout/PlaceOrder'
import { ProductsInCartCheckout } from '@/components/ui/checkout/ProductsInCartCheckout'
import Titlte from '@/components/ui/Title/Title'
import { sairaFont } from '@/config/font'
import { initialData } from '@/seed/seed'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'

// Productos en carrito (simulación)
const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function CheckoutPage() {
  return (
    <div className='flex justify-center items-center mb-72 px-4'>
        
        <div className='flex flex-col w-[1000px]'>
          <Titlte title='Verificar Orden' classNameTitle='text-4xl font-[600]'/>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
            {/* Carrito */}
            <div className='flex flex-col mt-5 order-2 sm:order-1'>
              <span className='text-xl'>Cambie los productos</span>
              <Link href="/cart" className='underline mb-5'>Editar carrito aquí</Link>

            {/* Items */}
            {/* {
            //! Before show adress in checkout (P)
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
            } */}
            <ProductsInCartCheckout/>
            </div>

            {/* Checkout */}
            {/* //! Before Show adress (P)
               <div className='bg-white rounded-xl shadow-xl p-7 w-full order-1 sm:order-2'>
              
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
                    
                    <p className='mb-5'>
                      <span className='text-xs'>Al hacer click en Colocar orden, aceptas nuestros <a href='#' className='underline'>términos y condiciones</a> y <a href="#" className='underline'>política de privacidad</a>.</span>
                    </p>

                    <Link href='/orders/123' className={`flex justify-center bg-blue-600 py-2 px-4 hover:bg-blue-700 duration-300 text-white font-regular ${sairaFont.className}`}>Colocar orden</Link>
                  </div>
                </div>
            </div> */}
            <PlaceOrder/>
          </div>
        </div>
    </div>
  )
}
