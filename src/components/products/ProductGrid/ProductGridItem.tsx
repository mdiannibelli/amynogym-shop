'use client';
import { Product } from '@/interfaces/product.interface'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
interface Props {
    product: Product
}
export default function ProductGridItem({product}: Props) {
    const [displayImage, setDisplayImage] = useState(product.images[0])
  return (
    <div className='rounded-md overflow-hidden fade-in'>
        <Link
        onMouseEnter={() => setDisplayImage(product.images[1])}
        onMouseLeave={() => setDisplayImage(product.images[0])}
        href={`/product/${product.slug}`}><Image src={`/products/${displayImage}`} alt={product.title} className='w-full object-cover rounded' width={500} height={500}/></Link>
        <div className='p-4 flex flex-col'>
            <Link
            className='hover:text-blue-700 duration-300'
            href={`/product/${product.slug}`}>
                {product.title}
            </Link>
            <span className='font-bold'>${(product.price).toFixed(2)}</span>
        </div>
    </div>
  )
}
