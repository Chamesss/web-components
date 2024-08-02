'use client'
import React from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import './styles.css'

export default function SwiperComponent() {
    return (
        <div>
            <Swiper
                slidesPerView={2}
                spaceBetween={20}
                centeredSlides={true}
                pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                }}
                modules={[Pagination]}
                className="swiper"
                id="js-swiper-hotels"
            >
                <SwiperSlide className="swiper-slide">
                    <div className="c-swiper__text">
                        <div className="c-swiper__title">Hotel Spa</div>

                        <a href="#" className="c-swiper__link">
                            View Details
                        </a>
                    </div>

                    <div className="c-swiper__image-container">
                        <img
                            src="https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt=""
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide">
                    <div className="c-swiper__text">
                        <div className="c-swiper__title">Hotel Urban</div>

                        <a href="#" className="c-swiper__link">
                            View Details
                        </a>
                    </div>

                    <div className="c-swiper__image-container">
                        <img
                            src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt=""
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide">
                    <div className="c-swiper__text">
                        <div className="c-swiper__title">Hotel Adults</div>

                        <a href="#" className="c-swiper__link">
                            View Details
                        </a>
                    </div>

                    <div className="c-swiper__image-container">
                        <img
                            src="https://images.pexels.com/photos/6474917/pexels-photo-6474917.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt=""
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide">
                    <div className="c-swiper__text">
                        <div className="c-swiper__title">Hotel Beach</div>

                        <a href="#" className="c-swiper__link">
                            View Details
                        </a>
                    </div>

                    <div className="c-swiper__image-container">
                        <img
                            src="https://images.pexels.com/photos/1591361/pexels-photo-1591361.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt=""
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
