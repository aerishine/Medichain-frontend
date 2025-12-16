'use client';

import Link from 'next/link';
import { Package } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');

    if (isDashboard) return null;

    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white font-bold text-xl">
                            <Package className="w-6 h-6 text-blue-500" />
                            MediChain
                        </div>
                        <p className="text-sm text-slate-400">
                            Securing the pharmaceutical supply chain with blockchain transparency.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/track" className="hover:text-blue-400 transition-colors">Track Medicine</Link></li>
                            <li><Link href="/medicines" className="hover:text-blue-400 transition-colors">Medicine Catalog</Link></li>
                            <li><Link href="/login" className="hover:text-blue-400 transition-colors">Login / Sign Up</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} MediChain Decentralized Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
