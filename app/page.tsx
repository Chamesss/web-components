import React from 'react'
import ParallaxScroll from './components/parallax-scroll/parallax-scroll'
import SwiperCoverFlowComponent from './components/swiper-3d-coverflow/swiper'
import SwiperComponent from './components/swiper/swiper'
import RangerComponent from './components/tanstack-ranger/ranger'

export default function page() {
    return (
        <main className="">
            {/* <div className="z-[-99]">
                <SwiperCoverFlowComponent />
            </div>
            <SwiperComponent /> */}
            {/* <ParallaxScroll /> */}
            <RangerComponent />
        </main>
    )
}
