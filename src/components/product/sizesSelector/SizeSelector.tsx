import type { ValidSizes } from '@/interfaces/product.interface'
import clsx from 'clsx';
import React from 'react'

interface Props {
    selectedSize: ValidSizes | undefined;
    availableSizes: ValidSizes[]; // ['X', 'S', 'XL', etc..]

    onSizeChange: (size:ValidSizes) => void;
}

export default function SizeSelector({selectedSize, availableSizes, onSizeChange}: Props) {
  return (
    <div className='my-5'>
        <h3 className='font-bold mb-4'>Talles disponibles</h3>
        <div className='flex'>
            {
                availableSizes.map(size => (
                    <button key={size} onClick={() => onSizeChange(size)} className={
                        clsx(
                            'mx-2 hover:underline text-lg',
                            {
                                'underline': size === selectedSize
                            }
                        )
                    }>{size}</button>
                ))
            }
        </div>
    </div>
  )
}
