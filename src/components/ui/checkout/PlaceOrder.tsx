'use client';

import { placeOrders } from "@/actions/order/place-orders";
import { sairaFont } from "@/config/font";
import { useAdressStore } from "@/store/adress/adress-store";
import { useCartStore } from "@/store/cart/cart-store";
import { getCurrencyFormat } from "@/utils/getCurrencyFormat";
//import { sleep } from "@/utils/sleep";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [error, setError] = useState("")

    const adress = useAdressStore(state => state.adress);
    const {totalItems, total, subTotal, tax} = useCartStore(state => state.getSummaryTotalCart());
    const cart = useCartStore(state => state.cart);
    const clearCart = useCartStore(state => state.clearCart)

    useEffect(() => { //* Solucionar discrepancia (hydrate) con lo que se genera en el sv y en el client
        setLoaded(true)
    }, [])

    if(!loaded) return (<p>Cargando...</p>)

    const placeOrder = async() => {
        setIsPlacingOrder(true);
        //await sleep(2);
        const productsToOrder = cart.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.sizes
        }))
        //console.log({productsToOrder,adress})

        const resp = await placeOrders(productsToOrder, adress);
        
        if(!resp.ok) {
            setIsPlacingOrder(false)
            setError(resp.message);
            return;
        }

        //* Si salió bien, se creo la orden
        clearCart();
        router.replace('/orders/' + resp.order?.id);
    }

    return (
        <div className='bg-white rounded-xl shadow-xl p-7 w-full order-1 sm:order-2'>

            <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
            <div className='mb-10'>
                <p>{adress.firstName} {adress.lastName}</p>
                <p>{adress.adress}</p>
                <p>{adress.adress2}</p>
                <p>{adress.city}, {adress.country}</p>
                <p>{adress.postalCode}</p>
                <p>{adress.phone}</p>
            </div>

            <div className='w-full h-0.5 rounded bg-gray-200 mb-10'></div>

            <h2 className='text-2xl mb-2'>Resumen de orden</h2>
            <div className='grid grid-cols-2'>

                <span>Cantidad de productos</span>
                <span className='text-right'>{totalItems} artículos</span>

                <span>Subtotal</span>
                <span className='text-right'>{getCurrencyFormat(subTotal)}</span>

                <span>Impuestos (15%)</span>
                <span className='text-right'>{getCurrencyFormat(tax)}</span>

                <span className='text-2xl mt-5'>Total:</span>
                <span className='text-right mt-5 text-2xl'>{getCurrencyFormat(total)}</span>

                <div className='col-span-2 mt-5 mb-2 w-full'>

                    <p className='mb-5'>
                        <span className='text-xs'>Al hacer click en Colocar orden, aceptas nuestros <a href='#' className='underline'>términos y condiciones</a> y <a href="#" className='underline'>política de privacidad</a>.</span>
                    </p>
                    
                    <p className="text-red-500">{error}</p>
                    <button 
                    onClick={placeOrder}
                    disabled={isPlacingOrder}
                    className={clsx(
                        `flex justify-center  py-2 px-4 duration-300 text-white font-regular ${sairaFont.className}`,
                        {
                            'bg-blue-600 hover:bg-blue-700': !isPlacingOrder,
                            'bg-gray-600': isPlacingOrder
                        }
                    )}>
                        Colocar orden
                    </button>
                </div>
            </div>
        </div>
    )
}
