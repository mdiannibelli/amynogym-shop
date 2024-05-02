'use server';

import prisma from "@/lib/prisma";

export const getProductBySlug = async(slug:string) => {
    try {
        const product = await prisma.product.findFirst({
            include: {
                ProductImages: true
            },
            where: {
                slug: slug
            }
        })

        if(!product) return null;
    
        //? Si queremos excluir los product images:
        //const {ProductImages, ...rest} = product;

        return {
            //...rest
            ...product,
            images: product.ProductImages.map(image => image.url)
        }




    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener el producto')
    }
}