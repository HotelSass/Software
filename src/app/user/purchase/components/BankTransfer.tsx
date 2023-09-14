import serverUrl from '@/config/config';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

const BankTransfer = ({ vendorList, location, unit, bankDetail }: any) => {
  const [defaultDate, setDefaultDate] = useState('');
  const [rows, setRows] = useState([{ key: Date.now().toString(), itemName: "", location: "", quantity: "", unit: '', price: '' }]);
  const formRef = useRef(null);
  const router = useRouter()



  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setDefaultDate(getCurrentDate());
  }, []);

  async function onSubmit(e: any) {
    e.preventDefault()
    
    const formData = new FormData(e.target)
    const bankDetail = formData.get("bankDetail")
    const transferDate = formData.get("transferDate")
    const amount = formData.get("amount")
    if (formRef.current) {
      // @ts-ignore
      formRef.current.reset(); // Reset the form
    }
    try {
      const response = await fetch(serverUrl + "/user/finance/addBankTransfer", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bankAccount:bankDetail, transferDate, amount
        })

      });
      if (response.ok) {
        router.refresh()
       
      } else {
      }

    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="flex-1 flex flex-col">
      <p className='text-[20px] font-semibold mb-2'>Bank Transfer</p>
      <p className='text-[12px] text-gray-500 '>Transaction record of cash counter to bank transfer</p>
      <form ref={formRef} onSubmit={(e) => { onSubmit(e) }} className='flex flex-col mt-8 bg-gray-200 py-8 rounded-md px-4' action="">
        <div className="flex flex-row ">
          <div className="flex-1 px-2">
            <label className="block mb-1 text-[12px] text-gray-500 dark:text-white font-normal ml-1">Bank Detail</label>
            <select required name='bankDetail' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white" id="username" placeholder="Vendor Name" >
              <option className='text-[12px] text-gray-400' selected>Select Bank Account</option>
              {bankDetail.map((item: any, index: number) => (
                <option key={index} className='capitalize' value={item.accountNumber}>{item.bankName} ({item.accountNumber})</option>
              ))}
            </select>
          </div>
          <div className="flex-1 px-2">
            <label className="block mb-1 text-[12px] text-gray-500 dark:text-white font-normal ml-1">Transfer Date.</label>
            <input required type='date' value={defaultDate} name='transferDate' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white" id="username" placeholder="Enter Bill Number" />
          </div>
        </div>
        <div className="flex flex-row mt-3">
          <div className="flex-1 px-2">
            <label className="block mb-1 text-[12px] text-gray-500 dark:text-white font-normal ml-1">Transaction Amount.</label>
            <input required type='number' name='amount' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white" id="username" placeholder="Enter Transaction Amount" />
          </div>
          <div className="flex-1 px-2">
            <button type='submit' className='bg-green-600 text-white p-4 text-[12px] rounded-sm mt-5 w-full ml-auto'>
              Post Bill
            </button>
          </div>
        </div>
      </form >
    </div >
  )
}

export default BankTransfer