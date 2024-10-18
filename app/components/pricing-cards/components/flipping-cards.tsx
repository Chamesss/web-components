import { useEffect, useState } from 'react'
import { PriceInfo, priceInfo } from '../helpers/price-info'
import { PriceMode } from '../pricing-cards'
import PaymentModeCard from './payment-mode-card'

export default function FlippingCard({
    isFlipped,
    index,
    offer,
}: {
    isFlipped: PriceMode
    index: number
    offer: keyof PriceInfo
}) {
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setTrigger((prev) => !prev)
        }, index * 125)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFlipped])

    return (
        <div className="flex h-fit items-center justify-center bg-transparent">
            <div
                className={`h-[43rem] w-[18rem] cursor-pointer [perspective:1000px] md:h-[45rem] md:w-[14rem] lg:w-[19.5rem] xl:h-[43rem] xl:w-[22rem]`}
            >
                <div
                    className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
                        trigger === false ? '[transform:rotateY(180deg)]' : ''
                    }`}
                >
                    <div
                        className="absolute flex h-full w-full items-start justify-center rounded-xl bg-white px-5 py-8 shadow-md [backface-visibility:hidden] md:px-5 lg:px-8"
                        style={{
                            borderTop: `4px solid ${priceInfo[offer][0].color}`,
                        }}
                    >
                        <PaymentModeCard plan={priceInfo[offer][0]} />
                    </div>
                    <div
                        className={`absolute flex h-full w-full items-start justify-center rounded-xl bg-white px-5 py-8 shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)] md:px-5 lg:px-8`}
                        style={{
                            borderTop: `4px solid ${priceInfo[offer][1].color}`,
                        }}
                    >
                        <PaymentModeCard plan={priceInfo[offer][1]} />
                    </div>
                </div>
            </div>
        </div>
    )
}
