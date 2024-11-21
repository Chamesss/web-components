'use client'
import { ChevronDown, Github, Linkedin, Twitter } from 'lucide-react'
import React from 'react'
import { ParallaxSection } from './components/parallax-section'

export default function ParallaxScroll() {
    return (
        <div className="relative w-screen bg-black">
            <ParallaxSection
                imageUrl="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80"
                title="Welcome to Paradise"
                subtitle="Discover the beauty of nature through our lens"
            >
                <ChevronDown className="mt-8 animate-bounce" size={32} />
            </ParallaxSection>

            <ParallaxSection
                imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80"
                title="Explore Mountains"
                subtitle="Where earth touches the sky"
                speed={0.3}
            >
                <button className="transform rounded-full bg-white px-8 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-opacity-90">
                    Start Journey
                </button>
            </ParallaxSection>

            <ParallaxSection
                imageUrl="https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&q=80"
                title="Discover Waters"
                subtitle="Dive into the unknown"
                speed={0.7}
            >
                <div className="mt-8 flex gap-6">
                    <a
                        href="#"
                        className="transform transition-all duration-300 hover:scale-125"
                    >
                        <Twitter className="text-white" size={24} />
                    </a>
                    <a
                        href="#"
                        className="transform transition-all duration-300 hover:scale-125"
                    >
                        <Github className="text-white" size={24} />
                    </a>
                    <a
                        href="#"
                        className="transform transition-all duration-300 hover:scale-125"
                    >
                        <Linkedin className="text-white" size={24} />
                    </a>
                </div>
            </ParallaxSection>

            <div className="fixed bottom-4 right-4 z-50">
                <button
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                    className="transform rounded-full bg-white/10 p-3 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/20"
                >
                    <ChevronDown className="rotate-180" size={24} />
                </button>
            </div>
        </div>
    )
}
