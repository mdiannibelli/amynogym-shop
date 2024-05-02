export const revalidate = 60; // 60s
import { getPaginatedProductsWithImages } from '@/actions/products/product-pagination';
import ProductGrid from '@/components/products/ProductGrid/ProductGrid';
import Pagination from '@/components/ui/pagination/Pagination';
import Titlte from '@/components/ui/Title/Title';
// ? import { initialData } from '@/seed/seed';
import { Gender } from '@prisma/client';
import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
    searchParams: {
        page?: string;
    }
    params: {
        gender: string;
    }
}

export default async function ProductGender({params, searchParams}: Props) {
    const {gender} = params;
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const {products, totalPages} = await getPaginatedProductsWithImages({
        page,
        gender: gender as Gender,
    })
    
    const labels: Record<string, string>  = {
        'men': 'para hombres',
        'women': 'para mujeres',
        'kid': 'para niños',
        'unisex': 'para todos'
      }

    //? const products = initialData.products.filter((product) => product.gender === gender);
    
    if(!products) {
        notFound()
    }
    return (
        <div className='md:p-3'>
        <Titlte
        title={`Productos para ${labels[gender]}`}
        subtitle={`Todos los productos ${labels[gender]}`}
        />
        <ProductGrid products={products}/>
        <Pagination totalPages={totalPages}/>
      </div>
  )
}
