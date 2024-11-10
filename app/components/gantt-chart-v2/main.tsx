'use client'
import React, { useEffect } from 'react'
import { DependencyManager } from './components/dependency-manager'
import { GanttChart } from './components/gantt-chart'
import { TaskList } from './components/task-list'
import { ViewSelector } from './components/view-selector'

export default function Gantt() {
    const [docEnv, setDocEnv] = React.useState(false)

    useEffect(() => {
        if (typeof document !== 'undefined') {
            setDocEnv(true)
        }
    }, [])

    return (
        <div className="h-fit rounded-xl bg-gray-50">
            <h1 className="mt-8 w-full text-center text-4xl font-semibold">
                Gantt Chart
            </h1>
            <div className="mx-auto max-w-[1400px] overflow-x-auto p-8">
                <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Project Timeline
                        </h1>
                        <ViewSelector />
                    </div>
                    <div className="flex">
                        <div className="flex min-w-[320px] flex-col">
                            <TaskList />
                            <DependencyManager />
                        </div>
                        <div className="flex-1 overflow-x-auto border-l border-gray-200">
                            {docEnv && <GanttChart />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
