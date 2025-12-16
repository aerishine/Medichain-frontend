'use client'

import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Rocket, Heart, Zap, Globe, ArrowRight } from "lucide-react"

export default function Careers() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            {/* Hero Section */}
            <div className="text-center mb-20 space-y-6">
                <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">We're Hiring</Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
                    Build the Future of <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Healthcare Tech</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Join a team of visionaries, engineers, and healthcare experts dedicated to saving lives through transparency and technology.
                </p>

            </div>

            {/* Perks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                <PerkCard
                    icon={<Globe className="w-8 h-8 text-blue-500" />}
                    title="Remote-First"
                    description="Work from anywhere in the world. We believe in talent, not time zones."
                />
                <PerkCard
                    icon={<Heart className="w-8 h-8 text-rose-500" />}
                    title="Comprehensive Health"
                    description="Top-tier medical, dental, and vision coverage for you and your family."
                />
                <PerkCard
                    icon={<Zap className="w-8 h-8 text-amber-500" />}
                    title="Competitive Equity"
                    description="Own a piece of the future. Every employee gets stock options."
                />
            </div>

            {/* Open Positions */}
            <div className="space-y-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Open Positions</h2>

                <div className="space-y-4">
                    <JobCard
                        title="Senior Blockchain Engineer"
                        department="Engineering"
                        location="Remote"
                        type="Full-time"
                    />
                    <JobCard
                        title="Frontend Developer (React/Next.js)"
                        department="Engineering"
                        location="Remote"
                        type="Full-time"
                    />
                    <JobCard
                        title="Product Designer"
                        department="Design"
                        location="London / Remote"
                        type="Full-time"
                    />
                    <JobCard
                        title="Healthcare Compliance Officer"
                        department="Legal"
                        location="New York"
                        type="Full-time"
                    />
                </div>
            </div>
        </div>
    )
}

function PerkCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <Card className="border-slate-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6 text-center">
                <div className="mb-4 bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    {icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600">{description}</p>
            </CardContent>
        </Card>
    )
}

function JobCard({ title, department, location, type }: { title: string, department: string, location: string, type: string }) {
    return (
        <div className="group bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between hover:border-blue-300 hover:shadow-md transition-all">
            <div className="space-y-1 text-center md:text-left mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{title}</h3>
                <div className="flex items-center gap-3 text-sm text-slate-500 justify-center md:justify-start">
                    <span>{department}</span>
                    <span>•</span>
                    <span>{location}</span>
                    <span>•</span>
                    <span>{type}</span>
                </div>
            </div>
            <Button variant="outline" className="group-hover:bg-blue-50 group-hover:text-blue-600 border-slate-200">
                Apply Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
        </div>
    )
}
