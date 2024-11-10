import { Group } from '@visx/group'
import { scaleLinear, scaleTime } from '@visx/scale'
import {
    addDays,
    addMonths,
    addWeeks,
    differenceInDays,
    endOfDay,
    endOfMonth,
    endOfWeek,
    format,
    startOfDay,
    startOfMonth,
    startOfWeek,
} from 'date-fns'
import { ChevronLeft, ChevronRight, GripHorizontal } from 'lucide-react'
import React, { useCallback, useRef } from 'react'
import { useGanttStore } from '../store/gantt-store'
import { ViewMode } from '../types'

const CHART_WIDTH = 1000
const CHART_HEIGHT = 400
const TASK_HEIGHT = 30 // Adjusted to match TaskList height
const HEADER_HEIGHT = 60
const TASK_PADDING = 10 // Reduced padding for better alignment
const MIN_TASK_WIDTH = 50 // Minimum width for very short tasks

const getTimeConfig = (viewMode: ViewMode, startDate: Date) => {
    switch (viewMode) {
        case 'day':
            return {
                unit: 'day',
                width: 100,
                format: 'MMM d',
                subFormat: 'EEE',
                start: startOfDay(startDate),
                end: endOfDay(addDays(startDate, 14)),
            }
        case 'week':
            return {
                unit: 'week',
                width: 200,
                format: 'MMM d',
                subFormat: 'yyyy',
                start: startOfWeek(startDate),
                end: endOfWeek(addWeeks(startDate, 8)),
            }
        case 'month':
            return {
                unit: 'month',
                width: 300,
                format: 'MMM yyyy',
                subFormat: 'QQQQ',
                start: startOfMonth(startDate),
                end: endOfMonth(addMonths(startDate, 6)),
            }
    }
}

export const GanttChart: React.FC = () => {
    const { tasks, dragState, viewMode, setDragState, updateTaskDates } =
        useGanttStore()
    const svgRef = useRef<SVGSVGElement>(null)

    const startDate = startOfDay(
        tasks.reduce(
            (min, task) => (task.start < min ? task.start : min),
            tasks[0].start
        )
    )

    const timeConfig = getTimeConfig(viewMode, startDate)
    const totalWidth = CHART_WIDTH

    const timeScale = scaleTime({
        domain: [timeConfig.start, timeConfig.end],
        range: [0, totalWidth],
    })

    const yScale = scaleLinear({
        domain: [0, tasks.length],
        range: [
            TASK_HEIGHT / 2,
            tasks.length * (TASK_HEIGHT + TASK_PADDING * 3),
        ],
    })

    const handleMouseDown = useCallback(
        (
            event: React.MouseEvent,
            taskId: string,
            type: 'move' | 'resize-start' | 'resize-end'
        ) => {
            const task = tasks.find((t) => t.id === taskId)
            if (!task) return

            const svgRect = svgRef.current?.getBoundingClientRect()
            if (!svgRect) return

            const initialX = event.clientX - svgRect.left

            setDragState({
                taskId,
                type,
                initialX,
                initialStart: task.start,
                initialEnd: task.end,
            })

            event.preventDefault()
        },
        [tasks, setDragState]
    )

    const handleMouseMove = useCallback(
        (event: React.MouseEvent) => {
            if (
                !dragState.taskId ||
                !dragState.initialStart ||
                !dragState.initialEnd
            )
                return

            const svgRect = svgRef.current?.getBoundingClientRect()
            if (!svgRect) return

            const currentX = event.clientX - svgRect.left
            const diffX = currentX - dragState.initialX
            const diffDays = Math.round(
                (diffX / totalWidth) *
                    differenceInDays(timeConfig.end, timeConfig.start)
            )

            const task = tasks.find((t) => t.id === dragState.taskId)
            if (!task) return

            let newStart = task.start
            let newEnd = task.end

            if (dragState.type === 'move') {
                newStart = addDays(dragState.initialStart, diffDays)
                newEnd = addDays(dragState.initialEnd, diffDays)
            } else if (dragState.type === 'resize-start') {
                newStart = addDays(dragState.initialStart, diffDays)
            } else if (dragState.type === 'resize-end') {
                newEnd = addDays(dragState.initialEnd, diffDays)
            }

            // Prevent tasks from being moved outside the timeline
            if (newStart < timeConfig.start) {
                const diff = differenceInDays(timeConfig.start, newStart)
                newStart = timeConfig.start
                if (dragState.type === 'move') {
                    newEnd = addDays(newEnd, diff)
                }
            }
            if (newEnd > timeConfig.end) {
                const diff = differenceInDays(newEnd, timeConfig.end)
                newEnd = timeConfig.end
                if (dragState.type === 'move') {
                    newStart = addDays(newStart, -diff)
                }
            }

            if (newStart < newEnd) {
                updateTaskDates(dragState.taskId, newStart, newEnd)
            }
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        [dragState, tasks, updateTaskDates, timeConfig]
    )

    const handleMouseUp = useCallback(() => {
        setDragState({
            taskId: null,
            type: null,
            initialX: 0,
            initialStart: null,
            initialEnd: null,
        })
    }, [setDragState])

    const renderDependencyLines = () => {
        return tasks.map((task) => {
            if (!task.dependencies?.length) return null

            return task.dependencies.map((depId) => {
                const dependentTask = tasks.find((t) => t.id === depId)
                if (!dependentTask) return null

                const startX = timeScale(dependentTask.end)
                const startY =
                    yScale(tasks.indexOf(dependentTask)) +
                    TASK_HEIGHT / 2 +
                    HEADER_HEIGHT
                const endX = timeScale(task.start)
                const endY =
                    yScale(tasks.indexOf(task)) +
                    TASK_HEIGHT / 2 +
                    HEADER_HEIGHT

                // Calculate control points for a straight line with slight curve at ends
                const controlPoint1X = startX + 20
                const controlPoint2X = endX - 20

                const path = `
          M ${startX} ${startY}
          C ${controlPoint1X} ${startY},
            ${controlPoint2X} ${endY},
            ${endX} ${endY}
        `

                return (
                    <g key={`${task.id}-${depId}`}>
                        <path
                            d={path}
                            stroke="#94A3B8"
                            strokeWidth={2}
                            fill="none"
                            markerEnd="url(#arrowhead)"
                            className="transition-all duration-300 ease-in-out"
                        />
                    </g>
                )
            })
        })
    }

    const renderTimeScale = () => {
        const dates: Date[] = []
        let currentDate = timeConfig.start

        while (currentDate <= timeConfig.end) {
            dates.push(currentDate)
            currentDate =
                viewMode === 'day'
                    ? addDays(currentDate, 1)
                    : viewMode === 'week'
                      ? addWeeks(currentDate, 1)
                      : addMonths(currentDate, 1)
        }

        return (
            <g>
                <rect
                    x={0}
                    y={0}
                    width={totalWidth}
                    height={HEADER_HEIGHT}
                    fill="#F8FAFC"
                    className="shadow-sm"
                />
                {dates.map((date, i) => (
                    <g key={i} transform={`translate(${timeScale(date)}, 0)`}>
                        <text
                            x={timeConfig.width / 2}
                            y={25}
                            textAnchor="middle"
                            className="fill-gray-900 text-sm font-medium"
                        >
                            {format(date, timeConfig.format)}
                        </text>
                        <text
                            x={timeConfig.width / 2}
                            y={45}
                            textAnchor="middle"
                            className="fill-gray-500 text-xs"
                        >
                            {format(date, timeConfig.subFormat)}
                        </text>
                        <line
                            x1={0}
                            y1={HEADER_HEIGHT}
                            x2={0}
                            y2={CHART_HEIGHT}
                            stroke={i % 2 === 0 ? '#E2E8F0' : '#F1F5F9'}
                            strokeWidth={1}
                        />
                    </g>
                ))}
            </g>
        )
    }

    const measureTextWidth = (text: string): number => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        if (!context) return 0
        context.font = '0.875rem system-ui'
        return context.measureText(text).width
    }

    return (
        <div className="overflow-x-auto">
            <svg
                ref={svgRef}
                width={totalWidth}
                height={CHART_HEIGHT}
                className="bg-white"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="6"
                        markerHeight="6"
                        refX="6"
                        refY="3"
                        orient="auto"
                        markerUnits="userSpaceOnUse"
                    >
                        <path
                            d="M0,0 L0,6 L6,3 Z"
                            fill="#94A3B8"
                            className="transition-all duration-300 ease-in-out"
                        />
                    </marker>
                    <filter
                        id="taskShadow"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                    >
                        <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                        <feOffset dx="0" dy="1" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.2" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <Group>{renderTimeScale()}</Group>
                {renderDependencyLines()}
                {tasks.map((task, index) => {
                    const rawWidth = timeScale(task.end) - timeScale(task.start)
                    const taskWidth = Math.max(rawWidth, MIN_TASK_WIDTH)
                    const taskX = timeScale(task.start)
                    const taskY = yScale(index) + HEADER_HEIGHT
                    const textWidth = measureTextWidth(task.title) + 24 // Add padding
                    const showTextOutside = taskWidth < textWidth

                    return (
                        <g key={task.id} filter="url(#taskShadow)">
                            <rect
                                x={taskX}
                                y={taskY + TASK_PADDING / 2}
                                width={taskWidth}
                                height={TASK_HEIGHT}
                                fill={task.color || '#60A5FA'}
                                rx={4}
                                className="cursor-move transition-all duration-300 ease-in-out hover:brightness-110"
                                onMouseDown={(e) =>
                                    handleMouseDown(e, task.id, 'move')
                                }
                            />

                            <rect
                                x={taskX}
                                y={taskY + TASK_PADDING / 2}
                                width={taskWidth * (task.progress / 100)}
                                height={TASK_HEIGHT}
                                fill={`${task.color}99` || '#60A5FA99'}
                                rx={4}
                                className="pointer-events-none transition-all duration-300 ease-in-out"
                            />

                            <text
                                x={
                                    showTextOutside
                                        ? taskX + taskWidth + 12
                                        : taskX +
                                          (taskWidth - textWidth) / 2 +
                                          12
                                }
                                y={taskY + TASK_HEIGHT / 2 + TASK_PADDING / 2}
                                className={`text-sm font-medium ${showTextOutside ? 'fill-gray-900' : 'fill-white'} drop-shadow-sm`}
                                dominantBaseline="middle"
                                textAnchor={showTextOutside ? 'start' : 'start'}
                            >
                                {task.title}
                            </text>

                            {/* Only show resize handles if task is wide enough */}
                            {taskWidth > MIN_TASK_WIDTH && (
                                <>
                                    <g
                                        transform={`translate(${taskX + 4}, ${taskY + TASK_HEIGHT / 2 + TASK_PADDING / 2})`}
                                        className="relative cursor-ew-resize bg-red-400 opacity-0 transition-opacity duration-200 hover:opacity-100"
                                        onMouseDown={(e) =>
                                            handleMouseDown(
                                                e,
                                                task.id,
                                                'resize-start'
                                            )
                                        }
                                    >
                                        <circle
                                            r="6"
                                            fill="white"
                                            fillOpacity="0.5"
                                        />
                                        {/* <GripHorizontal className="h-3 w-3 -translate-x-1.5 -translate-y-1.5 transform text-white" /> */}
                                        <g
                                            transform="translate(-4, -4)"
                                            width={2}
                                            height={2}
                                            scale={0.5}
                                            className="-translate-x-[0.4rem] -translate-y-[0.375rem] scale-50 bg-red-200"
                                        >
                                            <ChevronLeft className="text-black" />
                                        </g>
                                    </g>

                                    <g
                                        transform={`translate(${taskX + taskWidth - 4}, ${taskY + TASK_HEIGHT / 2 + TASK_PADDING / 2})`}
                                        className="cursor-ew-resize opacity-0 transition-opacity duration-200 hover:opacity-100"
                                        onMouseDown={(e) =>
                                            handleMouseDown(
                                                e,
                                                task.id,
                                                'resize-end'
                                            )
                                        }
                                    >
                                        <circle
                                            r="6"
                                            fill="white"
                                            fillOpacity="0.5"
                                        />
                                        <g
                                            transform="translate(-4, -4)"
                                            width={2}
                                            height={2}
                                            scale={0.5}
                                            className="-translate-x-[0.4rem] -translate-y-[0.375rem] scale-50 bg-red-200"
                                        >
                                            <ChevronRight className="text-black" />
                                        </g>
                                    </g>
                                </>
                            )}
                        </g>
                    )
                })}
            </svg>
        </div>
    )
}
