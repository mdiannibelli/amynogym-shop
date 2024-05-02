'use server';

import prisma from "@/lib/prisma";
import {v2 as cloudinary} from 'cloudinary';
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteImage = async(imageId:number, imageUrl: string) => {
    if(!imageUrl.startsWith('https')) return {ok:false, message:"No se pueden borrar imagenes que no sean de la nube"} 
    
    const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';
    
    try {
        await cloudinary.uploader.destroy(process.env.CLOUDINARY_FOLDER + '/' + imageName);
        const deletedImage = await prisma.productImages.delete({
            where: {
                id: imageId
            },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        })
        revalidatePath(`/admin/productos`)
        revalidatePath(`/admin/productos/${deletedImage.product.slug}`);
        revalidatePath(`/product/${deletedImage.product.slug}`);

    } catch (error) {
        console.log(error);
        return {
            ok:false,
            message: "No se pudo eliminar la imágen"
        }
    }
}