'use client';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import QuantitySelector from '../product/quantitySelector/QuantitySelector'
import { useCartStore } from '@/store/cart/cart-store';

export const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false)
    const productsInCart = useCartStore(state => state.cart);

    const updateProductsInCart = useCartStore(state => state.updateProductQuantity);
    const deleteProduct = useCartStore(state => state.removeProductInCart)

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
                    <p>{product.sizes} - {product.title}</p>
                    <button onClick={() => deleteProduct(product)} className='text-red-400'><IoCloseCircleOutline size={20}/></button>
                  </div>
                    <p>${(product.price).toFixed(2)}</p>
                    <QuantitySelector quantity={product.quantity}
                    handleChangeQuantity={quantity => updateProductsInCart(product, quantity)}/>
                  </div>
                </div>
              ))
            }
    </>
  )
}
