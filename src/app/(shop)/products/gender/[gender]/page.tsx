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
        gender: gender as Gender
    })

    //? const products = initialData.products.filter((product) => product.gender === gender);
    
    if(!products) {
        notFound()
    }
    return (
        <div>
        <Titlte
        title={`${gender}`}
        subtitle={`Todos los productos de ${gender}`}
        />
        <ProductGrid products={products}/>
        <Pagination totalPages={totalPages}/>
      </div>
  )
}