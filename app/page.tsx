import React from 'react'
import ParallaxScroll from './components/parallax-scroll/parallax-scroll'
import SwiperCoverFlowComponent from './components/swiper-3d-coverflow/main'
import SwiperComponent from './components/swiper/swiper'
import RangerComponent from './components/tanstack-ranger/ranger'

export default function page() {
    return (
        <main className="mx-auto mb-[50rem] flex w-full max-w-[90rem] flex-col items-center">
            <SwiperCoverFlowComponent />
            <ParallaxScroll />
        </main>
    )
}
