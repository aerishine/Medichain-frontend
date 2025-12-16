'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Users, FileText, Clock, Activity, Plus, Search, User, Stethoscope, BriefcaseMedical, Calendar } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import React, { useState } from 'react'

export default function DoctorDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Doctor Dashboard</h1>
                    <p className="text-slate-500">Manage patient consultations and prescriptions.</p>
                </div>
                <Badge variant="outline" className="px-4 py-2 bg-blue-50 text-blue-700 border-blue-200">
                    <Stethoscope className="w-4 h-4 mr-2" /> Dr. Sarah Mitchell (Lic: 49403)
                </Badge>
            </div>

            {/* Top Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                    title="Prescriptions"
                    value="156"
                    icon={FileText}
                    trend="Dispensed Total"
                />
                <StatCard
                    title="Patients Treated"
                    value="98"
                    icon={Users}
                    trend="+12 this month"
                    iconColor="text-blue-600"
                />
                <StatCard
                    title="Pending Reviews"
                    value="4"
                    icon={Clock}
                    trend="Requires Action"
                    iconColor="text-orange-600"
                    isWarning
                />
                <StatCard
                    title="Avg Wait Time"
                    value="12m"
                    icon={Activity}
                    trend="On Target"
                    iconColor="text-green-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Tabs Section */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="dispense" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-8">
                            <TabsTrigger value="dispense">Dispense Medicine</TabsTrigger>
                            <TabsTrigger value="history">Prescription History</TabsTrigger>
                            <TabsTrigger value="patients">My Patients</TabsTrigger>
                        </TabsList>

                        <TabsContent value="dispense">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Dispense Medicine</CardTitle>
                                    <CardDescription>Issue a new prescription to a patient wallet.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <DispenseForm />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="history" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Prescription History</CardTitle>
                                    <CardDescription>Recent medicines dispensed to patients.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <HistoryTable />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="patients" className="space-y-4">
                            <Card className="bg-slate-50/50 border-dashed">
                                <CardContent className="py-12 text-center text-slate-500">
                                    <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>Patient list integration coming soon.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Widgets */}
                <div className="space-y-6">
                    {/* Weekly Activity Widget */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Activity</CardTitle>
                            <CardDescription>Patients per day</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-48 flex items-end justify-between gap-2 px-2">
                                {/* Mock Bar Chart */}
                                {[40, 70, 45, 90, 60, 30, 50].map((height, i) => (
                                    <div key={i} className="w-full bg-blue-100 rounded-t-lg relative group transition-all duration-300 hover:bg-blue-200">
                                        <div
                                            className="bg-blue-500 w-full rounded-t-lg absolute bottom-0 transition-all duration-500"
                                            style={{ height: `${height}%` }}
                                        ></div>
                                        <div className="absolute -bottom-6 w-full text-center text-xs text-slate-400">
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Profile Card */}
                    <Card className="bg-slate-900 text-white border-slate-800">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-lg font-bold">
                                    SM
                                </div>
                                <div>
                                    <div className="font-bold text-lg">Dr. Sarah Mitchell</div>
                                    <div className="text-blue-200 text-sm">General Practitioner</div>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm text-slate-400">
                                <div className="flex justify-between">
                                    <span>License ID</span>
                                    <span className="text-white font-mono">LIC-49403</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Hospital</span>
                                    <span className="text-white">Central City Hospital</span>
                                </div>
                            </div>
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

const MOCK_PATIENTS = [
    { name: "Alex Johnson", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
    { name: "Maria Garcia", address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC" },
    { name: "John Doe", address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906" },
];

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { MEDICHAIN_ADDRESS, MEDICHAIN_ABI } from '@/config/contracts'
import { stringToHex } from 'viem'
import { toast } from 'sonner'

function DispenseForm() {
    const [address, setAddress] = useState('')
    const [name, setName] = useState('')
    const [medicine, setMedicine] = useState('BATCH-2023-001') // Default mock batch
    const [notes, setNotes] = useState('')

    const { writeContract, data: hash, isPending } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

    // Reset form on success
    React.useEffect(() => {
        if (isSuccess) {
            toast.success("Medicine dispensed successfully!")
            setAddress('')
            setName('')
            setNotes('')
        }
    }, [isSuccess])

    const handlePatientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedAddress = e.target.value;
        const patient = MOCK_PATIENTS.find(p => p.address === selectedAddress);

        if (patient) {
            setAddress(patient.address);
            setName(patient.name);
        } else {
            setAddress(selectedAddress);
            if (selectedAddress === "") {
                setAddress("");
                setName("");
            }
        }
    };

    const handleDispense = (e: React.FormEvent) => {
        e.preventDefault()
        if (!address) {
            toast.error("Please select or enter a patient address")
            return
        }

        try {
            // Using the selected batch ID as the drugCode
            // Ensuring it's 32 bytes
            const drugCode = stringToHex(medicine, { size: 32 })

            writeContract({
                address: MEDICHAIN_ADDRESS,
                abi: MEDICHAIN_ABI,
                functionName: 'transferDrug',
                args: [drugCode, address as `0x${string}`, notes],
            })
        } catch (error) {
            console.error(error)
            toast.error("Failed to initiate transaction")
        }
    }

    return (
        <form className="space-y-4" onSubmit={handleDispense}>
            {/* Patient Selector */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Select Registered Patient</label>
                <select
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={handlePatientSelect}
                    defaultValue=""
                >
                    <option value="">-- Choose a Patient --</option>
                    {MOCK_PATIENTS.map((p, i) => (
                        <option key={i} value={p.address}>{p.name} ({p.address.slice(0, 6)}...)</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Patient Wallet Address</label>
                    <div className="flex gap-2">
                        <Input
                            placeholder="0x..."
                            className="font-mono bg-slate-50"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={isPending || isConfirming}
                        />
                        <Button variant="outline" type="button"><Search className="w-4 h-4" /></Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Patient Name</label>
                    <Input
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isPending || isConfirming}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Select Medicine</label>
                <select
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={medicine}
                    onChange={(e) => setMedicine(e.target.value)}
                    disabled={isPending || isConfirming}
                >
                    <option value="BATCH-2023-001">Amoxicillin 500mg (Batch #2023-001)</option>
                    <option value="BATCH-2023-004">Ibuprofen 400mg (Batch #2023-004)</option>
                    <option value="BATCH-2023-012">Paracetamol 500mg (Batch #2023-012)</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Diagnosis & Notes</label>
                <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter diagnosis details..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    disabled={isPending || isConfirming}
                />
            </div>

            <div className="pt-4">
                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    disabled={isPending || isConfirming}
                >
                    {isPending ? 'Confirm in Wallet...' : isConfirming ? 'Processing...' : (
                        <>
                            <BriefcaseMedical className="w-4 h-4 mr-2" /> Dispense Medicine
                        </>
                    )}
                </Button>
                {hash && (
                    <div className="mt-2 text-xs text-center text-slate-500 truncate">
                        Tx: {hash}
                    </div>
                )}
            </div>
        </form>
    )
}

function HistoryTable() {
    const data = [
        { id: '#4421', patient: '0x3a...99f', medicine: 'Amoxicillin 500mg', date: '2 mins ago' },
        { id: '#4420', patient: '0x7b...22c', medicine: 'Ibuprofen 400mg', date: '2 hours ago' },
        { id: '#4419', patient: 'Jane Doe', medicine: 'Paracetamol', date: 'Yesterday' },
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-medium">
                    <tr>
                        <th className="px-4 py-3">Prescription ID</th>
                        <th className="px-4 py-3">Patient</th>
                        <th className="px-4 py-3">Medicine</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.map((item, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                            <td className="px-4 py-3 font-mono text-blue-600">{item.id}</td>
                            <td className="px-4 py-3 font-medium flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${item.patient.startsWith('0x') ? 'bg-orange-400' : 'bg-green-400'}`}></span>
                                {item.patient}
                            </td>
                            <td className="px-4 py-3">{item.medicine}</td>
                            <td className="px-4 py-3 text-slate-500">{item.date}</td>
                            <td className="px-4 py-3">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Search className="w-4 h-4 text-slate-400" /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
