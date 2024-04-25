'use client';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useCartStore } from '@/store/cart/cart-store';
import { getCurrencyFormat } from '@/utils/getCurrencyFormat';

export const ProductsInCartCheckout = () => {
    const [loaded, setLoaded] = useState(false)
    const productsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true)
    }, [])

    if(loaded){
        <p>Cargando...</p>
    }
  return (
    <>
        {
              productsInCart.map((product) => (
                <div key={`${product.slug}-${product.sizes}`} className='flex mb-5'>
                  <Image 
                  src={`/products/${product.image}`} width={100} height={100} alt={product.title} 
                  className='mr-5 rounded'
                  style={{
                    width: '100px',
                    height: '100px'
                  }}/>

                  <div>
                  <div className='flex justify-end items-start w-full gap-x-2'>
                    <p>{product.sizes} - {product.title} ({product.quantity})</p>
                  </div>
                    <p className='font-semibold'>{getCurrencyFormat(product.price * product.quantity)}</p>
                  </div>
                </div>
              ))
            }
    </>
  )
}
