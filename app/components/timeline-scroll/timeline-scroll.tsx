'use client'

import { cn } from '@/lib/utils'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChartNoAxesCombined, Cpu, Rocket, Syringe } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Corona from './assets/corona'

const timelineEvents = [
    {
        year: 2020,
        icon: Corona,
        title: 'Global Pandemic',
        description: (
            <p>
                The <b>COVID-19</b> virus spreads worldwide, transforming{' '}
                <b className="text-rose-500 underline">healthcare systems</b>{' '}
                and altering the way we <b className="text-emerald-600">live</b>{' '}
                and <b className="text-amber-600">work</b>. Lockdowns and social
                distancing become part of daily life.
            </p>
        ),
    },
    {
        year: 2021,
        icon: Syringe,
        title: 'Vaccine Rollout',
        description: (
            <p>
                Mass{' '}
                <b className="capitalize underline">vaccination campaigns</b>{' '}
                begin across the globe, offering new{' '}
                <b className="text-yellow-300">hope</b> for a return to{' '}
                <b className="text-blue-400">normalcy</b>. Scientists and
                healthcare professionals work tirelessly to distribute doses to
                billions.
            </p>
        ),
    },
    {
        year: 2022,
        title: 'Economic Recovery',
        icon: ChartNoAxesCombined,
        description: (
            <p>
                As restrictions ease,{' '}
                <b className="text-amber-600">global economies</b> start to
                rebound. Industries such as{' '}
                <b className="text-sky-300">tourism</b>,{' '}
                <b className="text-sky-500">hospitality</b>, and{' '}
                <b className="text-sky-700">retail</b> regain momentum, though
                challenges like <b className="text-orange-800">supply chain</b>{' '}
                issues persist.
            </p>
        ),
    },
    {
        year: 2023,
        title: 'Technological Advancements',
        icon: Cpu,
        description: (
            <p>
                Breakthroughs in{' '}
                <b className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                    AI
                </b>{' '}
                and{' '}
                <b className="bg-gradient-to-r from-blue-500 via-pink-400 to-purple-700 bg-clip-text text-transparent">
                    quantum computing
                </b>{' '}
                accelerate innovation. <b className="">Machine learning</b> and{' '}
                <b>automation</b> continue to reshape industries, enhancing
                productivity and enabling new applications.
            </p>
        ),
    },
    {
        year: 2024,
        title: 'Space Exploration Milestone',
        icon: Rocket,
        description: (
            <p>
                Humanity achieves a new frontier with the establishment of the
                first <b>permanent base</b> on the <b>Moon</b>. This monumental
                achievement paves the way for further <b>space exploration</b>{' '}
                and potential Mars missions.
            </p>
        ),
    },
]

export default function TimelineScroll() {
    const [activeIndex, setActiveIndex] = useState(0)
    const containerRef = useRef(null)

    useEffect(() => {
        const elements = document.querySelectorAll('.timeline-event')

        if (elements.length === 0) return

        const observers = Array.from(elements).map((_, index) => {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setActiveIndex(index)
                    }
                },
                { threshold: 1 }
            )
            return observer
        })

        elements.forEach((el, index) => observers[index].observe(el))

        return () => {
            elements.forEach((el, index) => observers[index].unobserve(el))
        }
    }, [])

    return (
        <div
            className="relative min-h-screen w-full overflow-hidden"
            ref={containerRef}
        >
            <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')",
                    // y: backgroundY,
                    backgroundAttachment: 'fixed',
                }}
            />
            <div className="absolute inset-0 h-full w-full bg-black/50" />
            <div className="relative z-10 mx-auto max-w-4xl px-0 py-16 sm:px-2 lg:px-4">
                <h1 className="mb-8 text-center text-4xl font-bold text-white">
                    Interactive Timeline
                </h1>
                <div className="relative rounded-lg">
                    <div className="mx-auto my-[10rem] flex w-full flex-col items-center space-y-[10rem] p-4">
                        {timelineEvents.map((event, index) => (
                            <motion.div
                                key={event.year}
                                className={cn(
                                    'ml-4 flex w-[20rem] flex-col items-start gap-8 bg-transparent sm:ml-0 lg:w-fit'
                                )}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: activeIndex >= index ? 1 : 0.3,
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="z-[1] flex-shrink-0 text-center">
                                    <div className="relative flex">
                                        <div
                                            className={`timeline-event !z-[2] h-10 w-10 rounded-full border-4 transition-all lg:h-14 lg:w-14 ${
                                                activeIndex >= index
                                                    ? 'border-gray-700 bg-primary'
                                                    : 'border-gray-400 bg-gray-200'
                                            } flex items-center justify-center`}
                                        >
                                            <span
                                                className={`text-xs font-bold lg:text-base ${activeIndex >= index ? 'text-white' : 'text-gray-600'}`}
                                            >
                                                {event.year}
                                            </span>
                                        </div>
                                        <div
                                            className={cn(
                                                'absolute top-1/2 z-[0] flex w-[15rem] -translate-y-1/2 rounded-none bg-gray-800 p-3 lg:w-[30rem] lg:p-6',
                                                {
                                                    'left-[125%]':
                                                        index % 2 === 1,
                                                    'left-[125%] lg:left-auto lg:right-[125%]':
                                                        index % 2 === 0,
                                                }
                                            )}
                                        >
                                            <div className="noisy z-[1] opacity-50" />
                                            <motion.div
                                                className={cn(
                                                    'absolute top-1/2 !z-[-5] h-1 w-[2.5rem] -translate-y-1/2 bg-gray-200/50',
                                                    {
                                                        'right-[100%]':
                                                            index % 2 === 1,
                                                        'left-auto right-[100%] lg:left-[100%] lg:right-auto':
                                                            index % 2 === 0,
                                                    }
                                                )}
                                                initial={{ scaleX: 0 }}
                                                animate={{
                                                    scaleX:
                                                        activeIndex >= index
                                                            ? 1
                                                            : 0,
                                                }}
                                                transition={{ duration: 0.5 }}
                                            />
                                            <div className="z-[3]">
                                                <h2 className="mb-2 flex flex-row items-center justify-center gap-2 text-2xl font-semibold text-white">
                                                    {event.icon &&
                                                        (() => {
                                                            const Icon =
                                                                event.icon
                                                            return (
                                                                <Icon className="h-5 w-5 lg:h-7 lg:w-7" />
                                                            )
                                                        })()}
                                                    <span className="text-sm lg:text-base">
                                                        {event.title}
                                                    </span>
                                                </h2>
                                                <span className="py-4 text-xs text-gray-300 lg:text-base">
                                                    {event.description}
                                                </span>
                                            </div>
                                        </div>
                                        {index < timelineEvents.length - 1 && (
                                            <motion.div
                                                className="absolute left-1/2 top-[130%] h-[6.5rem] w-1 -translate-x-1/2 bg-gray-200/50 lg:h-[8rem]"
                                                initial={{ scaleY: 0 }}
                                                animate={{
                                                    scaleY:
                                                        activeIndex > index
                                                            ? 2
                                                            : 0,
                                                }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
