import { AnimatePresence, motion } from 'framer-motion'
import { Star } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import type { Square } from '../types'

interface Props {
    squares: Square[]
    allDropped: boolean
    onReset: () => void
    onDragEnd: (id: number, info: any) => void
    dragConstraints: React.RefObject<Element>
}

export function DropZone({
    squares,
    allDropped,
    onReset,
    onDragEnd,
    dragConstraints,
}: Props) {
    return (
        <motion.div
            id="dropzone"
            className="relative flex h-64 w-full items-center justify-center rounded-2xl border-4 border-dashed border-purple-300 bg-white/30 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 to-pink-200/20" />

            <AnimatePresence>
                {allDropped ? (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="z-10 text-center"
                    >
                        <Star className="mx-auto mb-4 h-16 w-16 text-yellow-500" />
                        <p className="mb-4 text-2xl font-bold text-indigo-900">
                            Amazing job!
                        </p>
                        <button
                            onClick={onReset}
                            className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 text-white shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-pink-600"
                        >
                            Play Again
                        </button>
                    </motion.div>
                ) : (
                    <p className="z-10 text-xl font-semibold text-purple-600">
                        Drop the squares here!
                    </p>
                )}
            </AnimatePresence>

            <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4">
                {squares.map(
                    (square) =>
                        square.isDropped && (
                            <motion.div
                                key={square.id}
                                id={`square-${square.id}`}
                                drag
                                dragConstraints={dragConstraints}
                                dragMomentum={false}
                                dragElastic={0.1}
                                whileDrag={{
                                    scale: 1.2,
                                    zIndex: 50,
                                    boxShadow:
                                        '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                                }}
                                onDragEnd={(_, info) =>
                                    onDragEnd(square.id, info)
                                }
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={`${square.color} cursor-grab rounded-xl shadow-lg active:cursor-grabbing`}
                                transition={{
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 30,
                                }}
                            />
                        )
                )}
            </div>
        </motion.div>
    )
}
