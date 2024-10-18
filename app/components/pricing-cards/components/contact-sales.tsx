import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, DollarSign } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export default function ContactSales({
    isOpen,
    setIsOpen,
    span,
    mode,
}: {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    span: 'year' | 'month'
    mode: 'Standard' | 'Premium'
}) {
    const [loading, setLoading] = useState(false)
    const [firstname, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [company, setCompany] = useState('')
    const [role, setRole] = useState('')
    const [seats, setSeats] = useState(1)
    const [total, setTotal] = useState(() => {
        const yearlyRate =
            mode === 'Standard' ? 70 : mode === 'Premium' ? 100 : 0
        const monthlyRate =
            mode === 'Standard' ? 7 : mode === 'Premium' ? 10 : 0

        return span === 'year' ? yearlyRate : monthlyRate
    })
    const [message, setMessage] = useState('')

    useEffect(() => {
        const yearlyRate = mode === 'Standard' ? 70 : 100
        const monthlyRate = mode === 'Standard' ? 7 : 10

        setTotal(span === 'year' ? yearlyRate * seats : monthlyRate * seats)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seats])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('firstName', firstname)
            formData.append('lastName', lastName)
            formData.append('email', email)
            formData.append('phone', phone)
            formData.append('company', company)
            formData.append('role', role)
            formData.append('number_seats', seats.toString())
            formData.append('plan', mode)
            formData.append('total', total.toString())
            formData.append('message', message)
            setTimeout(() => {
                toast.success('Your message has been sent successfully!')
                setIsOpen(false)
                //reset values
                setFirstName('')
                setLastName('')
                setEmail('')
                setPhone('')
                setCompany('')
                setRole('')
                setSeats(1)
                setLoading(false)
            }, 2000)
        } catch (error) {
            toast.error(
                'An error occurred while sending your message. Please try again.'
            )
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-h-[95vh] overflow-auto sm:max-w-[600px] md:max-w-[800px]">
                <div className="absolute left-1/2 top-0 h-[1rem] w-full -translate-x-1/2 rounded-t-lg bg-gradient-to-r from-violet-500 via-blue-400 to-pink-400" />
                <DialogHeader className="mt-4">
                    <DialogTitle className="text-center text-2xl font-bold">
                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Contact Our Sales Team
                        </span>
                    </DialogTitle>
                    <DialogDescription className="text-center text-base text-gray-600">
                        Let&apos;s discuss how we can help your business grow
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                    className="mt-4 space-y-6 lg:px-10"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">
                                First Name
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                value={firstname}
                                onChange={(e) => setFirstName(e.target.value)}
                                id="name"
                                placeholder="Firstname"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">
                                Last Name<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                id="lastName"
                                placeholder="Lastname"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="col-span-1 space-y-2">
                            <Label htmlFor="firstName">
                                Email<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="firstName"
                                placeholder="example@mail.com"
                                required
                            />
                        </div>
                        <div className="col-span-1 space-y-2">
                            <Label htmlFor="lastName">
                                Phone Number
                                <span className="text-red-500">*</span>
                            </Label>
                            <PhoneInput
                                international
                                defaultCountry="TN"
                                value={phone}
                                onChange={(e) => e && setPhone(e)}
                                className="h-[2.25rem] w-full rounded-md border border-input p-2 focus:outline-black"
                                numberInputProps={{
                                    className:
                                        'h-[2.1rem] mt-[1px] focus:!outline-none focus:!ring-none !border-none border-r-transparent border-l-transparent outline-none',
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="col-span-1 space-y-2">
                            <Label htmlFor="company">
                                Company Name
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                id="company"
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div className="col-span-1 space-y-2">
                            <Label htmlFor="role">
                                Role<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                id="role"
                                placeholder="Example: CEO"
                                required
                            />
                        </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="plan type">Plan Type</Label>
                            <Badge
                                variant="secondary"
                                className="relative h-[2.5rem] w-[90%] rounded-md bg-gradient-to-r from-purple-600/70 via-blue-400/70 to-pink-500/70 text-center text-base text-white"
                            >
                                <div className="animate-glow absolute bottom-0 left-0 right-0 top-0 -z-[0] m-auto h-[2rem] w-full rounded-full bg-gradient-to-r from-violet-700/70 via-blue-700/70 to-pink-700/70 opacity-100 blur-xl" />

                                <span className="z-[1] mx-auto">{mode}</span>
                            </Badge>
                        </div>
                        <div className="col-span-1 space-y-2">
                            <Label htmlFor="seats">
                                Number of Seats
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="seats"
                                type="number"
                                value={seats.toString()}
                                min={1}
                                max={999}
                                placeholder="min: 1"
                                className="max-w-[7.5rem]"
                                required
                                onChange={(e) =>
                                    parseInt(e.target.value) < 1 ||
                                    !e.target.value
                                        ? setSeats(1)
                                        : setSeats(parseInt(e.target.value))
                                }
                            />
                        </div>
                        <div className="flex items-end justify-end self-end">
                            <Card>
                                <CardContent className="flex items-center justify-between gap-3 p-4">
                                    <span className="text-lg font-semibold">
                                        Total:
                                    </span>
                                    <Badge
                                        variant="secondary"
                                        className="bg-emerald-500/10 text-lg text-emerald-500"
                                    >
                                        <DollarSign className="mr-1 h-4 w-4" />
                                        {total}
                                    </Badge>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="message">
                            Message
                            <small className="ml-2 font-thin italic opacity-70">
                                optional
                            </small>
                        </Label>
                        <Textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell us about your specific needs..."
                            className="h-32 resize-none"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white transition-all hover:from-purple-700 hover:to-indigo-700"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="mr-2 h-5 w-5 animate-spin"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center">
                                <CheckCircle className="mr-2 h-5 w-5" />
                                Send Message
                            </span>
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
