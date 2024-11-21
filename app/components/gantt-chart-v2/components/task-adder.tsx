import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { addDays, format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarIcon, PlusCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useGanttStore } from '../store/gantt-store'

export default function TaskAdder() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [name, setName] = useState('')
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 1),
    })
    const { addTask } = useGanttStore()

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'auto'
        }
        return () => {
            document.body.style.overflowY = 'auto'
        }
    }, [isModalOpen])

    function handleAddTask() {
        addTask({
            id: Math.random().toString(36).substr(2, 9),
            title: 'New Task',
            start: date?.from || new Date(),
            end: date?.to || addDays(new Date(), 1),
            progress: 0,
        })
        setIsModalOpen(false)
    }

    return (
        <div>
            <div
                onClick={() => setIsModalOpen(true)}
                className="group cursor-pointer rounded-sm p-1 transition-all hover:bg-black/50"
            >
                <PlusCircle className="text-gray-600 transition-all group-hover:text-white" />
            </div>
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-h-[90vh] w-full max-w-lg overflow-auto rounded-lg bg-white p-6 shadow-xl"
                        >
                            <div className="flex items-center justify-between">
                                <h1 className="text-lg font-semibold text-gray-900">
                                    Add Task
                                </h1>
                                <div
                                    onClick={() => setIsModalOpen(false)}
                                    className="cursor-pointer rounded-full p-1 transition-all hover:bg-gray-100"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm5 10a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1 0-1.5h7.5a.75.75 0 0 1 .75.75z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Input
                                    type="text"
                                    placeholder="Task Name"
                                    className="w-full rounded-lg border border-gray-200 p-2"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mt-4 grid gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={'outline'}
                                            className={cn(
                                                'w-full justify-start text-left font-normal',
                                                !date && 'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarIcon />
                                            {date?.from ? (
                                                date.to ? (
                                                    <>
                                                        {format(
                                                            date.from,
                                                            'LLL dd, y'
                                                        )}{' '}
                                                        -{' '}
                                                        {format(
                                                            date.to,
                                                            'LLL dd, y'
                                                        )}
                                                    </>
                                                ) : (
                                                    format(
                                                        date.from,
                                                        'LLL dd, y'
                                                    )
                                                )
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={date?.from}
                                            selected={date}
                                            onSelect={setDate}
                                            numberOfMonths={2}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={handleAddTask}
                                    className="w-full rounded-lg bg-blue-500 py-2 text-white"
                                >
                                    Add Task
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
