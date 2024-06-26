'use client';

import { useCartStore } from "@/store/cart/cart-store";
import { getCurrencyFormat } from "@/utils/getCurrencyFormat";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Summary = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const {total, subTotal, totalItems, tax} = useCartStore(state => state.getSummaryTotalCart());

    useEffect(() => {
        setLoaded(true)
    }, [])

    useEffect(() => {
      if ( totalItems === 0 && loaded === true )   {
        router.replace('/empty')
      }  
    },[ totalItems, loaded, router ])
    
    if(!loaded) return <p>Cargando...</p>

  return (
    <>
        <span>Cantidad de productos</span>
                  <span className='text-right'>{totalItems === 1 ? '1 artículo' : `${totalItems} artículos`}</span>

                  <span>Subtotal</span>
                  <span className='text-right'>{getCurrencyFormat(subTotal)}</span>

                  <span>Impuestos (15%)</span>
                  <span className='text-right'>{getCurrencyFormat(tax)}</span>

                  <span className='text-2xl mt-5'>Total:</span>
                  <span className='text-right mt-5 text-2xl'>{getCurrencyFormat(total)}</span>
    </>
  )
}
