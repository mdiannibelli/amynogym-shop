'use client';
import SizeSelector from '../product/sizesSelector/SizeSelector'
import QuantitySelector from '../product/quantitySelector/QuantitySelector'
import { Product, ProductInCart, ValidSizes } from '@/interfaces/product.interface'
import { sairaFont } from '@/config/font'
import { useState } from 'react';
import { useCartStore } from '@/store/cart/cart-store';

interface Props {
    product: Product
}

export const AddToCart = ({product}: Props) => {
    //! Zustand 
    const addProductToCart = useCartStore(state => state.addProductToCart);

    const [size, setSize] = useState<ValidSizes|undefined>();
    const [quantity, setQuantity] = useState<number>(1);

    const [errorSize , setErrorSize] = useState(false)

    const addToCart = () => {
        setErrorSize(true)
        
        if(!size) return;

       // console.log({size, quantity, product})
       const cartProduct:ProductInCart = {
           id: product.id,
           slug: product.slug,
           title: product.title,
           price: product.price,
           quantity: quantity,
           sizes: size,
           image: product.images[0]
       } 
       addProductToCart(cartProduct)
       setErrorSize(false)
       setQuantity(1);
       setSize(undefined)
    }

  return (
    <>
        {/* Selector de talles */}
        <SizeSelector onSizeChange={setSize} selectedSize={size} availableSizes={product.sizes}/>

        {/* Selector de cantidad */}
        <QuantitySelector handleChangeQuantity={setQuantity} quantity={quantity}/>

        {/* Boton añadir al carrito */}
        <button onClick={addToCart} className={`my-5 bg-blue-600 py-2 px-4 hover:bg-blue-700 duration-300 text-white font-regular ${sairaFont.className}`}>Agregar al carrito</button>
        {
            errorSize && !size ? <span className='flex mb-2 -mt-2 text-red-500 text-xs fade-in'>Debe de seleccionar un talle</span> : ''
        }

    </>
  )
}
