import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

export type UserRole = 'MANUFACTURER' | 'PATIENT' | 'DOCTOR' | 'GUEST'

// Mock data mapping addresses to roles
// In a real app, this would read from the smart contract
const MOCK_ROLES: Record<string, UserRole> = {
    // Add some test addresses here if needed, otherwise default to PATIENT or MANUFACTURER for testing
}

export function useRole() {
    const { address, isConnected } = useAccount()
    const [role, setRole] = useState<UserRole>('GUEST')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check for dev/manual override in localStorage
        const storedRole = localStorage.getItem('MEDICHAIN_ROLE')
        if (storedRole) {
            setRole(storedRole as UserRole)
            setLoading(false)
            return
        }

        if (!isConnected || !address) {
            setRole('GUEST')
            setLoading(false)
            return
        }

        // In a real app, we would fetch the role from the contract here
        // For now, if no stored role, we stay as GUEST to allow them to "Login"
        setLoading(false)
    }, [address, isConnected])

    const loginAs = (newRole: UserRole) => {
        localStorage.setItem('MEDICHAIN_ROLE', newRole)
        setRole(newRole)
        // Force a page reload to ensure all components pick up the new role state clean
        window.location.reload()
    }

    const logout = () => {
        localStorage.removeItem('MEDICHAIN_ROLE')
        setRole('GUEST')
        window.location.href = '/'
    }

    return {
        role,
        loading,
        isManufacturer: role === 'MANUFACTURER',
        isDoctor: role === 'DOCTOR',
        isPatient: role === 'PATIENT',
        isGuest: role === 'GUEST',
        loginAs,
        logout
    }
}

