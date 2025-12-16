
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="flex flex-col items-center text-center mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 mb-4">
                    Contact Us
                </h1>
                <p className="text-slate-600 max-w-2xl">
                    Have questions about MediChain or want to integrate our solution? Reach out to our team.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="space-y-6">
                    <Card className="border-blue-100 shadow-lg shadow-blue-500/5">
                        <CardHeader>
                            <CardTitle className="text-xl text-blue-900">Get in Touch</CardTitle>
                            <CardDescription>We'd love to hear from you.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Email</h3>
                                    <p className="text-slate-600">support@medichain.com</p>
                                    <p className="text-slate-600">sales@medichain.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Phone</h3>
                                    <p className="text-slate-600">+1 (555) 123-4567</p>
                                    <p className="text-slate-600">Mon-Fri 9am - 6pm EST</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Office</h3>
                                    <p className="text-slate-600">123 Blockchain Blvd</p>
                                    <p className="text-slate-600">Tech City, TC 90210</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form */}
                <Card className="border-blue-100 shadow-lg shadow-blue-500/5">
                    <CardHeader>
                        <CardTitle className="text-xl text-blue-900">Send us a Message</CardTitle>
                        <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="first-name" className="text-sm font-medium text-slate-700">First name</label>
                                    <Input id="first-name" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="last-name" className="text-sm font-medium text-slate-700">Last name</label>
                                    <Input id="last-name" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                                <Input id="email" type="email" placeholder="john@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                                <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px]" />
                            </div>

                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
                                <Send className="w-4 h-4 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
