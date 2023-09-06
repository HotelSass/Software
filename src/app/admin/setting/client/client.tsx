'use client'
import React, { useState } from 'react'
import { MeasurementServer } from '../server/Measurement';
import { VendorServer } from '../server/Vendor';
import { StorageServer } from '../server/Storage';
import { BankDetailServer } from '../server/BankDetail';

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
                <button type='button' onClick={()=>setSelection("StorageLocation")} className='text-[14px] font-thin text-gray-700 hover:bg-gray-100 p-2 py-3 cursor-pointer border-b border-b-gray-100 mr-2 text-left'>
                    Storage Location
                </button>
                <button type='button' onClick={()=>setSelection("BankDetail")} className='text-[14px] font-thin text-gray-700 hover:bg-gray-100 p-2 py-3 cursor-pointer border-b border-b-gray-100 mr-2 text-left'>
                    Bank Detail
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
            {selection == "StorageLocation" &&
                <>
                    {/* @ts-expect-error Async Server Component */}
                    <StorageServer />
                </>
            }
            {selection == "BankDetail" &&
                <>
                    {/* @ts-expect-error Async Server Component */}
                    <BankDetailServer />
                </>
            }


        </div>
    )
}

export default Client