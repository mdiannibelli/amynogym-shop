import { sairaFont } from '@/config/font'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function PageNotFound() {
  return (
    <div className='flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle'>
        <div className='text-center px-5 mx-5 '>
            <h2 className={`${sairaFont.className} text-9xl font-[700]`}>404</h2>
            <p className={`${sairaFont.className} text-xl font-[400]`}>Oops! Lo sentimos mucho</p>
            <p>
                <span className={`${sairaFont.className} text-lg font-[400]`}>Click para </span>
                <Link className={`${sairaFont.className} text-lg font-[700] hover:underline`} href='/'>volver al inicio</Link>
            </p>
        </div>

        <div className='px-5 mx-5 '>
            <Image src='/imgs/spartan.png' alt='Spartan Amynogym' width={500} height={500}/>
        </div>
    </div>
  )
}
