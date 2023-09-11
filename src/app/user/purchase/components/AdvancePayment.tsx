import React, { useEffect, useState } from 'react'

const AdvancePayment = ({ vendorList, location, unit, bankDetail }: any) => {
  const [defaultDate, setDefaultDate] = useState('');
  const [rows, setRows] = useState([{ key: Date.now().toString(), itemName: "", location: "", quantity: "", unit: '', price: '' }]);



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
    const vendorId = formData.get("name")
    const billNo = formData.get("billNo")
    const date = formData.get("date")
    const paymentType = formData.get("paymentType")

  }

  return (
    <div className="flex-1 flex flex-col">
      <p className='text-[20px] font-semibold mb-2'>Advance Payment</p>
      <p className='text-[12px] text-gray-500 '>Transaction record of each advance payment</p>
      <form onSubmit={(e) => { onSubmit(e) }} className='flex flex-col mt-8 bg-gray-200 py-8 rounded-md px-4' action="">
        <div className="flex flex-row ">
          <div className="flex-1 px-2">
          <label className="block mb-1 text-[12px] text-gray-500 dark:text-white font-normal ml-1">Name</label>
            <input required type='text' name='name' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white" id="username" placeholder="Enter Name" />
          </div>
          <div className="flex-1 px-2">
            <label className="block mb-1 text-[12px] text-gray-500 dark:text-white font-normal ml-1">Date.</label>
            <input required type='date' value={defaultDate} name='transferDate' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white" id="username" placeholder="Enter Bill Number" />
          </div>
        </div>
        <div className="flex flex-row mt-3">
          <div className="flex-1 px-2">
            <label className="block mb-1 text-[12px] text-gray-500 dark:text-white font-normal ml-1">Transaction Amount.</label>
            <input required type='number' value={defaultDate} name='amount' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white" id="username" placeholder="Enter Transaction Amount" />
          </div>
          <div className="flex-1 px-2">
            <button type='submit' className='bg-green-600 text-white p-4 text-[12px] rounded-sm mt-5 w-full ml-auto'>
              Post Payment
            </button>
          </div>
        </div>
      </form >
    </div >
  )
}

export default AdvancePayment