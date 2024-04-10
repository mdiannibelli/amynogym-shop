import { sairaFont } from '@/config/font'
import React from 'react'

export default function Announcement() {
  return (
    <section className='flex justify-center bg-black p-2'>
        <div>
            <p className={`${sairaFont.className} text-[10px] lg:text-lg tracking-widest text-white uppercase`}>Estamos realizando envío gratis en pedidos cuyo monto sean de $30.000 o superior*</p>
        </div>
    </section>
  )
}
