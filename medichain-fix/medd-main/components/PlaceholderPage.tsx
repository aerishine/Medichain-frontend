
import { AlertCircle } from "lucide-react"

export default function PlaceholderPage({ title }: { title: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="bg-blue-50 p-6 rounded-full mb-6">
                <AlertCircle className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{title}</h1>
            <p className="text-slate-600 max-w-md mb-8">
                This page is currently under development. Please check back later for updates.
            </p>
        </div>
    )
}
