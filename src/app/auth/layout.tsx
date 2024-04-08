import React from 'react'

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <main className='min-h-screen bg-green-500'>
        {children}
    </main>
  )
}
