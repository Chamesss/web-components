'use client'
import React, { useEffect, useRef } from 'react'

interface ParallaxSectionProps {
    imageUrl: string
    title: string
    subtitle?: string
    speed?: number
    children?: React.ReactNode
}

export function ParallaxSection({
    imageUrl,
    title,
    subtitle,
    speed = 0.5,
    children,
}: ParallaxSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const scrolled = window.scrollY
                const section = sectionRef.current
                const offset = section.offsetTop
                const distance = scrolled - offset

                if (Math.abs(distance) < window.innerHeight) {
                    section.style.backgroundPositionY = `${distance * speed}px`
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [speed])

    return (
        <div
            ref={sectionRef}
            className="relative h-screen bg-cover bg-fixed bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                <h2 className="mb-4 transform text-center text-5xl font-bold transition-all duration-700 hover:scale-105 md:text-7xl">
                    {title}
                </h2>
                {subtitle && (
                    <p className="mx-auto mb-8 max-w-2xl transform text-center text-xl transition-all duration-500 hover:scale-105 md:text-2xl">
                        {subtitle}
                    </p>
                )}
                {children}
            </div>
        </div>
    )
}
