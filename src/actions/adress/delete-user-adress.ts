'use server';

import prisma from "@/lib/prisma";

export const deleteUserAdress = async(userId:string) => {
    try {
        const adressToDelete = await prisma.userAdress.delete({
            where: {
                userId: userId
            }
        });
        return {ok: true}
    } catch (error) {
        console.log(error);
        //throw new Error('No se pudo borrar la dirección');
    }
}