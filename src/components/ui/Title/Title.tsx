import { sairaFont } from '@/config/font';
import React from 'react'
interface Props {
    title: string;
    subtitle?: string;
    className?: string;
}

export default function Titlte({title, subtitle, className}: Props) {
  return (
    <div className={`mt-8 ${className}`}>
        {
            subtitle && ( 
                <h3 className={`${sairaFont.className} font-[300] text-xs`}>{subtitle}</h3>
            )
        }
        <h1 className={`${sairaFont.className} antialiased text-2xl font-[400] `}>{title}</h1>
    </div>
    
  )
}
