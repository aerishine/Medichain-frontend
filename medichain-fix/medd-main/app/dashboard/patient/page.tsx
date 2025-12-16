'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Package, Calendar, Activity, Heart, ShieldCheck, QrCode, User, Pill } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'

export default function PatientDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Health Wallet</h1>
                    <p className="text-slate-500">Access your medical history and verified medicines.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-600 text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Wallet Connected: 0x71...88a
                </div>
            </div>

            {/* Top Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                    title="My Medicines"
                    value="3"
                    icon={Pill}
                    trend="Active Treatments"
                />
                <StatCard
                    title="Prescriptions"
                    value="12"
                    icon={Package}
                    trend="Lifetime Total"
                    iconColor="text-blue-600"
                />
                <StatCard
                    title="Last Visit"
                    value="14d"
                    icon={Calendar}
                    trend="Dr. Mitchell"
                    iconColor="text-orange-600"
                />
                <StatCard
                    title="Health Score"
                    value="92"
                    icon={Heart}
                    trend="Excellent"
                    iconColor="text-red-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="medicines" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="medicines">My Medicines (NFTs)</TabsTrigger>
                            <TabsTrigger value="history">Visit History</TabsTrigger>
                        </TabsList>

                        <TabsContent value="medicines">
                            <div className="space-y-4">
                                <MedicineNFTCard
                                    name="Amoxicillin 500mg"
                                    type="Antibiotic"
                                    batch="BATCH-2023-001"
                                    expiry="Exp: 10/2026"
                                    image="💊"
                                />
                                <MedicineNFTCard
                                    name="Ibuprofen 400mg"
                                    type="Pain Relief"
                                    batch="BATCH-2023-004"
                                    expiry="Exp: 12/2025"
                                    image="💊"
                                />
                                <MedicineNFTCard
                                    name="Paracetamol 500mg"
                                    type="Analgesic"
                                    batch="BATCH-2023-012"
                                    expiry="Exp: 08/2025"
                                    image="💊"
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="history">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Medical History</CardTitle>
                                    <CardDescription>Record of doctor visits and diagnoses.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-8">
                                        {[1, 2].map((i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                        <User className="w-5 h-5" />
                                                    </div>
                                                    <div className="w-0.5 h-full bg-slate-100 my-2"></div>
                                                </div>
                                                <div className="pb-8">
                                                    <p className="text-sm text-slate-500 mb-1">Oct {24 - i * 5}, 2025</p>
                                                    <h4 className="font-bold text-slate-900">General Checkup</h4>
                                                    <p className="text-slate-600 text-sm mt-1">Dr. Sarah Mitchell • Central City Hospital</p>
                                                    <p className="text-slate-700 mt-2 bg-slate-50 p-3 rounded-lg text-sm">
                                                        "Patient reported mild fever. Prescribed antibiotics and rest."
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Widgets */}
                <div className="space-y-6">
                    {/* Profile Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Patient Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-20 h-20 bg-slate-200 rounded-full mb-4 flex items-center justify-center">
                                    <User className="w-10 h-10 text-slate-400" />
                                </div>
                                <h3 className="font-bold text-lg">Alex Johnson</h3>
                                <p className="text-slate-500 text-sm font-mono">0x71...88a</p>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Type</div>
                                    <div className="font-bold text-slate-900">O+</div>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Height</div>
                                    <div className="font-bold text-slate-900">182cm</div>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Weight</div>
                                    <div className="font-bold text-slate-900">80kg</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Health Activity Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Health Activity</CardTitle>
                            <CardDescription>Visits in last 6 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-32 flex items-end justify-between gap-2 px-2">
                                {/* Mock Line Chart Area */}
                                <div className="w-full h-full relative">
                                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                        <path
                                            d="M0 80 Q 20 70 40 50 T 80 40 T 100 20"
                                            fill="none"
                                            stroke="#3b82f6"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M0 80 Q 20 70 40 50 T 80 40 T 100 20 L 100 100 L 0 100 Z"
                                            fill="url(#gradient)"
                                            opacity="0.2"
                                        />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#3b82f6" />
                                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Info Box */}
                    <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0">
                        <CardContent className="p-6">
                            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-blue-200" /> Did you know?
                            </h4>
                            <p className="text-blue-100 text-sm leading-relaxed">
                                Your medical data is encrypted with your private key. Only doctors you approve can view your history.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

// Sub-components

function StatCard({ title, value, icon: Icon, trend, iconColor, isWarning }: any) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-500">{title}</span>
                    <div className={`p-2 rounded-lg ${isWarning ? 'bg-red-100 text-red-600' : 'bg-slate-100'} ${!isWarning && iconColor ? iconColor : 'text-slate-600'}`}>
                        <Icon className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
                <div className={`text-xs font-medium ${isWarning ? 'text-red-500' : 'text-slate-400'}`}>{trend}</div>
            </CardContent>
        </Card>
    )
}

function MedicineNFTCard({ name, type, batch, expiry, image }: any) {
    return (
        <Card className="flex flex-row items-center p-4 gap-4 overflow-hidden relative group hover:border-blue-300 transition-colors">
            <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center text-4xl shrink-0">
                {image}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-slate-900 truncate">{name}</h3>
                        <Badge variant="secondary" className="mt-1 text-xs font-normal text-slate-500 bg-slate-100">
                            {type}
                        </Badge>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 gap-1 pl-2">
                        <ShieldCheck className="w-3 h-3" /> Verified
                    </Badge>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 font-mono">
                    <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">{batch}</span>
                    <span>{expiry}</span>
                </div>
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 ml-2 text-blue-600 border-blue-100 hover:bg-blue-50" title="View Proof">
                <QrCode className="w-5 h-5" />
            </Button>
        </Card>
    )
}
