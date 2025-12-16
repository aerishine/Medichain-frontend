import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { MEDICHAIN_ABI, MEDICHAIN_ADDRESS } from '@/config/contracts'
import { toast } from 'sonner'
import { useEffect } from 'react'

export function useMedichain() {
    const { address } = useAccount()
    const { data: hash, writeContract, isPending, error: writeError } = useWriteContract()

    // Watch transaction
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })

    useEffect(() => {
        if (isConfirmed) {
            toast.success("Transaction Confirmed on Blockchain!")
        }
        if (writeError) {
            toast.error(`Transaction Failed: ${writeError.message}`)
        }
    }, [isConfirmed, writeError])

    // --- Reads ---

    const { data: allMedicines, refetch: refetchMedicines } = useReadContract({
        address: MEDICHAIN_ADDRESS,
        abi: MEDICHAIN_ABI,
        functionName: 'getAllMedicines',
    })

    const { data: myInventory, refetch: refetchInventory } = useReadContract({
        address: MEDICHAIN_ADDRESS,
        abi: MEDICHAIN_ABI,
        functionName: 'getMyInventory',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        }
    })

    // --- Writes ---

    const registerMedicine = async (name: string, sku: string, category: string, dosage: string, manufacturer: string, ingredients: string) => {
        writeContract({
            address: MEDICHAIN_ADDRESS,
            abi: MEDICHAIN_ABI,
            functionName: 'registerMedicine',
            args: [name, sku, category, dosage, manufacturer, ingredients],
        })
    }

    const createBatch = async (batchId: string, sku: string, quantity: number, expiryDate: number, location: string) => {
        writeContract({
            address: MEDICHAIN_ADDRESS,
            abi: MEDICHAIN_ABI,
            functionName: 'createBatch',
            args: [batchId, sku, BigInt(quantity), BigInt(expiryDate), location],
        })
    }

    const transferBatch = async (batchId: string, to: `0x${string}`, location: string, title: string, description: string, newStatus: number) => {
        writeContract({
            address: MEDICHAIN_ADDRESS,
            abi: MEDICHAIN_ABI,
            functionName: 'transferBatch',
            args: [batchId, to, location, title, description, newStatus],
        })
    }

    return {
        // Data
        allMedicines,
        myInventory,
        isLoading: isPending || isConfirming,
        isConfirmed,

        // Actions
        registerMedicine,
        createBatch,
        transferBatch,
        refetchMedicines,
        refetchInventory
    }
}
