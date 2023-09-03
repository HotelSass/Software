'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import PurchaseServer from '../server/PurchaseServer';

const Client = () => {
    const router = useRouter()
    return (
        <div className='py-6 flex flex-row h-full'>
            <div className="w-48 border-r border-gray-300 h-3/4 flex flex-col">
                <a href="" className='text-[14px] font-thin text-gray-700 hover:bg-gray-100 p-2 py-3 cursor-pointer border-b border-b-gray-100 mr-2'>
                    Purchase Bill
                </a>
                <a href="" className='text-[14px] font-thin text-gray-700 hover:bg-gray-100 p-2 py-3 cursor-pointer border-b border-b-gray-100 mr-2'>
                    Bank Transfer
                </a>
            </div>
            <div className="flex-1 px-4 flex flex-col pl-4">
                {/* @ts-expect-error Async Server Component */}
                <PurchaseServer />

            </div>

        </div>
    )
}

export default Client