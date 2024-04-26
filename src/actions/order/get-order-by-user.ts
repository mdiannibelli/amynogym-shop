'use server';

import prisma from "@/lib/prisma";

export const getOrderByUser = async(userId:string) => {
    try {
        const orders = await prisma.orders.findMany({
            where: {
                userId: userId
            },
            include: {
                OrderAdress: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
        if(!orders) throw new Error("No se ha encontrado ninguna orden");

        return {
            ok: true,
            orders: orders
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "No se ha podido encontrar ninguna orden"
        }
    }
}