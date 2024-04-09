import ProductGrid from '@/components/products/ProductGrid/ProductGrid';
import Title from '@/components/ui/Title/Title'
import { initialData } from '@/seed/seed'
import React from 'react'

const products = initialData.products;

export default function ProductsPage() {
  return (
    <div>
      <Title
      title='Productos'
      subtitle='Todos nuestros productos'
      />
      <ProductGrid products={products}/>
    </div>
  )
}
