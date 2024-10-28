'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'
import forest from './assets/forest.png'
import mountain from './assets/mountain.jpg'
import sahara from './assets/sahara.jpg'
import skyline from './assets/skyline.png'
import waterFall from './assets/waterfull.jpg'
import waves from './assets/waves.png'

const cards = [
    {
        id: 1,
        title: 'Mountain Peak',
        description: 'A serene mountain landscape with snow-capped peaks.',
        image: mountain,
        longDescription:
            'Majestic mountain peaks rise above the clouds, their snow-capped summits glistening in the sunlight. The crisp air and breathtaking views make this a paradise for hikers and nature enthusiasts.',
    },
    {
        id: 2,
        title: 'Ocean Waves',
        description: 'Crashing waves on a beautiful sandy beach at sunset.',
        image: waves,
        longDescription:
            'Golden sunlight bathes the beach as powerful waves crash against the shore. The rhythmic sound of the ocean and the salty breeze create a perfect seaside atmosphere.',
    },
    {
        id: 3,
        title: 'Forest Trail',
        description: 'A winding path through a lush green forest.',
        image: forest,
        longDescription:
            'A serene path winds through a dense, verdant forest. Sunlight filters through the canopy, creating a magical atmosphere filled with the sounds of birds and rustling leaves.',
    },
    {
        id: 4,
        title: 'City Skyline',
        description: 'A stunning view of a modern city skyline at night.',
        image: skyline,
        longDescription:
            'The city comes alive at night with a dazzling display of lights. Towering skyscrapers pierce the sky, their windows twinkling like stars, reflecting the vibrant energy of urban life.',
    },
    {
        id: 5,
        title: 'Desert Dunes',
        description: 'Golden sand dunes stretching as far as the eye can see.',
        image: sahara,
        longDescription:
            'Endless golden dunes stretch to the horizon, their shapes constantly shifting with the wind. The stark beauty of the desert landscape is both humbling and awe-inspiring.',
    },
    {
        id: 6,
        title: 'Waterfall',
        description: 'A majestic waterfall cascading down rocky cliffs.',
        image: waterFall,
        longDescription:
            'Water thunders down the rocky cliffs, creating a misty veil and a constant roar. The raw power of nature is on full display in this breathtaking waterfall scene.',
    },
]

const Card = ({
    title,
    description,
    image,
    index,
    onClick,
}: {
    title: string
    description: string
    image: StaticImageData
    index: number
    onClick: () => void
}) => {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <motion.div
            className="relative h-[400px] w-full cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onHoverStart={() => setIsFlipped(true)}
            onHoverEnd={() => setIsFlipped(false)}
            onClick={onClick}
        >
            <motion.div
                className="absolute h-full w-full"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ backfaceVisibility: 'hidden' }}
            >
                <Image
                    src={image}
                    alt={title}
                    className="h-full w-full rounded-lg object-cover shadow-lg"
                    width={1024}
                    height={768}
                />
            </motion.div>
            <motion.div
                className="absolute flex h-full w-full flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-lg"
                initial={false}
                animate={{ rotateY: isFlipped ? 0 : -180 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ backfaceVisibility: 'hidden' }}
            >
                <h3 className="mb-4 text-2xl font-bold">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </motion.div>
        </motion.div>
    )
}

export default function AnimatedCardFlipGallery() {
    const [selectedCard, setSelectedCard] = useState<(typeof cards)[0] | null>(
        null
    )

    useEffect(() => {
        if (selectedCard) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'auto'
        }
        return () => {
            document.body.style.overflowY = 'auto'
        }
    }, [selectedCard])

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="mb-12 text-center text-4xl font-bold">
                Animated Card Flip Gallery
            </h1>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card, index) => (
                    <Card
                        key={card.id}
                        {...card}
                        index={index}
                        onClick={() => setSelectedCard(card)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedCard && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCard(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-6 shadow-xl"
                        >
                            <button
                                onClick={() => setSelectedCard(null)}
                                className="absolute right-4 top-4 text-2xl font-bold text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                            <Image
                                src={selectedCard.image}
                                alt={selectedCard.title}
                                className="mb-4 h-64 w-full rounded-lg object-cover"
                                width={1024}
                                height={768}
                            />
                            <h2 className="mb-2 text-3xl font-bold">
                                {selectedCard.title}
                            </h2>
                            <div className="mt-2 rounded-lg bg-gray-100 p-4">
                                <p className="mb-4 text-lg text-gray-600">
                                    {selectedCard.description}
                                </p>
                                <p className="text-base text-gray-700">
                                    {selectedCard.longDescription}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
