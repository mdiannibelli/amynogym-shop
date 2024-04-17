import { ProductsInCart } from '@/components/cart/ProductsInCart'
import { Summary } from '@/components/cart/Summary'
import Titlte from '@/components/ui/Title/Title'
import { sairaFont } from '@/config/font'
import { initialData } from '@/seed/seed'
import Link from 'next/link'
import React from 'react'


// Productos en carrito (simulación)
const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function CartPage() {
  return (
    <div className='flex justify-center items-center mb-72 px-4'>
        
        <div className='flex flex-col w-[1000px]'>
          <Titlte title='Productos en el carrito' classNameTitle='text-4xl font-[600]'/>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
            {/* Carrito */}
            <div className='flex flex-col mt-5 order-2 sm:order-1'>
              <span className='text-xl'>Agregar más items</span>
              <Link href="/products" className='underline mb-5'>Continúa comprando</Link>

            {/* Items */}
            {/* {
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
                    <p>${(product.price).toFixed(2)}</p>
                    <QuantitySelector quantity={2}/>
                  </div>
                </div>
              ))
            } */}
            <ProductsInCart/>
            </div>

            {/* Checkout */}
            <div className='bg-white rounded-xl shadow-xl p-7 w-full h-fit order-1 sm:order-2'>
                <h2 className='text-2xl mb-2'>Resumen de orden</h2>
                <div className='grid grid-cols-2'>

                  {/* <span>Cantidad de productos</span>
                  <span className='text-right'>2 artículos</span>

                  <span>Subtotal</span>
                  <span className='text-right'>$100</span>

                  <span>Impuestos (15%)</span>
                  <span className='text-right'>$100</span>

                  <span className='text-2xl mt-5'>Total:</span>
                  <span className='text-right mt-5 text-2xl'>$100</span> */}
                  <Summary/>

                  <div className='col-span-2 mt-5 mb-2 w-full'>
                    <Link href='/checkout/adress' className={`flex justify-center bg-blue-600 py-2 px-4 hover:bg-blue-700 duration-300 text-white font-regular ${sairaFont.className}`}>Checkout</Link>
                  </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}
