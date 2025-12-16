'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/Button'
import { Menu, X, Hexagon, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRole } from '@/hooks/useRole'

export function Navbar() {
    const { isGuest, logout } = useRole()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Handlers
    // Removed manual handleConnect

    const pathname = usePathname()
    const isHome = pathname === '/'
    // Always show solid navbar on non-home pages
    const showSolid = scrolled || !isHome

    return (
        <nav className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 border-b",
            showSolid
                ? "bg-white/95 backdrop-blur-md border-slate-200 py-0 shadow-sm"
                : "bg-transparent border-transparent py-4"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className={showSolid ? "text-blue-700" : "text-white"}>
                            <Hexagon className={cn("w-8 h-8", showSolid ? "fill-blue-100 stroke-blue-600" : "fill-blue-500/20 stroke-white")} strokeWidth={1.5} />
                        </div>
                        <span className={cn("text-xl font-bold tracking-tight", showSolid ? "text-slate-900" : "text-white")}>MediChain</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {[
                            { name: 'Home', href: '/' },
                            { name: 'Medicines', href: '/medicines' },
                            { name: 'Factory', href: '/dashboard/manufacturer' },
                            { name: 'Doctor', href: '/dashboard/doctor' },
                            { name: 'Patient', href: '/dashboard/patient' },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-blue-500",
                                    showSolid ? "text-slate-600" : "text-blue-100 hover:text-white"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Wallet Button (Desktop) */}
                    <div className="hidden md:flex items-center gap-4">
                        {isGuest && (
                            <Link
                                href="/dashboard"
                                className={cn("text-sm font-medium transition-colors hover:text-blue-500", showSolid ? "text-slate-900" : "text-white")}
                            >
                                Login
                            </Link>
                        )}

                        <ConnectButton showBalance={false} />

                        {!isGuest && (
                            <Button variant="ghost" className={cn("text-red-500 hover:bg-red-50 hover:text-red-600", showSolid ? "text-red-600" : "text-red-300")} onClick={logout}>
                                <LogOut className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">Logout</span>
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={cn("transition-colors", showSolid ? "text-slate-900 hover:text-blue-600" : "text-blue-100 hover:text-white")}>
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#1E3A5F] border-b border-blue-800 p-4 space-y-4 shadow-xl animate-in slide-in-from-top-5 text-white">
                    <Link href="/" className="block text-base font-medium text-blue-100 hover:text-white" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link href="/medicines" className="block text-base font-medium text-blue-100 hover:text-white" onClick={() => setIsMenuOpen(false)}>Medicines</Link>
                    <Link href="/dashboard/manufacturer" className="block text-base font-medium text-blue-100 hover:text-white" onClick={() => setIsMenuOpen(false)}>Factory</Link>
                    <Link href="/dashboard/doctor" className="block text-base font-medium text-blue-100 hover:text-white" onClick={() => setIsMenuOpen(false)}>Doctor</Link>
                    <Link href="/dashboard/patient" className="block text-base font-medium text-blue-100 hover:text-white" onClick={() => setIsMenuOpen(false)}>Patient</Link>
                    {isGuest && (
                        <Link href="/dashboard" className="block text-base font-medium text-blue-100 hover:text-white" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    )}
                    <div className="pt-2 flex flex-col gap-2">
                        <ConnectButton showBalance={false} />
                        {!isGuest && (
                            <Button variant="ghost" size="sm" onClick={logout} className="text-red-300 justify-start px-0 hover:text-red-200 hover:bg-transparent">
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
