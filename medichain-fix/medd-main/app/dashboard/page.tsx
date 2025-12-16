'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useRole } from '@/hooks/useRole'
import { Button } from '@/components/ui/Button'

export default function DashboardPage() {
    const { role, loading, loginAs } = useRole()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            // Auto-redirect if already logged in with a specific role
            if (role === 'MANUFACTURER') {
                router.push('/dashboard/manufacturer')
            } else if (role === 'DOCTOR') {
                router.push('/dashboard/doctor')
            } else if (role === 'PATIENT') {
                router.push('/dashboard/patient')
            }
        }
    }, [role, loading, router])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500 font-medium animate-pulse">Verifying Identity...</p>
                </div>
            </div>
        )
    }

    // Role Selection Gateway (Login)
    if (role === 'GUEST') {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">Select Your Role</h1>
                    <p className="text-slate-600 mb-6">
                        Welcome to MediChain. To proceed to the dashboard, please select the role you wish to simulate.
                        In production, this would be determined automatically by your wallet address.
                    </p>
                    <Button variant="outline" onClick={() => window.location.reload()} className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200">
                        Disconnect Wallet
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                    {/* Manufacturer Card */}
                    <button
                        onClick={() => loginAs('MANUFACTURER')}
                        className="group flex flex-col items-start p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all text-left"
                    >
                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Manufacturer</h3>
                        <p className="text-sm text-slate-500">
                            Register new medicines, manage stock, and mint batch NFTs.
                        </p>
                    </button>

                    {/* Doctor Card */}
                    <button
                        onClick={() => loginAs('DOCTOR')}
                        className="group flex flex-col items-start p-6 bg-white border border-slate-200 rounded-xl hover:border-teal-500 hover:shadow-lg transition-all text-left"
                    >
                        <div className="p-3 bg-teal-50 rounded-lg text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Doctor</h3>
                        <p className="text-sm text-slate-500">
                            Diagnose patients, prescribe medicines, and review history.
                        </p>
                    </button>

                    {/* Patient Card */}
                    <button
                        onClick={() => loginAs('PATIENT')}
                        className="group flex flex-col items-start p-6 bg-white border border-slate-200 rounded-xl hover:border-green-500 hover:shadow-lg transition-all text-left"
                    >
                        <div className="p-3 bg-green-50 rounded-lg text-green-600 mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Patient</h3>
                        <p className="text-sm text-slate-500">
                            Track your medicine history, verify ownership, and view health records.
                        </p>
                    </button>
                </div>
            </div>
        )
    }

    return null
}
