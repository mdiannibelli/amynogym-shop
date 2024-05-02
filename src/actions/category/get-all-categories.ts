'use server';

import prisma from "@/lib/prisma";

export const getAllCategories = async() => {
    try {
        const categories = await prisma.category.findMany();
        if(!categories) throw new Error("No hay categorías")
        return categories;
    } catch (error) {
        console.log(error);
        throw new Error("No hay categorías")
    }
}