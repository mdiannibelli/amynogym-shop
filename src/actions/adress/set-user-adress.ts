'use server';

import type { Adress } from "@/interfaces/adress.interface";
import prisma from "@/lib/prisma";

export const setUserAdress = async(adress:Adress, userId:string) => {
    try {
        const newAdress = await createOrReplaceAdress(adress, userId)
        return {
            ok: true,
            adress: newAdress
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo guardar la dirección'
        }
    }
}

const createOrReplaceAdress = async(adress:Adress, userId:string) => {
    try {
        const storedAdress = await prisma.userAdress.findUnique({
            where: {
                userId: userId
            }
        })

        if(!storedAdress) { // Si no existe guardarla
            const newAdress = await prisma.userAdress.create({
                data: {
                    userId: userId,
                    firstName: adress.firstName,
                    lastName: adress.lastName,
                    adress: adress.adress,
                    adress2: adress.adress2,
                    countryId: adress.country,
                    postalCode: adress.postalCode,
                    phone: adress.phone,
                    city: adress.city,
                }
            })
            return newAdress;
        }

        // si existe actualizarla
        const updatedAdress = await prisma.userAdress.update({
            where: {
                userId: userId
            },
            data: {
                userId: userId,
                firstName: adress.firstName,
                lastName: adress.lastName,
                adress: adress.adress,
                adress2: adress.adress2,
                countryId: adress.country,
                postalCode: adress.postalCode,
                phone: adress.phone,
                city: adress.city,
            }
        })
        return updatedAdress;

    } catch (error) {
        console.log(error);
        throw new Error('No se pudo guardar o actualizar la dirección')
    }
}