'use client';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './mobileSlideShow.css'

import Image from 'next/image';

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export default function MobileSlideShow({images, title, className}:Props) {
  return (
    <div className={className}>
        <Swiper
        style={{
            width: '100vw',
            height: '500px'
        }}
        pagination
        modules={[FreeMode, Pagination]}
        className="mySwiper2"
        >
            {
                images.map(image => (
                    <SwiperSlide key={image}><Image src={`/products/${image}`} width={600} height={500} className='object-fill' alt={title}/></SwiperSlide>
                ))
            }
        </Swiper>

    </div>
  )
}
