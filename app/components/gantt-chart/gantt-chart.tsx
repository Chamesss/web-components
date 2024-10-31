'use client'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { ChevronLeft, ChevronRight, GripVertical } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

type Task = {
    id: number
    _id: string
    name: string
    start: Date
    end: Date
    type: string
    progress: number
    styles: {
        progressColor: string
        progressSelectedColor: string
    }
}

const initialTasks: Task[] = [
    {
        id: 1,
        _id: '1',
        name: 'Task 1',
        start: new Date(2024, 10, 10),
        end: new Date(2024, 10, 20),
        type: 'task',
        progress: 0.5,
        styles: {
            progressColor: '#f59e0b',
            progressSelectedColor: '#f59e0ba9',
        },
    },
    {
        id: 2,
        _id: '2',
        name: 'Task 2',
        start: new Date(2024, 10, 23),
        end: new Date(2024, 10, 27),
        type: 'task',
        progress: 0.5,
        styles: {
            progressColor: '#10b981',
            progressSelectedColor: '#10b981a9',
        },
    },
    {
        id: 3,
        _id: '3',
        name: 'Task 3',
        start: new Date(2024, 10, 25),
        end: new Date(2024, 10, 30),
        type: 'task',
        progress: 0.5,
        styles: {
            progressColor: '#ef4444',
            progressSelectedColor: '#ef4444a9',
        },
    },
    {
        id: 4,
        _id: '4',
        name: 'Task 4',
        start: new Date(2024, 10, 27),
        end: new Date(2024, 11, 1),
        type: 'task',
        progress: 0.5,
        styles: {
            progressColor: '#0ea5e9',
            progressSelectedColor: '#0ea5e9a9',
        },
    },
    {
        id: 5,
        _id: '5',
        name: 'Task 5',
        start: new Date(2024, 10, 29),
        end: new Date(2024, 11, 3),
        type: 'task',
        progress: 0.5,
        styles: {
            progressColor: '#a855f7',
            progressSelectedColor: '#a855f7a9',
        },
    },
]

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export default function MonthlyGranttChart() {
    const currentDate = new Date()
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
    const [dragging, setDragging] = useState<{
        id: number
        type: 'move' | 'resize'
        startX: number
        originalStart: Date
        originalEnd: Date
    } | null>(null)
    const chartRef = useRef<HTMLDivElement>(null)

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    const rowRef = useRef<HTMLDivElement>(null)
    const [dayWidth, setDayWidth] = useState(0)

    const calculateWidth = useCallback(() => {
        if (rowRef.current) {
            const parentWidth = rowRef.current.offsetWidth // Get the width of the parent
            const calculatedWidth = parentWidth / daysInMonth // Calculate width per day
            setDayWidth(calculatedWidth) // Set the calculated width in state
        }
    }, [daysInMonth])

    useEffect(() => {
        calculateWidth() // Initial width calculation
        window.addEventListener('resize', calculateWidth)
        setTimeout(() => {
            calculateWidth()
        }, 5)
        return () => {
            window.removeEventListener('resize', calculateWidth) // Clean up event listener on unmount
        }
    }, [daysInMonth, calculateWidth])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (dragging && chartRef.current) {
                const chartRect = chartRef.current.getBoundingClientRect()
                const mouseX = e.clientX - chartRect.left
                const daysMoved = Math.round(
                    (mouseX - dragging.startX) / dayWidth
                )

                setTasks((prevTasks) =>
                    prevTasks.map((task) => {
                        if (task.id === dragging.id) {
                            const newStart = new Date(dragging.originalStart)
                            newStart.setDate(newStart.getDate() + daysMoved)

                            if (dragging.type === 'move') {
                                const duration =
                                    task.end.getTime() - task.start.getTime()
                                const newEnd = new Date(
                                    newStart.getTime() + duration
                                )
                                return { ...task, start: newStart, end: newEnd }
                            } else if (dragging.type === 'resize') {
                                const newEnd = new Date(dragging.originalEnd)
                                newEnd.setDate(newEnd.getDate() + daysMoved)
                                if (newEnd < task.start) return { ...task }
                                return { ...task, end: newEnd }
                            }
                        }
                        return task
                    })
                )
            }
        }

        const handleMouseUp = () => {
            setDragging(null)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [dragging, dayWidth])

    const handleMouseDown = (
        id: number,
        type: 'move' | 'resize',
        e: React.MouseEvent
    ) => {
        const task = tasks.find((t) => t.id === id)
        if (task && chartRef.current) {
            const chartRect = chartRef.current.getBoundingClientRect()
            setDragging({
                id,
                type,
                startX: e.clientX - chartRect.left,
                originalStart: task.start,
                originalEnd: task.end,
            })
        }
    }

    const getTaskDisplay = (task: Task) => {
        const monthStart = new Date(currentYear, currentMonth, 1)
        const monthEnd = new Date(currentYear, currentMonth + 1, 0)

        if (task.end < monthStart || task.start > monthEnd) return null

        const taskStart = Math.max(
            0,
            (task.start.getTime() - monthStart.getTime()) /
                (1000 * 60 * 60 * 24)
        )
        const taskEnd = Math.min(
            daysInMonth,
            Math.ceil(
                (task.end.getTime() - monthStart.getTime()) /
                    (1000 * 60 * 60 * 24)
            ) + 1
        )
        const width = taskEnd - taskStart
        const totalWidth =
            Math.ceil(
                (task.end.getTime() - task.start.getTime()) /
                    (1000 * 60 * 60 * 24)
            ) + 1

        if (width <= 0) return null

        let ColorWidth = 0

        if (width === totalWidth) {
            ColorWidth = width / 2
        } else if (task.start.getTime() > monthStart.getTime()) {
            if (width < totalWidth && width >= totalWidth / 2) {
                ColorWidth = totalWidth / 2
            } else if (width < totalWidth && width < totalWidth / 2) {
                ColorWidth = width
            }
        } else if (task.start.getTime() <= monthStart.getTime()) {
            if (task.end.getTime() < monthEnd.getTime()) {
                const calculateWidth = width - totalWidth / 2
                if (calculateWidth > 0) {
                    ColorWidth = calculateWidth
                }
            } else {
                const start = Math.abs(
                    (task.start.getTime() - monthStart.getTime()) /
                        (1000 * 60 * 60 * 24)
                )
                ColorWidth = totalWidth / 2 - start
            }
        }

        return (
            <div
                className={`absolute top-1/2 flex -translate-y-1/2 cursor-move items-center justify-between overflow-hidden rounded`}
                style={{
                    left: `${taskStart * dayWidth}px`,
                    width: `${width * dayWidth}px`,
                    height: '65%',
                    backgroundColor: task.styles.progressSelectedColor,
                }}
                onMouseDown={(e) => handleMouseDown(task.id, 'move', e)}
                aria-label={`Move ${task.name}`}
            >
                {ColorWidth > 0 && (
                    <div
                        className={`absolute top-1/2 z-[2] flex h-full -translate-y-1/2 items-center justify-center`}
                        style={{
                            width: `${ColorWidth * dayWidth}px`,
                            backgroundColor: task.styles.progressSelectedColor,
                        }}
                    >
                        {ColorWidth > 1 && (
                            <span className="flex-grow text-center text-xs font-medium text-white">
                                {Math.ceil(
                                    (task.end.getTime() -
                                        task.start.getTime()) /
                                        (1000 * 60 * 60 * 24)
                                ) +
                                    1 >
                                1 ? (
                                    <span className="text-nowrap">
                                        {Math.ceil(
                                            (task.end.getTime() -
                                                task.start.getTime()) /
                                                (1000 * 60 * 60 * 24)
                                        ) + 1}{' '}
                                        {ColorWidth >= 2 && 'Days'}
                                    </span>
                                ) : (
                                    <span className="text-nowrap">
                                        {Math.ceil(
                                            (task.end.getTime() -
                                                task.start.getTime()) /
                                                (1000 * 60 * 60 * 24)
                                        ) + 1}{' '}
                                        {ColorWidth >= 2 && 'Day'}
                                    </span>
                                )}
                            </span>
                        )}
                    </div>
                )}
                <div className="z-[3] flex h-full items-center pl-0.5 pr-0">
                    <GripVertical className="!h-6 w-3 text-white opacity-75" />
                </div>

                {task.end.getTime() <= monthEnd.getTime() && (
                    <div
                        className="z-[3] flex h-full w-4 cursor-e-resize items-center justify-center hover:bg-black hover:bg-opacity-10"
                        onMouseDown={(e) => {
                            e.stopPropagation()
                            handleMouseDown(task.id, 'resize', e)
                        }}
                        aria-label={`Resize ${task.name}`}
                    >
                        <ChevronRight className="h-4 w-4 text-white" />
                    </div>
                )}
            </div>
        )
    }

    const changeMonth = (increment: number) => {
        setCurrentMonth((prevMonth) => {
            let newMonth = prevMonth + increment
            let newYear = currentYear

            if (newMonth > 11) {
                newMonth = 0
                newYear++
            } else if (newMonth < 0) {
                newMonth = 11
                newYear--
            }

            setCurrentYear(newYear)
            return newMonth
        })
    }

    return (
        <Card className="flex h-full w-full flex-1 flex-col overflow-auto pb-4 pt-6">
            <CardContent className="flex h-fit flex-1 flex-col !py-0">
                <div className="mb-4 flex items-center justify-between">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => changeMonth(-1)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold">
                        {months[currentMonth]} {currentYear}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => changeMonth(1)}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                <div
                    className="flex w-full min-w-[600px] flex-1 flex-col overflow-auto"
                    ref={chartRef}
                >
                    <div className="h-full overflow-auto">
                        <div className="flex w-full py-1">
                            <p className="w-[8.25rem] shrink-0 truncate text-nowrap"></p>
                            <div className="flex w-full">
                                {Array.from({ length: daysInMonth }, (_, i) => (
                                    <div
                                        key={i}
                                        className="flex w-full items-center justify-center bg-transparent p-0.5 text-center text-sm"
                                    >
                                        <span className="h-full w-full rounded-lg bg-neutral-100 p-0.5 text-black">
                                            {i + 1}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative w-full">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="relative z-[1] flex h-[2.5rem] items-center"
                                >
                                    <div
                                        className={`flex h-full shrink-0 items-center justify-center text-nowrap bg-white pl-1 pr-2 ${
                                            task.id === tasks.length
                                                ? ''
                                                : 'border-t border-gray-200'
                                        }`}
                                    >
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger className="w-full truncate">
                                                    <p className="w-[7.5rem] truncate text-start text-sm font-medium hover:underline">
                                                        {task.name}
                                                    </p>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="max-w-[8rem] text-wrap text-sm font-medium">
                                                        {task.name}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <div
                                        ref={rowRef}
                                        className="relative h-full flex-1"
                                    >
                                        <div
                                            className={`absolute left-0 top-0 z-[0] grid h-full`}
                                            style={{
                                                gridTemplateColumns: `repeat(${daysInMonth}, ${dayWidth}px)`,
                                            }}
                                            aria-hidden="true"
                                        >
                                            {Array.from({
                                                length: daysInMonth,
                                            }).map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`border-t w-[${dayWidth}px] ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                                />
                                            ))}
                                        </div>
                                        {getTaskDisplay(task)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
