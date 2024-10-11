'use client'
import backgroundImage from '@/app/components/parallax-scroll/assets/full.jpg'
import left from '@/app/components/parallax-scroll/assets/left.jpg'
import middle from '@/app/components/parallax-scroll/assets/middle.jpg'
import right from '@/app/components/parallax-scroll/assets/right.jpg'
import React, { useEffect, useRef } from 'react'

export default function ParallaxScroll() {
    const containerRef = useRef<HTMLDivElement>(null)
    const fastLayerRef = useRef<HTMLDivElement>(null)
    const slowLayerRef = useRef<HTMLDivElement>(null)
    const reversibleLayerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop =
                window.scrollY -
                containerRef.current!.getBoundingClientRect().top
            if (fastLayerRef.current) {
                fastLayerRef.current.style.transform = `translateY(${scrollTop * 0.55}px)`
            }
            if (slowLayerRef.current) {
                slowLayerRef.current.style.transform = `translateY(${scrollTop * 0.3}px)`
            }
            if (reversibleLayerRef.current) {
                reversibleLayerRef.current.style.transform = `translateY(${-scrollTop * 0.25}px)`
            }
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    console.log('its intersecting')
                    window.addEventListener('scroll', handleScroll)
                    console.log('entry.isIntersecting')
                } else {
                    window.removeEventListener('scroll', handleScroll)
                    console.log('entry.isNotIntersecting')
                }
            },
            { threshold: 0.1 }
        )
        if (containerRef.current) {
            observer.observe(containerRef.current)
        }
        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (containerRef.current) {
                observer.unobserve(containerRef.current)
            }
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="relative h-[150vh] w-full overflow-hidden rounded-sm"
            style={{
                backgroundImage: `url(${backgroundImage.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="absolute left-1/2 top-1/2 z-[2] h-[150vh] w-screen -translate-x-1/2 -translate-y-1/2 bg-black/50" />
            <div
                ref={fastLayerRef}
                className="absolute -top-[25%] right-5 z-[5] h-1/4 w-1/2 rounded-sm lg:h-1/3 lg:w-1/3"
                style={{
                    backgroundImage: `url(${left.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'end',
                }}
            />
            <div
                ref={reversibleLayerRef}
                className="absolute -bottom-[0%] left-0 right-0 z-[4] mx-auto h-1/6 w-2/3 rounded-sm md:h-1/4 md:w-1/3 lg:w-1/4"
                style={{
                    backgroundImage: `url(${right.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <div
                ref={slowLayerRef}
                className="absolute -top-[0%] left-5 z-[3] h-1/4 w-1/2 rounded-sm lg:h-1/2"
                style={{
                    backgroundImage: `url(${middle.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        </div>
    )
}
