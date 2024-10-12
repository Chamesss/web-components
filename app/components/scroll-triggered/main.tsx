import { projectsData } from '@/lib/data'
import React from 'react'
import Project from './components/container'

export default function MainScrollOnTrigger() {
    return (
        <>
            {projectsData.map((project, i) => (
                <Project key={i} {...project} />
            ))}
        </>
    )
}
