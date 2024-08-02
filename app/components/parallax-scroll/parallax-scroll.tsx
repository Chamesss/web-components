'use client'
import React, { useEffect, useRef } from 'react'

export default function ParallaxScroll() {
    const containerRef = useRef<HTMLDivElement>(null)
    const fastLayerRef = useRef<HTMLDivElement>(null)
    const slowLayerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY

            if (fastLayerRef.current) {
                fastLayerRef.current.style.transform = `translateY(${scrollTop * 0.3}px)`
            }
            if (slowLayerRef.current) {
                slowLayerRef.current.style.transform = `translateY(${scrollTop * 0.3}px)`
            }
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
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
            className="relative h-screen overflow-visible bg-yellow-200"
        >
            <div
                ref={fastLayerRef}
                className="absolute right-0 top-0 h-[20rem] w-[20rem] bg-blue-500"
                style={{ willChange: 'transform' }}
            >
                <div className="flex h-screen items-center justify-center">
                    <h1 className="text-4xl text-white">Fast Layer</h1>
                </div>
            </div>
            <div
                ref={slowLayerRef}
                className="absolute left-0 top-0 h-[20rem] w-[20rem] bg-green-500"
                style={{ willChange: 'transform' }}
            >
                <div className="flex h-screen items-center justify-center">
                    <h1 className="text-4xl text-white">Slow Layer</h1>
                </div>
            </div>
        </div>
    )
}
