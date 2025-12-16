'use client'

import { Card, CardContent } from "@/components/ui/Card"

export default function Privacy() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-slate-900">Privacy Policy</h1>
            <p className="text-slate-600 mb-8">Last updated: December 15, 2025</p>

            <div className="space-y-8">
                <Section title="1. Information We Collect">
                    <p>
                        We collect information you provide directly to us when you create an account, verify a product, or communicate with us.
                        This may include:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Account information (Name, Role, Wallet Address).</li>
                        <li>Transaction data related to medicine supply chain activities.</li>
                        <li>Usage data and device information for system optimization.</li>
                    </ul>
                </Section>

                <Section title="2. Public Blockchain Data">
                    <p className="font-medium text-amber-600 mb-2">Important Notice regarding Blockchain Data:</p>
                    <p>
                        Please be aware that transactions on the blockchain are public and permanent.
                        Any data stored directly on the blockchain (such as transaction history, wallet addresses, and token metadata) is visible to the public
                        and cannot be deleted or modified by MediChain. We advise against storing sensitive personal health information (PHI) directly on-chain.
                    </p>
                </Section>

                <Section title="3. How We Use Your Information">
                    <p>
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Provide, maintain, and improve our services.</li>
                        <li>Verify the authenticity of pharmaceutical products.</li>
                        <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities.</li>
                    </ul>
                </Section>

                <Section title="4. Data Security">
                    <p>
                        We implement reasonable security measures to protect your personal information.
                        However, no method of transmission over the Internet or method of electronic storage is 100% secure.
                    </p>
                </Section>

                <Section title="5. Contact Us">
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at privacy@medichain.com.
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
