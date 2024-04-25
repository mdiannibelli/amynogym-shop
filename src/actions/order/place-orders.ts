'use server';

import { auth } from "@/auth.config";
import type { Adress } from "@/interfaces/adress.interface";
import type { ValidSizes } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: ValidSizes;
}

export const placeOrders = async(productIds:ProductToOrder[], adress:Adress) => {
    //! Verificar sesión de usuario
    const session = await auth();
    const userId = session?.user.id;
    if(!userId) return {ok:false, message: "No hay sesión de usuario"};

    //console.log({productIds, adress, userId})

    //! Obtener información de los productos, existe el caso de llevar 2 o + productos con el mismo id
    const productos = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map((product) => product.productId)
            }
        }
    })
    
    //! Calcular la cantidad de productos y montos
    const itemsInOrder = productIds.reduce((count, item) => count + item.quantity, 0) //el Count inicia en 0 

    const {subtotal, tax, total} = productIds.reduce((totals, item) => {
        const productQuantity = item.quantity;
        const product = productos.find(p => p.id === item.productId );
        if(!product) throw new Error(`${item.productId} no existe - 500`);

        const subTotal = product.price * productQuantity;
        totals.subtotal += subTotal;

        const tax = subTotal * 0.15;
        totals.tax += tax; 

        totals.total += subTotal + tax;

        return totals;
    }, {subtotal: 0, tax: 0, total:0})
    //console.log({subtotal,tax,total})

    //! Crear la transacción
}