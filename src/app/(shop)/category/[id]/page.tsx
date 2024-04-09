import Title from '@/components/ui/Title/Title';
import { notFound } from 'next/navigation';
import React from 'react'
interface Props {
  params: {
    id: string;
  }
}
export default function CategoryPage({params}: Props) {
  const {id} = params;
  
  if (id === 'no') {
    notFound();
  }
  return (
    <div>
      <Title
      title='Oversizes'
      subtitle='Todas nuestros modelos overzises'/>
    </div>
  )
}
