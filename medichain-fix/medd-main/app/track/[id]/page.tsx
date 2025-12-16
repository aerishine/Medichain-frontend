'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Truck, Package, CheckCircle, Clock, MapPin, ExternalLink, Factory, Store, User, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useAccount } from 'wagmi'

export default function TrackDrugPage() {
    const params = useParams() as { id: string }
    const id = params.id || 'Unknown'
    const { address } = useAccount()

    // Mock Data based on ID
    // For demo, if user is connected, we pretend they own it 
    const isOwner = !!address

    const history = [
        {
            status: 'MINTED',
            title: 'Manufacturing Complete',
            description: 'Batch #B-2025-001 created and registered on blockchain.',
            location: 'MediPharma Factory, NY',
            date: 'Oct 12, 2025 • 09:42 AM',
            txHash: '0x7a2...3b1',
            icon: Factory,
            color: 'bg-blue-600'
        },
        {
            status: 'TRANSFERRED',
            title: 'Dispatched to Distributor',
            description: 'Handed over to secure logistics provider.',
            location: 'In Transit',
            date: 'Oct 14, 2025 • 02:15 PM',
            txHash: '0x8c9...4d2',
            icon: Truck,
            color: 'bg-orange-500'
        },
        {
            status: 'RECEIVED',
            title: 'Received at Pharmacy',
            description: 'Verified and stocked by licensed pharmacist.',
            location: 'CVS Pharmacy #429, Brooklyn',
            date: 'Oct 16, 2025 • 10:30 AM',
            txHash: '0x9d1...5e3',
            icon: Store,
            color: 'bg-purple-600'
        },
        {
            status: 'DISPENSED',
            title: 'Dispensed to Patient',
            description: 'Product sold and ownership transferred to patient.',
            location: 'CVS Pharmacy #429, Brooklyn',
            date: 'Oct 20, 2025 • 04:45 PM',
            txHash: '0x1e2...6f4',
            icon: User,
            color: 'bg-green-600'
        }
    ]

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-4">
                    {isOwner ? (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full border border-green-200 font-bold animate-in zoom-in">
                            <ShieldCheck className="w-5 h-5" />
                            Authentic – Currently owned by you
                        </div>
                    ) : (
                        <Badge variant="secondary" className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-100">Verified Authentic</Badge>
                    )}

                    <h1 className="text-3xl font-bold text-slate-900">Tracking History</h1>
                    <p className="text-slate-500 font-mono">Drug Code: {id}</p>
                </div>

                {/* Product Info Card */}
                <Card>
                    <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
                        <div className="w-24 h-24 bg-blue-50 rounded-xl flex items-center justify-center">
                            <Package className="w-10 h-10 text-blue-500" />
                        </div>
                        <div className="flex-1 text-center md:text-left space-y-2">
                            <h3 className="text-xl font-bold">Amoxicillin 500mg</h3>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                <div className="text-slate-500">Batch Number:</div>
                                <div className="font-semibold">B-2025-001</div>
                                <div className="text-slate-500">Expiry Date:</div>
                                <div className="font-semibold">Dec 2027</div>
                                <div className="text-slate-500">Manufacturer:</div>
                                <div className="font-semibold text-blue-600">MediPharma Inc.</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Timeline */}
                <div className="relative border-l-2 border-slate-200 ml-6 md:ml-10 space-y-12 pb-12">
                    {history.map((step, index) => {
                        const Icon = step.icon
                        return (
                            <div key={index} className="relative pl-8 md:pl-12">
                                {/* Dot/Icon */}
                                <div className={`absolute -left-[21px] top-0 w-11 h-11 rounded-full border-4 border-slate-50 flex items-center justify-center text-white shadow-sm ${step.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>

                                {/* Content */}
                                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                        <h4 className="text-lg font-bold text-slate-900">{step.title}</h4>
                                        <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">{step.date}</span>
                                    </div>
                                    <p className="text-slate-600 mb-4">{step.description}</p>

                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <MapPin className="w-4 h-4" /> {step.location}
                                        </div>
                                        <a href={`https://etherscan.io/tx/${step.txHash}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors">
                                            View TX <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="text-center">
                    <Link href="/">
                        <Button variant="outline">Scan Another Code</Button>
                    </Link>
                </div>

            </div>
        </div>
    )
}
