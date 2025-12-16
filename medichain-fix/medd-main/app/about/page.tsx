
'use client'

import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { ShieldCheck, Users, Globe, Award } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
                <div className="flex-1 space-y-6">
                    <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">Our Mission</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-600 leading-tight">
                        Revolutionizing Healthcare Supply Chains
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        MediChain is dedicated to ensuring the safety and authenticity of medicines worldwide.
                        By leveraging blockchain technology, we create an immutable record of every drug's journey
                        from the manufacturing plant to the patient's hands.
                    </p>
                </div>
                <div className="flex-1 relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10">
                    <Image
                        src="/team-hijab.png"
                        alt="MediChain Team"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        priority
                    />
                </div>
            </div>


            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                <ValueCard
                    icon={<ShieldCheck className="w-8 h-8 text-blue-600" />}
                    title="Integrity"
                    description="We believe in uncompromised truth and transparency in every transaction."
                />
                <ValueCard
                    icon={<Users className="w-8 h-8 text-blue-600" />}
                    title="Patient First"
                    description="Every line of code we write is dedicated to protecting patient health."
                />
                <ValueCard
                    icon={<Globe className="w-8 h-8 text-blue-600" />}
                    title="Global Impact"
                    description="Building solutions that work across borders and regulatory environments."
                />
                <ValueCard
                    icon={<Award className="w-8 h-8 text-blue-600" />}
                    title="Excellence"
                    description="Striving for the highest standards in security and user experience."
                />
            </div>

            {/* Stats Section */}
            <div className="bg-slate-900 rounded-3xl p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-12">Making a Real Difference</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatItem value="1M+" label="Medicines Tracked" />
                    <StatItem value="500+" label="Verified Partners" />
                    <StatItem value="100%" label="Tamper Proof" />
                </div>
            </div>
        </div >
    )
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <Card className="border-slate-100 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
                <div className="mb-4 bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center">
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600">{description}</p>
            </CardContent>
        </Card>
    )
}

function StatItem({ value, label }: { value: string, label: string }) {
    return (
        <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-black text-blue-400">{value}</div>
            <div className="text-slate-400 font-medium">{label}</div>
        </div>
    )
}
