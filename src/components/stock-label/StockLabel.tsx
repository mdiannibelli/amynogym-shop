'use client'; // Cada vez que se monte haremos esta petición
import { getStockBySlug } from '@/actions/products/get-stock-by-slug';
import { sairaFont } from '@/config/font'
import { useEffect, useState } from 'react';

interface Props {
    slug: string;
}

export default function StockLabel({slug}: Props) {
    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getStock = async() => {
            const getStock = await getStockBySlug(slug)
            //console.log({getStock})
            setStock(getStock);
            setIsLoading(false);
        }
        getStock();
    }, [slug])

    //! Llamar al server action

  return (
    <>
    {
        isLoading ? 
        (
            <h1 className={`${sairaFont.className} antialiased font-regular text-sm animate-pulse bg-gray-200 p-2 `}>
                Cargando stock...
            </h1>
        )
        :
        (
            <h1 className={`${sairaFont.className} antialiased font-regular text-md`}>
                Stock: {stock}
            </h1>
        )
    }
    </>
  )
}
