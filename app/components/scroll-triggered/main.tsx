import { projectsData } from '@/lib/data'
import React from 'react'
import Project from './components/container'

export default function MainScrollOnTrigger() {
    return (
        <div>
            <h1 className="my-8 w-full text-center text-4xl font-semibold">
                Resize On Scroll
            </h1>
            {projectsData.map((project, i) => (
                <Project key={i} {...project} />
            ))}
        </div>
    )
}
