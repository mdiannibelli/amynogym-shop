'use server';
import { ValidTypes } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";

interface CategoryOptions {
    page?: number,
    take?: number,
    category: ValidTypes;
}

export const getProductsPerCategory = async({category,page = 1,take = 12}:CategoryOptions) => {
    if(isNaN(Number(page))) page = 1;
    if(page < 1) page = 1;
    try {
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                ProductImages: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            },
            where: {
                Category: {
                    name: category
                }
            }
        })

        const totalCount = await prisma.product.count({
            where: {
                Category: {
                    name: category
                }
            }
        })
        const totalPages = Math.ceil(totalCount / take)

        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
                images: product.ProductImages.map(image => image.url)
            }))
        }

    } catch (error) {
        throw new Error('No se han podido cargar los productos')
    }
}