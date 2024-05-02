'use server';
import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
//! Otra forma de recibir un formdata y actualizarlo en la base de datos mediante un schema de validacion con Zod
import {z} from 'zod';
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config(
    process.env.CLOUDINARY_URL ?? ''
);

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(), // Puede venir opcional y nulo
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number().min(0).transform(value => Number(value.toFixed(2))), // Transformar string to number
    inStock: z.coerce.number().min(0).transform(value => Number(value.toFixed(0))),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform(value => value.split(',')), //  Separar array por la coma
    tags: z.string(),
    gender: z.nativeEnum(Gender), // Enumeración que valida que sea de tipo Gender
    
})

export const updateAdminProduct = async(formData:FormData) => {
    const data = Object.fromEntries(formData);
    const parsedProducts = productSchema.safeParse(data);
    if(!parsedProducts.success) {
        console.log(parsedProducts.error);
        return {ok:false};
    }

    //console.log(parsedProducts)
    const updatedProduct = parsedProducts.data;
    updatedProduct.slug = updatedProduct.slug.toLowerCase().replace(/ /g, '-').trim() //Asegurarse de que el slug no tenga espacios y sea lowercase

    const {id, ...rest} = updatedProduct;

    try {
        // Mandamos el producto mediante una transacción
        const prismaTx = await prisma.$transaction(async(tx) => {
            let product:Product
            if(id) {
                //si hay ID actualizar
                 product = await prisma.product.update({
                    where: {id: id},
                    data: {
                        ...rest,
                        sizes: { // Sizes es un SET '{}'
                            set: rest.sizes as Size[],
                        },
                        tags: { // idem
                            set: rest.tags.split(',').map(tag => tag.trim().toLowerCase())
                        }
                    }
                });
            } else {
            // si no hay crear
            product = await prisma.product.create({
                data: {
                    ...rest,
                    sizes: {
                        set: rest.sizes as Size[]
                    },
                    tags: {
                        set: rest.tags.split(',').map(tag => tag.trim().toLowerCase())
                    }
                }
            })
            }
        //console.log({product})

        // Proceso de carga y guardado de imagenes
        if(formData.getAll('images')) {
            //[https://url.jpg, https://url2.png] array de images
            const images = await uploadImages(formData.getAll('images') as File[]);
            if(!images) throw new Error("No se pudo cargar las imágenes");

            await prisma.productImages.createMany({
                data: images.map(img => ({
                    url: img!,
                    productId: product.id
                }))
            })
        }

        return {product}
    })
    //! Revalidate Path
    revalidatePath('/admin/productos');
    revalidatePath(`/admin/productos/${prismaTx.product?.slug}`);
    revalidatePath(`/prodcts/${prismaTx.product?.slug}`);
    return {
       ok:true,
       product: prismaTx.product 
    }
    
    } catch (error) {
        return {ok:false, message:"No se pudo actualizar"}
    }
}


const uploadImages = async(files:File[]) => {
    try {
        // Array de promises
        const uploadPromises = files.map(async(img) => {
        try {
                const buffer = await img.arrayBuffer(); //leer imagen y convertir la imagen a string para subir a cloudinary
                const base64Image = Buffer.from(buffer).toString('base64');
                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`,{folder:process.env.CLOUDINARY_FOLDER})
                .then(r => r.secure_url); // regresamos la secure_url
        
        } catch (error) {
            console.log(error)
            return null;
        }
    })

        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages;


    } catch (error) {
        console.log(error);
        return null;
    }
}