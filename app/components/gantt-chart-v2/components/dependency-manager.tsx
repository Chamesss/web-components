import { X } from 'lucide-react'
import React from 'react'
import { useGanttStore } from '../store/gantt-store'

export const DependencyManager: React.FC = () => {
    const { tasks, selectedTask, addDependency, removeDependency } =
        useGanttStore()

    if (!selectedTask) return null

    const currentTask = tasks.find((t) => t.id === selectedTask)
    if (!currentTask) return null

    const availableTasks = tasks.filter(
        (t) =>
            t.id !== selectedTask &&
            t.start < currentTask.start &&
            !(currentTask.dependencies || []).includes(t.id)
    )

    const handleAddDependency = (dependencyId: string) => {
        addDependency(selectedTask, dependencyId)
    }

    return (
        <div className="border-t border-gray-200 p-4">
            <h3 className="mb-2 text-sm font-medium text-gray-900">
                Dependencies
            </h3>
            <div className="space-y-2">
                {currentTask.dependencies?.map((depId) => {
                    const depTask = tasks.find((t) => t.id === depId)
                    if (!depTask) return null

                    return (
                        <div
                            key={depId}
                            className="flex items-center justify-between rounded bg-gray-50 p-2"
                        >
                            <span className="text-sm text-gray-600">
                                {depTask.title}
                            </span>
                            <button
                                onClick={() =>
                                    removeDependency(selectedTask, depId)
                                }
                                className="text-gray-400 hover:text-red-500"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )
                })}
            </div>

            {availableTasks.length > 0 && (
                <div className="mt-4">
                    <select
                        className="w-full rounded-md border-gray-300 text-sm shadow-sm"
                        onChange={(e) => handleAddDependency(e.target.value)}
                        value=""
                    >
                        <option value="">Add dependency...</option>
                        {availableTasks.map((task) => (
                            <option key={task.id} value={task.id}>
                                {task.title}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    )
}
