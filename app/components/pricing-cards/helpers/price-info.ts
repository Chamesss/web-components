import Free from '../assets/free'
import PremiumIconPackage from '../assets/premium'
import StandardIconPackage from '../assets/standard'

interface Property {
    title: string
    availability: boolean
    limited?: boolean
}

export interface Plan {
    price: string
    duration: string
    span: string
    icon: React.FC<React.SVGProps<SVGSVGElement>>
    title: string
    color: string
    description: string
    link: string
    properties: Property[]
}

interface Properties {
    standard: Property[]
    premium: Property[]
    free: Property[]
}

export interface PriceInfo {
    standard: Plan[]
    premium: Plan[]
    free: Plan[]
}

const properties: Properties = {
    free: [
        {
            title: 'Time tracking',
            availability: true,
        },
        {
            title: 'Activity levels',
            availability: true,
        },
        {
            title: 'Chat',
            availability: true,
        },
        {
            title: 'Holiday & meeting booking system',
            availability: true,
        },
        {
            title: 'Limited screenshots',
            availability: true,
            limited: true,
        },
        {
            title: 'Limited app & URL tracking',
            availability: true,
            limited: true,
        },

        {
            title: 'Limited reports',
            availability: true,
            limited: true,
        },
        {
            title: 'Limited department creation',
            availability: true,
            limited: true,
        },
        {
            title: 'Limited project generation with AI',
            availability: true,
            limited: true,
        },
        {
            title: '24/7 Customer support',
            availability: false,
        },
    ],

    premium: [
        {
            title: 'Time tracking',
            availability: true,
        },
        {
            title: 'Activity levels',
            availability: true,
        },
        {
            title: 'Unlimited screenshots',
            availability: true,
        },
        {
            title: 'Unlimited app & URL tracking',
            availability: true,
        },
        {
            title: 'Chat',
            availability: true,
        },
        {
            title: 'Holiday & meeting booking system',
            availability: true,
        },
        {
            title: 'Unlimited reports',
            availability: true,
            limited: false,
        },
        {
            title: 'Unlimited department creation',
            availability: true,
            limited: false,
        },
        {
            title: 'Unlimited project generation with AI',
            availability: true,
            limited: false,
        },
        {
            title: '24/7 Customer support',
            availability: true,
        },
    ],
    standard: [
        {
            title: 'Time tracking',
            availability: true,
        },
        {
            title: 'Activity levels',
            availability: true,
        },
        {
            title: 'Unlimited screenshots',
            availability: true,
        },
        {
            title: 'Unlimited app & URL tracking',
            availability: true,
        },
        {
            title: 'Chat',
            availability: true,
        },
        {
            title: 'Holiday & meeting booking system',
            availability: true,
        },
        {
            title: '24/7 Customer support',
            availability: true,
        },
        {
            title: 'Limited reports',
            availability: true,
            limited: true,
        },
        {
            title: 'Limited department creation',
            availability: true,
            limited: true,
        },
        {
            title: 'Limited project generation with AI',
            availability: true,
            limited: true,
        },
    ],
}

export const priceInfo: PriceInfo = {
    free: [
        {
            price: 'FREE',
            duration: '',
            span: 'year',
            icon: Free,
            title: 'Free',
            color: '#E54545',
            description:
                'Sign up for a 7-day free trial, including the ability to create up to 2 seats.',
            link: '#',
            properties: properties.free,
        },
        {
            price: 'FREE',
            duration: '',
            span: 'month',
            icon: Free,
            title: 'Free',
            color: '#E54545',
            description:
                'Sign up for a 7-day free trial, including the ability to create up to 2 seats.',
            link: '#',
            properties: properties.free,
        },
    ],
    standard: [
        {
            price: '70',
            duration: '/Per user',
            span: 'year',
            icon: StandardIconPackage,
            title: 'Standard',
            color: '#F249C8',
            description:
                'Affordable plan with essential features and limited benefits.',
            link: '#',
            properties: properties.standard,
        },
        {
            price: '7',
            duration: '/Per user',
            span: 'month',
            icon: StandardIconPackage,
            title: 'Standard',
            color: '#F249C8',
            description:
                'Affordable plan with essential features and limited benefits.',
            link: '#',
            properties: properties.standard,
        },
    ],
    premium: [
        {
            price: '100',
            span: 'year',
            duration: '/Per user',
            icon: PremiumIconPackage,
            title: 'Premium',
            color: '#0B63E5',
            description:
                'Advanced plan with exclusive benefits for enhanced experience.',
            link: '#',
            properties: properties.premium,
        },
        {
            price: '10',
            span: 'month',
            duration: '/Per user',
            icon: PremiumIconPackage,
            title: 'Premium',
            color: '#0B63E5',
            description:
                'Advanced plan with exclusive benefits for enhanced experience.',
            link: '#',
            properties: properties.premium,
        },
    ],
}
