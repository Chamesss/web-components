import todoapp from '@/app/assets/Todoapp.jpeg'
import messenger from '@/app/assets/messenger.png'
import screenshot from '@/app/assets/screenshot.png'

export const projectsData = [
    {
        title: 'A To do App',
        description:
            'This is a placeholder description for Project One. It showcases the use of various technologies for learning purposes.',
        tags: ['Tech1', 'Tech2', 'Tech3'],
        imageUrl: todoapp,
        sourceCode: 'https://github.com/your-repo/project-one',
    },
    {
        title: 'Screenshot App',
        description:
            'This is a placeholder description for Project Two. It is designed to be a cross-platform application with unique features.',
        tags: ['Tech4', 'Tech5', 'Tech6'],
        imageUrl: screenshot,
        sourceCode: 'https://github.com/your-repo/project-two',
    },
    {
        title: 'Messenger App',
        description:
            'This is a placeholder description for Project Three. It focuses on backend and frontend integration with a robust architecture.',
        tags: ['Tech7', 'Tech8', 'Tech9'],
        imageUrl: messenger,
        sourceCode: 'https://github.com/your-repo/project-three',
    },
] as const
