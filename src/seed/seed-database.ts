/* Import Prisma */
import prisma from '../lib/prisma';
import { initialData } from "./seed";

async function main() {
    //! 1. Borrar base de datos (registros previos) 
    await prisma.productImages.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
   

    //! 2. Tomamos productos y categories del seed
    const {products, categories} = initialData;

    //! 3. Insertar categories
            // await prisma.category.create({
            //    data: {
            //        name: 'Shirts',
            //    }
            //})
    // Convertimos cada categoría a {"name": "shirts"} para despues pasarselo a data
    const categoriesData = categories.map((category) => ({
        name: category.toLowerCase()
    }))
    await prisma.category.createMany({data: categoriesData});

    //! 4. Relacionar categories con product 
    // Tomamos todas las categorías de nuestra base de datos para luego obtener su id y su name de cada una
    const categoriesDB = await prisma.category.findMany();
    // Creamos un mapa con reduce que guardará en "category" cada objeto con el nombre y el id de cada categoría y se inicia en un {} vacío.
    // Esto nos servirá para saber cual ID le vamos a asignar al campo categoryId 
    // De esta forma estamos relacionando las tablas ya que el id de la categoría se la vamos a asignar en el categoryId del producto.
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id
        return map;
    }, {} as Record<string, string>) // <string= shirts, string= categoryId>

    //! 5. Insertar productos
    products.forEach(async(product) => {
        const {type, images, ...rest} = product;
        const productsDB = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        }) 
        //? Images - {images} = product;
        // Creo un array por cada imagen con su url y su productId
        const imagesDB = images.map((image) => ({
            url: image,
            productId: productsDB.id
        }))
        await prisma.productImages.createMany(({
            data: imagesDB
        }))
    })

    console.log("Seed Executed")
}

// Funcion anónima autoinvocada
(() => {
    // Validamos para que esto no sea posible de ejecutar en producción.
    if(process.env.NODE_ENV === 'production') return;

    main()
    
})();