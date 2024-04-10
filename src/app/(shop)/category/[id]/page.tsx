import ProductGrid from '@/components/products/ProductGrid/ProductGrid';
import Title from '@/components/ui/Title/Title';
import { ValidTypes } from '@/interfaces/product.interface';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';
import React from 'react'
interface Props {
  params: {
    id: ValidTypes;
  }
}

const products = initialData.products;

export default function CategoryPage({params}: Props) {
  const {id} = params;
  const productsPerCategory = products.filter(product => product.type === id)
  const types: Record<ValidTypes, string>= {
    'oversizes': 'Oversizes',
    'hoodies': 'Hoodies',
    'shirts': 'Remeras',
    'pants': 'Pantalones',
    'hats': 'Gorras'
  }


  /* if (id === 'no') {
    notFound();
  } */

  return (
    <div>
      <Title
      title={`${types[id]}`}
      subtitle={`Todas nuestros modelos ${(types[id]).toLowerCase()}`}/>
      <ProductGrid products={productsPerCategory}/>
    </div>
  )
}
