'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'
import FlippingCard from './components/flipping-cards'
import { PriceInfo, priceInfo } from './helpers/price-info'

export type PriceMode = 'monthly' | 'yearly'

export default function PricingCards() {
    const [isFlipped, setIsFlipped] = useState<PriceMode>('monthly')
    return (
        <div className="flex flex-col items-center">
            <Tabs
                onValueChange={(e: string) => setIsFlipped(e as PriceMode)}
                defaultValue="monthly"
                className="flex w-[400px] justify-center"
            >
                <TabsList className="mx-auto bg-neutral-900">
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="mt-[2rem] flex h-fit w-fit flex-col gap-[2.5rem] p-1 md:mt-[4rem] md:flex-row md:gap-[1.5rem]">
                {(Object.keys(priceInfo) as Array<keyof PriceInfo>).map(
                    (offer, i) => (
                        <FlippingCard
                            key={i}
                            isFlipped={isFlipped}
                            index={i}
                            offer={offer}
                        />
                    )
                )}
            </div>
        </div>
    )
}
