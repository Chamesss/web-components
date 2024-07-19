"use client"
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

const placeHolderImages = [
    '/images/img_1.jpg',
    '/images/img_2.jpg',
    '/images/img_3.jpg',
    '/images/img_4.jpg',
    '/images/img_5.jpg',
    '/images/img_6.jpg',
    '/images/img_7.jpg',
]


export default function SwiperComponent() {
  return (
    <div className="container">
      <h1 className="heading my-4">Swiper Slider 3D Coverflow</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
       {placeHolderImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={image}
                            alt="slide_image"
                            className="slide_image"
                            width={1024}
                            height={1024}
                            priority={true}
                        />
                    </SwiperSlide>
                ))}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <svg className="arrow-back-outline"></svg>
          </div>
          <div className="swiper-button-next slider-arrow">
            <svg className="arrow-forward-outline"></svg>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}
