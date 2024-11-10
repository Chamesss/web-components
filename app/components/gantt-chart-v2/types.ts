export interface Task {
    id: string
    title: string
    start: Date
    end: Date
    progress: number
    dependencies?: string[]
    color?: string
    description?: string
}

export interface DragState {
    taskId: string | null
    type: 'move' | 'resize-start' | 'resize-end' | null
    initialX: number
    initialStart: Date | null
    initialEnd: Date | null
}

export type ViewMode = 'day' | 'week' | 'month'

export interface GanttState {
    tasks: Task[]
    dragState: DragState
    viewMode: ViewMode
    selectedTask: string | null
}
