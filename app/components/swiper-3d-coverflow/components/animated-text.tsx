'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const logicTexts = [
    {
        id: 'Resilience & Perseverance',
        text: 'In the face of adversity, resilience is the quiet force that keeps us moving forward. Like a tree weathering a storm, we bend but do not break, rising stronger after each challenge. Every setback becomes an opportunity to grow, to learn, and to discover the strength within us that we never knew existed.',
    },
    {
        id: 'Motivation & Hard Work',
        text: 'Success is not the result of luck, but the product of relentless effort and determination. It’s the countless hours spent honing your craft, the sacrifices made, and the unwavering belief that hard work, no matter how exhausting, will eventually pay off. Every step forward brings you closer to your goals, no matter how steep the path may seem.',
    },
    {
        id: 'Beauty of Nature',
        text: (
            <>
                In the stillness of nature, we find peace. The gentle sway of
                trees, the whispering winds, and the rhythmic flow of rivers
                remind us that beauty exists in every moment. Nature teaches us
                patience, as mountains are carved by slow, steady forces over
                time, showing us that great things often come from the quiet
                persistence of life&apos;s natural rhythms.
            </>
        ),
    },
]

export default function AnimatedText({ state }: { state: number }) {
    const [selectedLogic, setSelectedLogic] = useState(logicTexts[0].id)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (index === logicTexts.length - 1) {
            setIndex(0)
            setSelectedLogic(logicTexts[0].id)
        } else {
            setIndex((prev) => prev + 1)
            setSelectedLogic(logicTexts[index + 1].id)
        }
    }, [state])

    return (
        <div className="flex w-full flex-col items-center justify-center p-4 md:-ml-[2rem] md:max-w-[22rem] lg:ml-0 xl:max-w-[25rem]">
            <div className="w-full max-w-md">
                <div className="px-4 py-6 md:px-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedLogic}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="text-start"
                        >
                            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                                {selectedLogic.toUpperCase()}
                            </h2>
                            <p className="leading-6 text-gray-700">
                                {
                                    logicTexts.find(
                                        (logic) => logic.id === selectedLogic
                                    )?.text
                                }
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
