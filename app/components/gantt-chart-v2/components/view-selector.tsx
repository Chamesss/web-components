import React from 'react'
import { useGanttStore } from '../store/gantt-store'
import { ViewMode } from '../types'

export const ViewSelector: React.FC = () => {
    const { viewMode, setViewMode } = useGanttStore()

    const views: { label: string; value: ViewMode }[] = [
        { label: 'Day', value: 'day' },
        { label: 'Week', value: 'week' },
        { label: 'Month', value: 'month' },
    ]

    return (
        <div className="flex space-x-2">
            {views.map(({ label, value }) => (
                <button
                    key={value}
                    className={`rounded-md px-3 py-1 text-sm font-medium ${
                        viewMode === value
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setViewMode(value)}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}
