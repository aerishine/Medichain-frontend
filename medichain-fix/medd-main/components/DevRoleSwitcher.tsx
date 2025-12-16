'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Settings } from 'lucide-react'

// This component uses a custom event or local storage to override the mock hook
// For simplicity in this demo, let's just use localStorage and reload
export function DevRoleSwitcher() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="fixed bottom-4 right-4 z-[100]">
            <div className="relative">
                {isOpen && (
                    <div className="absolute bottom-12 right-0 bg-white shadow-xl border border-slate-200 rounded-xl p-4 w-48 space-y-2 mb-2 animate-in slide-in-from-bottom-5">
                        <div className="text-xs font-bold text-slate-500 uppercase mb-2">Dev Tools: Switch Role</div>
                        <select
                            className="w-full p-2 border rounded-md text-sm bg-white"
                            onChange={(e) => {
                                const role = e.target.value
                                if (role) {
                                    localStorage.setItem('MEDICHAIN_ROLE', role)
                                } else {
                                    localStorage.removeItem('MEDICHAIN_ROLE')
                                }
                                window.location.reload()
                            }}
                            defaultValue={typeof window !== 'undefined' ? localStorage.getItem('MEDICHAIN_ROLE') || '' : ''}
                        >
                            <option value="">Default (Auto-detect)</option>
                            <option value="MANUFACTURER">Manufacturer</option>
                            <option value="DOCTOR">Doctor</option>
                            <option value="PATIENT">Patient</option>
                            <option value="GUEST">Guest</option>
                        </select>
                    </div>
                )}
                <Button onClick={() => setIsOpen(!isOpen)} size="icon" className="rounded-full shadow-lg h-12 w-12 bg-slate-900 text-white hover:bg-slate-800">
                    <Settings className="w-6 h-6" />
                </Button>
            </div>
        </div>
    )
}
