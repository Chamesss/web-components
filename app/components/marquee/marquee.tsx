'use client'

import AwsSvg from './assets/aws-svg'
import HooliSvg from './assets/hooli-svg'
import LeaftSvg from './assets/leaft-svg'
import LyftSvg from './assets/lyft-svg'
import RedditSvg from './assets/reddit'
import StripeSvg from './assets/stripe-svg'

interface MarqueeProps {
    pauseOnHover?: boolean
    className?: string
}

const icons = [AwsSvg, HooliSvg, LeaftSvg, LyftSvg, RedditSvg, StripeSvg]

export default function Marquee({
    pauseOnHover = true,
    className = '',
}: MarqueeProps) {
    return (
        <>
            <h1 className="mt-8 w-full text-center text-4xl font-semibold">
                Marquee
            </h1>
            <div
                className={`mt-4 w-screen overflow-hidden whitespace-nowrap bg-white ${className}`}
            >
                <div
                    onMouseEnter={
                        pauseOnHover
                            ? (e) =>
                                  (e.currentTarget.style.animationPlayState =
                                      'paused')
                            : undefined
                    }
                    onMouseLeave={
                        pauseOnHover
                            ? (e) =>
                                  (e.currentTarget.style.animationPlayState =
                                      'running')
                            : undefined
                    }
                    className="inline-flex animate-marquee"
                >
                    <div className="flex py-4 lg:py-10">
                        {[...Array(20)].map((_, i) => {
                            const Icon = icons[i % icons.length]
                            return (
                                <Icon
                                    key={i}
                                    className="mx-4 my-auto inline-block h-12 w-12 lg:mx-8 lg:h-auto lg:w-auto"
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
