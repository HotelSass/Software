'use client'
import React, { useState } from 'react'
import PurchaseBill from '../components/PurchaseBill';
import BankTransfer from '../components/BankTransfer';

const Client = ({ vendorList, location, unit, bankDetail }: any) => {
    const [selected, setSelected] = useState('purchaseBill')

    return (
        <div className='py-6 flex flex-row h-full'>
            <div className="w-48 border-r border-gray-300 h-3/4 flex flex-col">
                <button type='button' onClick={() => { console.log("purchaseBill"); setSelected('purchaseBill') }} className='text-[14px] font-thin text-gray-700 hover:bg-gray-100 p-2 py-3 cursor-pointer border-b border-b-gray-100 mr-2 text-left'>
                    Purchase Bill
                </button>
                <button type='button' onClick={() => { console.log("bankTransfer"); setSelected('bankTransfer') }} className='text-[14px] font-thin text-gray-700 hover:bg-gray-100 p-2 py-3 cursor-pointer border-b border-b-gray-100 mr-2 text-left'>
                    Bank Transfer
                </button>
            </div>
            <div className="flex-1 px-4 flex flex-col pl-4">

                {selected == 'purchaseBill' &&
                    <>
                        <PurchaseBill vendorList={vendorList} location={location} unit={unit} />
                    </>

                }
                {selected == 'bankTransfer' &&
                    <>
                        <BankTransfer vendorList={vendorList} location={location} unit={unit} bankDetail={bankDetail} />
                    </>

                }
            </div>

        </div>
    )
}

export default Client