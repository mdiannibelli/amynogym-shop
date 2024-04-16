export const revalidate = 1080; //7 dias (60*60 => 1h * 24h => * 7 => 7dias)

import { getProductBySlug } from '@/actions/products/get-product-by-slug';
import QuantitySelector from '@/components/product/quantitySelector/QuantitySelector';
import SizeSelector from '@/components/product/sizesSelector/SizeSelector';
import MobileSlideShow from '@/components/product/slideShow/MobileSlideShow';
import SlideShow from '@/components/product/slideShow/SlideShow';
import StockLabel from '@/components/stock-label/StockLabel';
import { sairaFont } from '@/config/font';
import { Metadata, ResolvingMetadata } from 'next';
//? import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
  params: {
    slug: string;
  }
}

//! Metadata Dinámica
export async function generateMetadata({params} : Props, parent: ResolvingMetadata // Acceso a la información del padre (layout)
) : Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: { // determinan cómo aparecen las vistas previas de tus enlaces en las redes sociales
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      //todo images: [], https://amynogymshop.com/product/image.png
      images: [`/product/${product?.images[1]}`]
    }
  }
}

export default async function ProductPage({params}: Props) {
  const {slug} = params;
  //? const product = initialData.products.find(product => product.slug === slug);
  const product = await getProductBySlug(slug)

  if(!product) {
    notFound()
  }
  return (
    <div className='grid mt-5 mb-20 grid-cols-1 md:grid-cols-3 gap-3'>
      {/* Slideshow */}
      <div className='col-span-1 md:col-span-2'>

        {/* Desktop Slideshow */}
        <SlideShow images={product.images} title={product.title}
        className='hidden md:block'/>

        {/* Mobile Slideshow */}
        <MobileSlideShow images={product.images} title={product.title}
        className='block md:hidden'/>
      </div>

      {/* Product Details */}
      <div className='col-span-1 px-10'>

        {/* Stock Label (client-side) */}
        <StockLabel slug={product.slug}/>

        <h1 className={`${sairaFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className='text-lg mb-5'>${(product.price).toFixed(2)}</p>

        {/* Selector de talles */}
        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes}/>

        {/* Selector de cantidad */}
        <QuantitySelector quantity={2}/>

        {/* Boton añadir al carrito */}
        <button className={`my-5 bg-blue-600 py-2 px-4 hover:bg-blue-700 duration-300 text-white font-regular ${sairaFont.className}`}>Agregar al carrito</button>

        {/* Descripción */}
        <h3 className='font-bold text-lg'>Descripción</h3>
        <p className={`${sairaFont.className} text-md`}>
          {product.description}
        </p>
      </div>
    </div>
  )
}
