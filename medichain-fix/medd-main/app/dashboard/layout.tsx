'use client'

import { useRole } from '@/hooks/useRole'
import { cn } from '@/lib/utils'
import { LayoutDashboard, PackagePlus, Truck, Users, Pill, History, Search, FileText, Activity, Stethoscope, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useDisconnect } from 'wagmi'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { role, isManufacturer, isDoctor, isPatient, loading } = useRole()
    const pathname = usePathname()
    const { disconnect } = useDisconnect()

    const SidebarItem = ({ href, icon: Icon, label, exact = false }: { href: string, icon: any, label: string, exact?: boolean }) => {
        const isActive = exact ? pathname === href : pathname.startsWith(href)
        return (
            <Link
                href={href}
                className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                )}
            >
                <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400")} />
                {label}
            </Link>
        )
    }

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500 font-medium animate-pulse">Loading Dashboard...</p>
                </div>
            </div>
        )
    }

    // Basic Access Control
    // We allow GUEST to render children because the children (dashboard/page.tsx) 
    // now contains the Role Selection Gateway.
    // If they try to access a protected sub-route (e.g. /dashboard/manufacturer), 
    // that page should handle its own protection or we can add it here.
    if (role === 'GUEST' && pathname !== '/dashboard') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900">
                <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                <p className="mb-4 text-slate-600">Please connect your wallet or select a role to view this page.</p>
                <Link href="/dashboard"><Button>Go to Dashboard Gateway</Button></Link>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-4 z-40 shadow-sm">
                <div className="flex-1 space-y-8 overflow-y-auto">

                    {/* Manufacturer Menu */}
                    {isManufacturer && (
                        <div className="space-y-1">
                            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Manufacturer</p>
                            <SidebarItem href="/dashboard/manufacturer" label="Overview & Tools" icon={LayoutDashboard} exact />
                        </div>
                    )}

                    {/* Doctor Menu */}
                    {isDoctor && (
                        <div className="space-y-1">
                            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Doctor</p>
                            <SidebarItem href="/dashboard/doctor" label="Dashboard" icon={Stethoscope} exact />
                        </div>
                    )}

                    {/* Patient Menu */}
                    {isPatient && (
                        <div className="space-y-1">
                            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Patient</p>
                            <SidebarItem href="/dashboard/patient" label="My Health Wallet" icon={Activity} exact />
                            <SidebarItem href="/track" label="Track Medicine" icon={Search} />
                        </div>
                    )}

                </div>

                <div className="mt-auto pt-4 border-t border-slate-100">
                    <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-red-500 hover:bg-red-50" onClick={() => disconnect()}>
                        <LogOut className="w-5 h-5 mr-2" /> Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 animate-in fade-in duration-500">
                {children}
            </main>
        </div>
    )
}
