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
    try {  
        const prismaTx = await prisma.$transaction(async(tx) => {
            // Actualizar stock de los productos
            const updatedProductsPromises = productos.map(async (p) => {
                const productQuantity = productIds.filter((prod) => prod.productId === p.id).reduce( (acc,item) => item.quantity + acc, 0); // Acumular los valores
    
                if(productQuantity === 0) throw new Error(`${p.id} no tiene cantidad definida`);
    
                return tx.product.update({
                    where: {id: p.id},
                    data: {
                        //inStock: p.inStock - productQuantity <- no hacer, el p.inStock es un valor viejo porque en un punto dos personas pueden hacer una misma transaccion con las mismas cantidades
                        inStock:{
                            decrement: productQuantity
                        }
                    }
                })
            })
    
            const updatedProducts = await Promise.all(updatedProductsPromises);
            // Verificar que el producto no tenga valores negativos en stock
            updatedProducts.forEach((product) => {
                if(product.inStock < 0) {
                    throw new Error(`${product.title} no tiene stock`)
                } 
            })
    
            // Crear encabezado de la orden y detalles
            const order = await tx.orders.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subtotal, 
                    tax: tax,
                    total: total,
                    
                    OrderItems: {
                        createMany: {
                            data: productIds.map((product) => ({
                                quantity: product.quantity,
                                size: product.size,
                                productId: product.productId,
                                price: productos.find((p) => p.id === product.productId)?.price ?? 0
                            }))
                        }
                    }
    
                }
            })
    
            // Crear el adress
            const {firstName, lastName, adress:direccion, adress2, postalCode, city, phone, country} = adress;
            const orderAdress = await tx.orderAdress.create({
                data: {
                    firstName: firstName,
                    lastName: lastName, 
                    adress: direccion,
                    adress2: adress2,
                    postalCode: postalCode,
                    city: city,
                    phone: phone,
                    countryId: country,
                    ordersId: order.id
                }
            })
    
            return {
                updatedProducts: updatedProducts, // No es necesario regresarlo, solo la orden
                order: order,
                orderAdress: orderAdress
            }
        });

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx
        }
    } catch (error:any) {
        return {
            ok: false,
            message: error?.message
        }
    }
}