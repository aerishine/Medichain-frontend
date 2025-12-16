'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Package, Truck, AlertCircle, TrendingUp, Plus, RefreshCw, Box, ClipboardList, Syringe, QrCode } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { useState } from 'react'

export default function ManufacturerDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Factory Dashboard</h1>
                    <p className="text-slate-500">Manage production, inventory, and distribution.</p>
                </div>
                <Badge variant="outline" className="px-4 py-2 bg-blue-50 text-blue-700 border-blue-200">
                    <Box className="w-4 h-4 mr-2" /> Factory ID: 0x89...21a
                </Badge>
            </div>

            {/* Top Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                    title="Total Medicines"
                    value="12"
                    icon={ClipboardList}
                    trend="Registered Types"
                />
                <StatCard
                    title="Total Stock"
                    value="145,200"
                    icon={Package}
                    trend="Units in Warehouse"
                    iconColor="text-blue-600"
                />
                <StatCard
                    title="Active Batches"
                    value="8"
                    icon={RefreshCw}
                    trend="In Production"
                    iconColor="text-orange-600"
                />
                <StatCard
                    title="Low Stock"
                    value="2"
                    icon={AlertCircle}
                    trend="Requires Restock"
                    isWarning
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Tabs Section */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="inventory" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 mb-8">
                            <TabsTrigger value="inventory">Inventory</TabsTrigger>
                            <TabsTrigger value="batches">Batches</TabsTrigger>
                            <TabsTrigger value="register">Register New</TabsTrigger>
                            <TabsTrigger value="restock">Restock</TabsTrigger>
                        </TabsList>

                        <TabsContent value="inventory" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Warehouse Inventory</CardTitle>
                                    <CardDescription>Real-time view of available stock.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <InventoryTable />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="batches" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Production History</CardTitle>
                                    <CardDescription>Tracking recent batch statuses.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <BatchesTable />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="register">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Register New Medicine</CardTitle>
                                    <CardDescription>Create a blueprint for a new drug type on the blockchain.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RegisterMedicineForm />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="restock">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Mint & Restock</CardTitle>
                                    <CardDescription>Produce new batches of existing medicines.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RestockForm />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Widget: Stock Distribution */}
                <div className="space-y-6">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Stock Distribution</CardTitle>
                            <CardDescription>Percentage by medicine type</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center p-6">
                            {/* Simple CSS Donut Chart */}
                            <div className="relative w-48 h-48 rounded-full border-[20px] border-slate-100 flex items-center justify-center mb-6"
                                style={{
                                    background: 'conic-gradient(#3b82f6 0% 45%, #10b981 45% 75%, #f59e0b 75% 90%, #ef4444 90% 100%)',
                                    maskImage: 'radial-gradient(transparent 55%, black 56%)',
                                    WebkitMaskImage: 'radial-gradient(transparent 55%, black 56%)'
                                }}>
                            </div>

                            {/* Legend */}
                            <div className="w-full space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> Antibiotics</span>
                                    <span className="font-semibold text-slate-700">45%</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Pain Relievers</span>
                                    <span className="font-semibold text-slate-700">30%</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500 rounded-full"></div> Antacids</span>
                                    <span className="font-semibold text-slate-700">15%</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Cardiovascular</span>
                                    <span className="font-semibold text-slate-700">10%</span>
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

function InventoryTable() {
    const data = [
        { name: 'Amoxicillin 500mg', sku: 'AMX-500', stock: 4500, status: 'In Stock' },
        { name: 'Ibuprofen 400mg', sku: 'IBU-400', stock: 1200, status: 'In Stock' },
        { name: 'Paracetamol 500mg', sku: 'PAR-500', stock: 50, status: 'Low Stock' },
        { name: 'Omeprazole 20mg', sku: 'OME-020', stock: 2300, status: 'In Stock' },
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-medium">
                    <tr>
                        <th className="px-4 py-3">Medicine Name</th>
                        <th className="px-4 py-3">SKU</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Stock</th>
                        <th className="px-4 py-3">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.map((item, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                            <td className="px-4 py-3 font-medium text-slate-900">{item.name}</td>
                            <td className="px-4 py-3 font-mono text-slate-500">{item.sku}</td>
                            <td className="px-4 py-3">
                                <Badge variant={item.status === 'Low Stock' ? 'destructive' : 'outline'} className={item.status === 'In Stock' ? 'bg-green-50 text-green-700 border-green-200' : ''}>
                                    {item.status}
                                </Badge>
                            </td>
                            <td className="px-4 py-3 font-bold">{item.stock.toLocaleString()}</td>
                            <td className="px-4 py-3">
                                <Button size="sm" variant="outline" className="h-8 text-blue-600 border-blue-200 hover:bg-blue-50">
                                    <Plus className="w-3 h-3 mr-1" /> Restock
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function BatchesTable() {
    const data = [
        { id: 'BATCH-2023-001', name: 'Amoxicillin', date: 'Oct 24, 2025', status: 'Completed', qty: 5000 },
        { id: 'BATCH-2023-002', name: 'Ibuprofen', date: 'Oct 25, 2025', status: 'Processing', qty: 2000 },
        { id: 'BATCH-2023-003', name: 'Paracetamol', date: 'Oct 26, 2025', status: 'Pending', qty: 10000 },
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-medium">
                    <tr>
                        <th className="px-4 py-3">Batch ID</th>
                        <th className="px-4 py-3">Medicine</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Quantity</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.map((item, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                            <td className="px-4 py-3 font-mono text-blue-600">{item.id}</td>
                            <td className="px-4 py-3 font-medium">{item.name}</td>
                            <td className="px-4 py-3 text-slate-500">{item.date}</td>
                            <td className="px-4 py-3">
                                <Badge variant="outline" className={
                                    item.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-200' :
                                        item.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-slate-100 text-slate-500'
                                }>
                                    {item.status}
                                </Badge>
                            </td>
                            <td className="px-4 py-3 text-slate-700">{item.qty.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function RegisterMedicineForm() {
    return (
        <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Medicine Name</label>
                    <Input placeholder="e.g. Amoxicillin 500mg" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">SKU / Code</label>
                    <Input placeholder="e.g. AMX-500" />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Active Ingredients</label>
                <Input placeholder="e.g. Amoxicillin Trihydrate" />
            </div>
            <div className="pt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" /> Register Medicine Blueprint
                </Button>
            </div>
        </form>
    )
}

function RestockForm() {
    return (
        <form className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Select Medicine</label>
                <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Amoxicillin 500mg</option>
                    <option>Ibuprofen 400mg</option>
                    <option>Paracetamol 500mg</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Batch ID</label>
                    <Input value="BATCH-2025-004" readOnly className="bg-slate-50 font-mono" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Quantity to Mint</label>
                    <Input type="number" placeholder="e.g. 5000" />
                </div>
            </div>

            <div className="pt-4">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                    <QrCode className="w-4 h-4 mr-2" /> Mint Batch NFTs & Restock
                </Button>
            </div>
        </form>
    )
}
