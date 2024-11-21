'use client'
import React, { useEffect, useRef, useState } from 'react'
import { DraggableSquare } from './components/draggable-square'
import { DropZone } from './components/drop-zone'
import type { Square } from './types'

export default function SquareGame() {
    const constraintsRef = useRef(null)
    const [squares, setSquares] = useState<Square[]>([
        { id: 1, color: 'bg-pink-500', isDropped: false },
        { id: 2, color: 'bg-purple-500', isDropped: false },
        { id: 3, color: 'bg-blue-500', isDropped: false },
        { id: 4, color: 'bg-green-500', isDropped: false },
    ])

    const [score, setScore] = useState(0)

    const handleDragEnd = (id: number, info: any) => {
        const dropzone = document.getElementById('dropzone')
        if (!dropzone) return

        const dropzoneBounds = dropzone.getBoundingClientRect()
        const squareElement = document.getElementById(`square-${id}`)
        if (!squareElement) return

        const squareBounds = squareElement.getBoundingClientRect()
        const squareCenter = {
            x: squareBounds.left + squareBounds.width / 2,
            y: squareBounds.top + squareBounds.height / 2,
        }

        const isInDropZone =
            squareCenter.x >= dropzoneBounds.left &&
            squareCenter.x <= dropzoneBounds.right &&
            squareCenter.y >= dropzoneBounds.top &&
            squareCenter.y <= dropzoneBounds.bottom

        setSquares((prev) =>
            prev.map((square) =>
                square.id === id
                    ? { ...square, isDropped: isInDropZone }
                    : square
            )
        )

        const square = squares.find((s) => s.id === id)
        if (square) {
            if (isInDropZone && !square.isDropped) {
                setScore((prev) => prev + 100)
            } else if (!isInDropZone && square.isDropped) {
                setScore((prev) => prev - 50)
            }
        }
    }

    const resetGame = () => {
        setSquares(squares.map((square) => ({ ...square, isDropped: false })))
        setScore(0)
    }

    const allDropped = squares.every((square) => square.isDropped)

    return (
        <div
            className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8"
            ref={constraintsRef}
        >
            <div className="mx-auto max-w-4xl space-y-8">
                <div className="text-center">
                    <h1 className="mb-2 text-4xl font-bold text-gray-900">
                        Square Drop Adventure!
                    </h1>
                    <p className="text-lg text-purple-700">
                        Drag squares in and out of the magical container!
                    </p>
                    <div className="mt-2 text-2xl font-bold text-pink-600">
                        Score: {score}
                    </div>
                </div>

                <div className="relative z-10 flex flex-wrap justify-center gap-8">
                    {squares.map(
                        (square) =>
                            !square.isDropped && (
                                <DraggableSquare
                                    key={square.id}
                                    square={square}
                                    onDragEnd={handleDragEnd}
                                    dragConstraints={constraintsRef}
                                />
                            )
                    )}
                </div>

                <DropZone
                    squares={squares}
                    allDropped={allDropped}
                    onReset={resetGame}
                    onDragEnd={handleDragEnd}
                    dragConstraints={constraintsRef}
                />
            </div>
        </div>
    )
}
