import { cn } from '@/lib/utils'
import { ArrowRight, Ban, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import CheckBox from '../assets/check-box'
import { Plan } from '../helpers/price-info'
import ContactSales from './contact-sales'

export default function PaymentModeCard({ plan }: { plan: Plan }) {
    const [isOpenContactSales, setIsOpenContactSales] = useState(false)
    const CardIcon = plan.icon

    const handleClickStart = () => {
        if (plan.title === 'Premium' || plan.title === 'Standard') {
            setIsOpenContactSales(true)
        }
    }

    return (
        <>
            {plan.title === 'Premium' && (
                <span
                    className="absolute -top-[4.8%] rounded-t-xl px-2 py-[0.2rem] font-semibold text-white md:-top-[4.5%]"
                    style={{ backgroundColor: `${plan.color}` }}
                >
                    Recommended
                </span>
            )}
            <div className="flex w-full flex-col">
                <div className="flex w-full flex-row items-center justify-between">
                    <CardIcon
                        className="h-[3.5rem] w-[3.5rem] rounded-md p-1.5 md:h-[3rem] md:w-[3rem] md:p-2 lg:h-[4rem] lg:w-[4rem]"
                        style={{
                            backgroundColor: `${plan.color}1A`,
                        }}
                    />
                    <div className="flex flex-row items-end">
                        <span
                            className="text-2xl font-bold md:text-2xl"
                            style={{ color: `${plan.color}` }}
                        >
                            {plan.price !== 'FREE' && '$'}
                            {plan.price}
                        </span>
                        <p className="!mb-0">{plan.duration}</p>
                    </div>
                </div>
                <div className="my-4 space-y-3 md:my-5 md:space-y-4">
                    <p className="text-2xl font-semibold opacity-90 md:text-2xl">
                        {plan.title}
                    </p>
                    <p className="md:h-[3.75rem] md:text-sm lg:text-base">
                        {plan.description}
                    </p>
                </div>
                <button
                    className={cn(
                        'mx-auto flex w-fit flex-row items-center rounded-xl border-[1px] border-[#0B63E5] px-3 py-2 text-lg font-semibold text-[#0B63E5] transition-all hover:-translate-y-[0.1rem] hover:shadow-lg md:text-base',
                        {
                            '!text-white': plan.title === 'Premium',
                        }
                    )}
                    style={{
                        backgroundColor:
                            plan.title === 'Premium' ? plan.color : 'white',
                    }}
                    onClick={handleClickStart}
                >
                    {plan.title === 'Premium' || plan.title === 'Standard'
                        ? 'Contact Sales'
                        : 'Get Started'}{' '}
                    <ArrowRight size={24} className="ml-4 mt-0.5" />
                </button>
                <hr className="my-3 md:my-4 md:mt-8" />
                <div className="flex flex-col gap-0">
                    {plan.properties.map((feature, index) => (
                        <div
                            key={index}
                            className={cn(
                                'my-1.5 flex flex-row items-center justify-start gap-3',
                                {
                                    'line-through opacity-40':
                                        feature.availability === false,
                                }
                            )}
                        >
                            {feature.availability === false ? (
                                <div className="relative min-h-5 min-w-5 rounded-full bg-gray-200">
                                    <Ban
                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                        width={14}
                                        height={14}
                                    />
                                </div>
                            ) : (
                                <>
                                    {feature.limited === true ? (
                                        <div className="relative min-h-5 min-w-5 rounded-full bg-amber-100">
                                            <TriangleAlert
                                                className="absolute left-1/2 top-0 -translate-x-1/2 translate-y-[0.15rem] text-amber-600"
                                                width={14}
                                                height={14}
                                            />
                                        </div>
                                    ) : (
                                        <div className="min-h-5 min-w-5 rounded-full">
                                            <CheckBox width={20} height={20} />
                                        </div>
                                    )}
                                </>
                            )}
                            <p className="text-wrap text-sm md:text-xs lg:text-sm">
                                {feature.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <ContactSales
                isOpen={isOpenContactSales}
                setIsOpen={setIsOpenContactSales}
                span={plan.span as 'year' | 'month'}
                mode={plan.title as 'Standard' | 'Premium'}
            />
        </>
    )
}
