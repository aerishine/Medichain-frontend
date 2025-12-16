'use client'

import { Card, CardContent } from "@/components/ui/Card"

export default function Terms() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-slate-900">Terms of Service</h1>
            <p className="text-slate-600 mb-8">Last updated: December 15, 2025</p>

            <div className="space-y-8">
                <Section title="1. Agreement to Terms">
                    <p>
                        By accessing or using MediChain, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                        If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                    </p>
                </Section>

                <Section title="2. Blockchain Technology Disclaimer">
                    <p>
                        MediChain utilizes blockchain technology to manage supply chain records. You acknowledge and agree that:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Transactions on the blockchain are immutable and cannot be reversed or deleted.</li>
                        <li>You are responsible for the security of your private keys and wallet credentials.</li>
                        <li>We do not have custody of your assets or the ability to restore access to your wallet.</li>
                    </ul>
                </Section>

                <Section title="3. Medical Disclaimer">
                    <p>
                        The content provided on MediChain is for informational and tracking purposes only.
                        It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
                        Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                    </p>
                </Section>

                <Section title="4. User Responsibilities">
                    <p>
                        As a user of the platform, you agree not to:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Use the service for any illegal purpose or in violation of any local, state, national, or international law.</li>
                        <li>Attempt to interfere with or compromise the system integrity or security.</li>
                        <li>Falsify supply chain data or misrepresent the authenticity of products.</li>
                    </ul>
                </Section>

                <Section title="5. Limitation of Liability">
                    <p>
                        In no event shall MediChain or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MediChain.
                    </p>
                </Section>
            </div>
        </div>
    )
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <Card className="border-slate-200 shadow-sm">
            <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4 text-slate-800">{title}</h2>
                <div className="text-slate-600 leading-relaxed">
                    {children}
                </div>
            </CardContent>
        </Card>
    )
}
