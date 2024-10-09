'use client'

import React from 'react'
import AnimatedText from './components/animated-text'
import SliderPrototype from './components/swiper'

export default function MainSwiper() {
    const [state, setState] = React.useState(0)

    return (
        <div className="mt-4 flex flex-col items-center gap-0 md:flex-row md:justify-center md:!gap-0 lg:!gap-4">
            <SliderPrototype state={state} setState={setState} />
            <AnimatedText state={state} />
        </div>
    )
}
