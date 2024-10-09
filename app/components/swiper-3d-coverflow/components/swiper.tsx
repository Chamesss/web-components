'use client'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React, { useRef } from 'react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const placeHolderImages = [
    '/images/img_1.jpg',
    '/images/img_2.jpg',
    '/images/img_3.jpg',
    '/images/img_4.jpg',
    '/images/img_5.jpg',
    '/images/img_6.jpg',
    '/images/img_7.jpg',
]

export default function SliderPrototype({
    state,
    setState,
}: {
    state: number
    setState: React.Dispatch<React.SetStateAction<number>>
}) {
    const prevButtonRef = useRef<HTMLDivElement>(null)
    const nextButtonRef = useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        if (state === 7) {
            setState(0)
        }
    }, [state])

    return (
        <div className="xs:!scale-[0.65] xs:-mb-[4.5rem] relative -mb-[8rem] -mt-[5rem] h-[35rem] w-[35rem] max-w-[60rem] !scale-[0.55] overflow-hidden px-4 sm:-mb-[3.5rem] sm:-mt-[3.5rem] sm:!scale-[0.75] md:-ml-[2rem] md:-mr-[2rem] lg:mb-0 lg:ml-0 lg:mr-0 lg:mt-0 lg:!scale-100 lg:py-4">
            <div className="absolute left-1/2 top-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 transform">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={false}
                    loop={true}
                    slidesPerView={3}
                    speed={400}
                    coverflowEffect={{
                        rotate: 2,
                        stretch: 0,
                        depth: 10,
                        modifier: 100,
                        slideShadows: true,
                    }}
                    initialSlide={4}
                    onRealIndexChange={(swiper: any) => {
                        setState(Number(swiper.realIndex) + 1)
                    }}
                    pagination={{
                        el: '.swiper-pagination margin',
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: '.swiper-custom-next',
                        prevEl: '.swiper-custom-prev',
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="relative z-20 !overflow-visible"
                    onBeforeInit={(swiper) => {
                        // Assign buttons after the swiper instance is initialized
                        if (prevButtonRef.current && nextButtonRef.current) {
                            swiper.navigation.nextEl = nextButtonRef.current
                            swiper.navigation.prevEl = prevButtonRef.current
                            swiper.navigation.init()
                            swiper.navigation.update()
                        }
                    }}
                >
                    {placeHolderImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className={cn(
                                    'relative h-full w-full !overflow-hidden transition-all',
                                    index === state && '!overflow-visible'
                                )}
                            >
                                <Image
                                    src={image}
                                    alt="slide_image"
                                    className={cn(
                                        'z-0 !h-[25rem] !w-[20rem] rounded-none object-cover transition-all',
                                        Number(state) === 6
                                            ? (index === 0 && 'block') ||
                                                  (index === 5 && 'block') ||
                                                  (index === Number(state) &&
                                                      'block') ||
                                                  'hidden'
                                            : Number(state) === 0
                                              ? (index === 6 && 'block') ||
                                                (index === 1 && 'block') ||
                                                (index === Number(state) &&
                                                    'block') ||
                                                'hidden'
                                              : (index === Number(state) - 1 &&
                                                    'block') ||
                                                (index === Number(state) &&
                                                    'block') ||
                                                (index === Number(state) + 1 &&
                                                    'block') ||
                                                'hidden'
                                    )}
                                    width={1024}
                                    height={1024}
                                    priority={true}
                                />
                                <div
                                    className={cn(
                                        'absolute left-1/2 top-1/2 z-10 m-auto !h-[25rem] !w-[20rem] -translate-x-1/2 -translate-y-1/2 scale-110 transition-all duration-0',
                                        Number(state) === 6
                                            ? (index === 0 &&
                                                  'bg-[#2b2b2b]/50') ||
                                                  (index === 5 &&
                                                      'bg-[#2b2b2b]/50') ||
                                                  (index === Number(state) &&
                                                      'bg-slate-100/0 dark:bg-[#2b2b2b]/0') ||
                                                  'bg-slate-100 dark:bg-[#2b2b2b]'
                                            : Number(state) === 0
                                              ? (index === 6 &&
                                                    'bg-[#2b2b2b]/50') ||
                                                (index === 1 &&
                                                    'bg-[#2b2b2b]/50') ||
                                                (index === Number(state) &&
                                                    'bg-slate-100/0 dark:bg-[#2b2b2b]/0')
                                              : (index === Number(state) - 1 &&
                                                    'bg-[#2b2b2b]/50') ||
                                                (index === Number(state) &&
                                                    'bg-slate-100/0 dark:bg-green-500/0') ||
                                                (index === Number(state) + 1 &&
                                                    'bg-[#2b2b2b]/50') ||
                                                'bg-slate-100 dark:bg-[#2b2b2b]'
                                    )}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="absolute -bottom-[5rem] left-1/2 z-30 flex -translate-x-1/2 flex-row gap-2 md:-bottom-[4rem]">
                        <div ref={prevButtonRef} className="swiper-custom-prev">
                            <ArrowLeft className="h-12 w-12 cursor-pointer rounded-full bg-slate-100 p-2 transition-all hover:bg-slate-200 md:h-12 md:w-12 md:p-3" />
                        </div>
                        <div ref={nextButtonRef} className="swiper-custom-next">
                            <ArrowRight className="h-12 w-12 cursor-pointer rounded-full bg-slate-100 p-2 transition-all hover:bg-slate-200 md:h-12 md:w-12 md:p-3" />
                        </div>
                    </div>
                </Swiper>
            </div>
        </div>
    )
}
