
'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Search, PackageCheck } from "lucide-react"

export default function TrackPage() {
    const router = useRouter()
    const [searchCode, setSearchCode] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchCode.trim()) {
            router.push(`/track/${searchCode.trim()}`)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full shadow-lg border-blue-100">
                <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <PackageCheck className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900">Track Your Medicine</CardTitle>
                    <CardDescription>
                        Enter the unique tracking ID found on your medicine packaging to verify its authenticity and journey.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <Input
                                placeholder="Enter Tracking ID (e.g., MED-12345)"
                                className="pl-10 h-12 text-lg"
                                value={searchCode}
                                onChange={(e) => setSearchCode(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700" disabled={!searchCode.trim()}>
                            Track Now
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
