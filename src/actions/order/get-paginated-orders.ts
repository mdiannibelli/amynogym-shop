'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number,
    take?: number
}

export const getPaginatedOrders = async({page=1, take=10}:PaginationOptions):Promise<any> => {
    if(isNaN(Number(page))) return page = 1;
    if(page < 1) page = 1;
    const session = await auth();
    if(session?.user.role !== 'admin') return{ok:false, message:'Debe ser un usuario con el rol de administrador'} 
    try {
        const orders = await prisma.orders.findMany({
            take: take,
            skip: (page - 1) * take,
            orderBy: {
                createdAt: 'desc'
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
        const totalOrders = await prisma.orders.count();
        const totalPages = Math.ceil(totalOrders / take);

        return {
            ok: true,
            totalPages: totalPages,
            currentPage: page,
            orders: orders,
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "No se ha podido encontrar ninguna orden"
        }
    }
}