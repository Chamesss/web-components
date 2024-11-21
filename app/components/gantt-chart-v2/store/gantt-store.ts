import { addDays, subDays } from 'date-fns'
import { create } from 'zustand'
import { DragState, GanttState, Task, ViewMode } from '../types'

const initialTasks: Task[] = [
    {
        id: '1',
        title: 'Project Planning',
        description: 'Initial project planning and scope definition',
        start: subDays(new Date(), 3),
        end: addDays(new Date(), 2),
        progress: 60,
        color: '#60A5FA',
    },
    {
        id: '2',
        title: 'Design Phase',
        description: 'UI/UX design and prototyping',
        start: addDays(new Date(), 3),
        end: addDays(new Date(), 7),
        progress: 30,
        dependencies: ['1'],
        color: '#34D399',
    },
    {
        id: '3',
        title: 'Development',
        description: 'Core development phase',
        start: addDays(new Date(), 8),
        end: addDays(new Date(), 15),
        progress: 0,
        dependencies: ['2'],
        color: '#F87171',
    },
]

export const useGanttStore = create<
    GanttState & {
        setDragState: (state: DragState) => void
        updateTaskDates: (taskId: string, start: Date, end: Date) => void
        updateTaskProgress: (taskId: string, progress: number) => void
        //addTask: (task) => void
        setViewMode: (mode: ViewMode) => void
        setSelectedTask: (taskId: string | null) => void
        addDependency: (taskId: string, dependencyId: string) => void
        removeDependency: (taskId: string, dependencyId: string) => void
    }
>((set) => ({
    tasks: initialTasks,
    dragState: {
        taskId: null,
        type: null,
        initialX: 0,
        initialStart: null,
        initialEnd: null,
    },
    viewMode: 'week',
    selectedTask: null,
    setDragState: (state) => set({ dragState: state }),
    updateTaskDates: (taskId, start, end) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId ? { ...task, start, end } : task
            ),
        })),
    updateTaskProgress: (taskId, progress) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId ? { ...task, progress } : task
            ),
        })),
    setViewMode: (mode) => set({ viewMode: mode }),
    setSelectedTask: (taskId) => set({ selectedTask: taskId }),
    addDependency: (taskId, dependencyId) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          dependencies: [
                              ...(task.dependencies || []),
                              dependencyId,
                          ],
                      }
                    : task
            ),
        })),
    removeDependency: (taskId, dependencyId) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          dependencies: (task.dependencies || []).filter(
                              (id) => id !== dependencyId
                          ),
                      }
                    : task
            ),
        })),
}))
