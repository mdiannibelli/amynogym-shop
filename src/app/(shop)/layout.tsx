import Announcement from '@/components/ui/Announcement'
import TopMenu from '@/components/ui/TopMenu'
import React from 'react'

export default function ShopLayout({children}: {children:React.ReactNode}) {
  return (
    <main className='min-h-screen'>
        <Announcement/>
        <TopMenu/>
        {children}
    </main>
  )
}
