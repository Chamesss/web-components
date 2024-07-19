"use client"
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';


export default function SwiperComponent() {
  return (
    <div className="container">
      <h1 className="heading">Flower Gallery</h1>
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
        <SwiperSlide>
          <img src={'/images/img_1.jpg'} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={'/images/img_2.jpg'} alt="slide_image" />
        </SwiperSlide>
       <SwiperSlide>
          <img src={'/images/img_3.jpg'} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={'/images/img_4.jpg'} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={'/images/img_5.jpg'} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={'/images/img_6.jpg'} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={'/images/img_7.jpg'} alt="slide_image" />
        </SwiperSlide>

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
