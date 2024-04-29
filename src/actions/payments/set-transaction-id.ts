'use server';

import prisma from "@/lib/prisma";

export const setTransactionId = async(orderId:string, transactionId:string) => {
    try {
        const order = await prisma.orders.update({
            where: {
                id: orderId
            },
            data: {transactionId: transactionId}
        });
        if(!order) return {ok:false, message: `La orden ${orderId} no ha sido encontrada`}
        return {
            ok: true
        }
    } catch (error) {
        return {
            ok: false,
            message: 'No se ha podido guardar el id de la transacción'
        }
    }
}