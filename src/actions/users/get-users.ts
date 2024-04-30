'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number,
    take?: number
}

export const getUsers = async({page=1, take=10}:PaginationOptions):Promise<any> => {
    if(isNaN(Number(page))) return page = 1;
    if(page < 1) page = 1;
    const session = await auth();
    if(session?.user.role !== 'admin') return{ok:false, message:'Debe ser un usuario con el rol de administrador'} 
    try {
        const users = await prisma.user.findMany({
            take: take,
            skip: (page - 1) * take,
            orderBy: {
                name: 'desc'
            },
        })
        if(!users) throw new Error("No se ha encontrado ningun usuario");
        const totalUsers = await prisma.user.count();
        const totalPages = Math.ceil(totalUsers / take);

        return {
            ok: true,
            totalPages: totalPages,
            currentPage: page,
            users: users,
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "No se ha podido encontrar ningun usuario"
        }
    }
}