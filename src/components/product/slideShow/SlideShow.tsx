'use client';
import React, { useState } from 'react'
// Import Swiper Vue.js components
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slideshow.css'

import Image from 'next/image';

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export default function SlideShow({images, title, className}:Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>()
  return (
    <div className={className}>
        <Swiper
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
            {
                images.map(image => (
                    <SwiperSlide key={image}><Image src={`/products/${image}`} width={1024} height={800} className='rounded-lg object-fill  h-auto' alt={title}/></SwiperSlide>
                ))
            }
        </Swiper>

        <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        >

            {
                images.map(image => (
                    <SwiperSlide key={image}><Image src={`/products/${image}`} width={300} height={300} className='rounded-lg object-fill' alt={title}/></SwiperSlide>
                ))
            }
        </Swiper>   
    </div>
  )
}
