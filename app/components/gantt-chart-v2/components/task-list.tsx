import { format } from 'date-fns'
import React from 'react'
import { useGanttStore } from '../store/gantt-store'

export const TaskList: React.FC = () => {
    const { tasks, selectedTask, setSelectedTask } = useGanttStore()

    return (
        <div className="w-80 overflow-y-auto border-r border-gray-200">
            <div className="border-b border-gray-200 bg-gray-50 p-4">
                <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
            </div>
            <div className="divide-y divide-gray-200">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`flex !h-fit cursor-pointer flex-col justify-center px-4 py-2.5 hover:bg-gray-50 ${
                            selectedTask === task.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedTask(task.id)}
                    >
                        <h3 className="truncate text-nowrap text-sm font-medium text-gray-900">
                            {task.title}
                        </h3>
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                            <span>
                                {format(task.start, 'MMM d')} -{' '}
                                {format(task.end, 'MMM d')}
                            </span>
                            <span className="ml-4 rounded-full bg-amber-100 px-1 text-amber-600">
                                {task.progress}% complete
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
