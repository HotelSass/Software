'use client'
import React, { useState } from 'react'
import { MeasurementServer } from '../server/Measurement';
import { VendorServer } from '../server/Vendor';

const Client = () => {
    const [selection, setSelection] = useState('Measurement')

    return (
        <div className='p-6 px-8 flex flex-row h-full'>
            <div className="w-48 border-r border-gray-300 h-3/4 flex flex-col">
                <button type='button' onClick={()=>setSelection("Measurement")} className='text-[14px] font-thin text-gray-700 hover:bg-gray-100 p-2 py-3 cursor-pointer border-b border-b-gray-100 mr-2 text-left'>
                    Measurement Metrics
                </button>
                <button type='button' onClick={()=>setSelection("Vendor")} className='text-[14px] font-thin text-gray-700 hover:bg-gray-100 p-2 py-3 cursor-pointer border-b border-b-gray-100 mr-2 text-left'>
                    Vendors
                </button>
            </div>

            {selection == "Measurement" &&
                <>
                    {/* @ts-expect-error Async Server Component */}
                    <MeasurementServer />
                </>
            }
            {selection == "Vendor" &&
                <>
                    {/* @ts-expect-error Async Server Component */}
                    <VendorServer />
                </>
            }


        </div>
    )
}

export default Client