import { ValidTypes } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client";

interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: Gender;
}

export const getPaginatedProductsWithImages = async({gender, page = 1, take = 12,}: PaginationOptions) => {
    if(isNaN(Number(page))) page = 1;
    if(page < 1 ) page = 1;
    try {
        //1. Obtener productos para el ProductGrid => w/ 2 images
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take, //? En la primer página quiero que el skip de 0 para que no se saltee productos, por ende el -1
            include: {
                ProductImages: {
                    take: 2, // Incluimos solo 2 imagenes del ProductImages
                    select: {
                        url: true // Traemos nada mas el URL
                    }
                },
            },
            //! Por genero
            where: {
                gender: gender,
            }

        })
        //2. Regresar los productos con el tipado product.interface.ts
        //3. Obtener el total de páginas
        const totalCount = await prisma.product.count({
            where: {
                gender: gender,
            }
        }) // Cuento todos los productos
        const totalPages = Math.ceil(totalCount / take);
        
        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
                images: product.ProductImages.map(image => image.url),
            }))
        }
    } catch (error) {
        throw new Error('No se han podido cargar los productos')
    }
}