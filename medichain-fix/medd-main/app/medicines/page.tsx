'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, Filter, Pill, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

// Mock Data
const ALL_MEDICINES = [
    {
        id: 1,
        name: 'Amoxicillin',
        dosage: '500mg',
        type: 'Antibiotic',
        manufacturer: 'PharmaCorp',
        image: '💊', // Using emoji for now as per "simple" requirement, but can use placeholders
        batch: 'BATCH-2023-001',
        verified: true,
    },
    {
        id: 2,
        name: 'Ibuprofen',
        dosage: '400mg',
        type: 'Pain Reliever',
        manufacturer: 'HealthMed',
        image: '💊',
        batch: 'BATCH-2023-004',
        verified: true,
    },
    {
        id: 3,
        name: 'Paracetamol',
        dosage: '500mg',
        type: 'Analgesic',
        manufacturer: 'WellnessInc',
        image: '💊',
        batch: 'BATCH-2023-012',
        verified: true,
    },
    {
        id: 4,
        name: 'Omeprazole',
        dosage: '20mg',
        type: 'Antacid',
        manufacturer: 'PharmaCorp',
        image: '💊',
        batch: 'BATCH-2023-009',
        verified: true,
    },
    {
        id: 5,
        name: 'Metformin',
        dosage: '500mg',
        type: 'Antidiabetic',
        manufacturer: 'BioLife',
        image: '💊',
        batch: 'BATCH-2023-022',
        verified: true,
    },
    {
        id: 6,
        name: 'Atorvastatin',
        dosage: '10mg',
        type: 'Cardiovascular',
        manufacturer: 'HealthMed',
        image: '💊',
        batch: 'BATCH-2023-015',
        verified: true,
    },
];

export default function MedicinesPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMedicines = ALL_MEDICINES.filter((med) =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">

            {/* Header Section */}
            <div className="bg-white border-b border-slate-200 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Medicine Catalog</h1>
                            <p className="text-slate-500 mt-2">Browse valid medicines registered on the MediChain network.</p>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4 max-w-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <Input
                                placeholder="Search medicines by name or category..."
                                className="pl-10 h-11 bg-slate-50 border-slate-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" className="h-11 px-4 gap-2">
                            <Filter className="w-4 h-4" /> Filters
                        </Button>
                    </div>
                </div>
            </div>

            {/* Grid Content */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                {filteredMedicines.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMedicines.map((med, index) => (
                            <motion.div
                                key={med.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <MedicineCard medicine={med} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No medicines found</h3>
                        <p className="text-slate-500 mt-1">Try adjusting your search terms.</p>
                    </div>
                )}
            </main>
        </div>
    );
}

function MedicineCard({ medicine }: { medicine: any }) {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 border-slate-200 overflow-hidden group">
            <div className="h-48 bg-slate-100 flex items-center justify-center relative overlow-hidden">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">{medicine.image}</div>
                {medicine.verified && (
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-green-700 flex items-center gap-1 shadow-sm border border-green-100">
                        <ShieldCheck className="w-3 h-3" /> Verified
                    </div>
                )}
            </div>
            <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <Badge variant="secondary" className="mb-2 text-xs font-normal text-slate-500 bg-slate-100 hover:bg-slate-200">
                            {medicine.type}
                        </Badge>
                        <h3 className="text-lg font-bold text-slate-900">{medicine.name}</h3>
                    </div>
                    <span className="text-sm font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-md">{medicine.dosage}</span>
                </div>

                <div className="text-sm text-slate-500 mb-4 space-y-1">
                    <p><span className="font-medium text-slate-700">Manuf:</span> {medicine.manufacturer}</p>
                    <p className="font-mono text-xs text-slate-400">{medicine.batch}</p>
                </div>

                <Button className="w-full justify-between group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    View Details <ArrowRight className="w-4 h-4 ml-2 opacity-60 group-hover:opacity-100" />
                </Button>
            </CardContent>
        </Card>
    );
}
