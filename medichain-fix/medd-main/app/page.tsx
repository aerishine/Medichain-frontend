'use client'

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Search, ShieldCheck, Activity, Truck, Calendar, CheckCircle, Database, ArrowRight, Factory, Stethoscope, User, Box, Lock, FileCheck, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"


export default function Home() {
  const router = useRouter()
  const [searchCode, setSearchCode] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchCode.trim()) {
      router.push(`/track/${searchCode}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen -mt-16">

      {/* Hero Section */}
      <section className="relative pt-32 pb-48 lg:pt-40 lg:pb-64 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg-2.jpg"
            alt="Medical Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/70"></div>
        </div>

        <div className="absolute inset-0 opacity-10 z-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Badge variant="outline" className="mb-6 px-4 py-1 border-blue-400 text-blue-100 bg-blue-900/30 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 mr-2 text-accent" />
              Verified on Blockchain
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Secure Medicine <br />
              <span className="text-accent">Supply Chain</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the future of healthcare transparency. Track every step of your medicine's journey from factory to patient with immutable blockchain records.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="h-14 px-8 text-lg bg-accent hover:bg-blue-600 shadow-lg shadow-blue-500/30 w-full sm:w-auto">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link href="/about" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-blue-400/30 text-blue-100 hover:bg-blue-900/50 w-full">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Platform Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why MediChain?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              We combine advanced blockchain technology with healthcare standards to ensure patient safety.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FileCheck className="w-10 h-10 text-blue-600" />}
              title="Immutable Records"
              description="Once data is written to the blockchain, it cannot be altered or deleted. Every transaction is permanent and verifiable."
            />
            <FeatureCard
              icon={<Activity className="w-10 h-10 text-blue-600" />}
              title="Real-time Tracking"
              description="Monitor the status and location of medicine shipments in real-time as they move through the supply chain."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-10 h-10 text-blue-600" />}
              title="Anti-Counterfeit"
              description="Each medicine unit has a unique digital identity (NFT) that guarantees its authenticity and origin."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              A seamless journey from production to patient.
            </p>
          </div>

          <div className="relative">
            {/* Decorator Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-blue-100 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              <StepCard
                number="01"
                icon={<Factory className="w-6 h-6" />}
                title="Production"
                description="Manufacturer mints a unique NFT for each medicine batch."
              />
              <StepCard
                number="02"
                icon={<Truck className="w-6 h-6" />}
                title="Factory"
                description="Factory distributes medicine securely to doctors."
              />
              <StepCard
                number="03"
                icon={<Stethoscope className="w-6 h-6" />}
                title="Doctor"
                description="Doctors verify stock and dispense to patients."
              />
              <StepCard
                number="04"
                icon={<User className="w-6 h-6" />}
                title="Patient"
                description="Patients verify authenticity and ownership via app."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="What is MediChain?"
              answer="MediChain is a decentralized platform that uses blockchain technology to track and verify the authenticity of pharmaceutical products throughout the supply chain."
            />
            <FAQItem
              question="How does it prevent counterfeit drugs?"
              answer="By assigning a unique, immutable digital token (NFT) to each physical medicine unit, we ensure that the history of the product can be verified by anyone, making it impossible to slip fakes into the system."
            />
            <FAQItem
              question="Do I need cryptocurrency to use it?"
              answer="No! While the system runs on blockchain, our user-friendly interface handles the technical details. Patients can verify medicines without needing a crypto wallet."
            />
            <FAQItem
              question="Is my medical data safe?"
              answer="Yes. We prioritize privacy. Personal medical data is encrypted and only accessible to authorized parties (like your doctor), while supply chain data is public for transparency."
            />
          </div>
        </div>
      </section>


    </div>
  );
}

// Sub-components

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  )
}

function StepCard({ number, icon, title, description }: { number: string, icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative text-center">
      <div className="w-12 h-12 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
        {icon}
      </div>
      <div className="absolute top-4 right-4 text-4xl font-black text-slate-100 -z-10">{number}</div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

