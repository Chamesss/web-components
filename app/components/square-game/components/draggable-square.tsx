import { motion } from 'framer-motion'
import React from 'react'
import type { Square } from '../types'

interface Props {
    square: Square
    onDragEnd: (id: number, info: any) => void
    dragConstraints: React.RefObject<Element>
}

export function DraggableSquare({ square, onDragEnd, dragConstraints }: Props) {
    return (
        <motion.div
            id={`square-${square.id}`}
            drag
            dragConstraints={dragConstraints}
            dragMomentum={false}
            dragElastic={0.1}
            whileHover={{ scale: 1.1 }}
            whileDrag={{
                scale: 1.2,
                zIndex: 50,
                boxShadow:
                    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            }}
            onDragEnd={(_, info) => onDragEnd(square.id, info)}
            className={`h-24 w-24 rounded-xl ${square.color} cursor-grab shadow-lg active:cursor-grabbing`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                delay: square.id * 0.1,
            }}
        />
    )
}
