'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async(id:string) => {
    const session = await auth();
    if(!session?.user) {
        return {
            ok: false,
            message: "Debe estar autentificado"
        }
    }
    try {
        const order = await prisma.orders.findFirst({
            where: {
                id: id
            },
            include: {
                OrderAdress: true,
                OrderItems: {
                    select: {
                        price: true,
                        size: true,
                        quantity: true,

                        product: {
                            select: {
                                title: true,
                                slug: true,
                                ProductImages: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        })
        if(!order) throw new Error(`Orden ${id} no existe`);

        if(session.user.role === 'user') {
            if(session.user.id !== order.userId) throw new Error(`${id} no es de ese usuario`)
        }
    
        return {
            ok: true,
            order: order
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Orden no existe"
        }
    }
}