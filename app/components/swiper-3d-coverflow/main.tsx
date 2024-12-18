'use client'

import React from 'react'
import AnimatedText from './components/animated-text'
import SliderPrototype from './components/swiper'

export default function MainSwiper() {
    const [state, setState] = React.useState(0)

    return (
        <section>
            <h1 className="mt-8 w-full text-center text-4xl font-semibold">
                Swiper 3D Coverflow
            </h1>
            <div className="mt-4 flex min-h-screen w-full flex-col items-center gap-0 md:flex-row md:justify-center md:!gap-0 lg:!gap-4">
                <SliderPrototype state={state} setState={setState} />
                <AnimatedText state={state} />
            </div>
        </section>
    )
}
