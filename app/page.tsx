import React from 'react'
import ParallaxScroll from './components/parallax-scroll/parallax-scroll'
import SwiperCoverFlowComponent from './components/swiper-3d-coverflow/swiper'
import SwiperComponent from './components/swiper/swiper'

export default function page() {
    return (
        <main className="min-h-[600vh]">
            <div className="z-[-99]">
                <SwiperCoverFlowComponent />
            </div>
            {/* <SwiperComponent /> */}
            <ParallaxScroll />
        </main>
    )
}
