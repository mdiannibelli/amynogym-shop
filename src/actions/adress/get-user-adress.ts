'use server';

import prisma from "@/lib/prisma";

// Devolvemos la dirección en caso de que el usuario haya guardado la dirección en la base de datos y este usando la app desde otro dispositivo 
// o un dispositivo donde no tenga guardado el estado de zustand con su dirección
export const getUserAdress = async(userId:string) => {   
    try {
        const adress = await prisma.userAdress.findFirst({
            where: {
                userId: userId
            }
        })
        if(!adress) return null;
        const {countryId, adress2, ...rest} = adress;
        
        return {
            ...rest,
            country: countryId,
            adress2: adress2 ? adress2 : '',
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}