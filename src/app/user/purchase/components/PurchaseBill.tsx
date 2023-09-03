import React, { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

const PurchaseBill = ({ vendorList, location, unit }: any) => {
  console.log(vendorList)
  const [defaultDate, setDefaultDate] = useState('');

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
  return (
    <div className="flex-1 flex flex-col">
      <p className='text-[20px] font-semibold mb-2'>Purchase Bill</p>
      <p className='text-[12px] text-gray-500 '>Enter the Purchase Bill Obtained From The Market</p>
      <form className='flex flex-col mt-8 bg-gray-200 py-8 rounded-md px-4' action="">
        <div className="flex flex-row ">
          <div className="flex-1 px-2">
            <label className="block mb-1 text-[12px] text-gray-500 dark:text-white font-normal ml-1">Vendor Name</label>
            <select required name='name' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white" id="username" placeholder="Vendor Name" >
              <option className='text-[12px] text-gray-400' selected>Select Vendor Name</option>
              {vendorList.map((item: any, index: number) => (
                <option key={index} className='capitalize' value={item._id}>{item.name}</option>
              ))}

            </select>

          </div>
          <div className="flex-1 px-2">
            <label className="block mb-1 text-[12px] text-gray-500 dark:text-white font-normal ml-1">Bill No.</label>
            <input required name='billNo' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white" id="username" placeholder="Enter Bill Number" />
          </div>
          <div className="flex-1 px-2">
            <label className="block mb-1 text-[12px] text-gray-500 dark:text-white font-normal ml-1">Bill Date.</label>
            <input required type='date' value={defaultDate} name='billDate' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white" id="username" placeholder="Enter Bill Number" />
          </div>
        </div>
        <div className="flex flex-row mt-3">
          <div className="flex-1 px-2">
            <label className="block mb-1 text-[12px] text-gray-500 dark:text-white font-normal ml-1">Purchase Type</label>
            <select required name='name' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white" id="username" placeholder="Purchase Type" >
              <option className='text-[12px] text-gray-400' value={"cash"} selected>Cash</option>
              <option className='text-[12px] text-gray-400' value={"credit"}>Credit</option>
              <option className='text-[12px] text-gray-400' value={"online"}>Online</option>
            </select>
          </div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>

        </div>
        <div className="">
          <p className='text-[14px] font-normal px-4 py-6 text-gray-600'>Bill Items</p>

          <div className='bg-white rounded-lg p-4 w-full shadow'>
            <table className='w-full'>
              <thead>
                <tr className='m-3 p-4 bg-gray-100 rounded-lg'>
                  <th className='p-3 text-left text-gray-500 font-semibold text-[12px] uppercase'>Name</th>
                  <th className='p-3 text-left text-gray-500 font-semibold text-[12px] uppercase'>Storage Location</th>
                  <th className='p-3 text-left text-gray-500 font-semibold text-[12px] uppercase'>Quantity</th>
                  <th className='p-3 text-left text-gray-500 font-semibold text-[12px] uppercase'>Unit</th>
                  <th className='p-3 text-left text-gray-500 font-semibold text-[12px] uppercase'>Price</th>
                  <th className='p-3 text-left text-gray-500 font-semibold text-[12px] uppercase'></th>
                </tr>
              </thead>
              <tbody>
                <tr className='m-3 p-4'>
                  <td className='p-3'>
                    <input className="appearance-none bg-transparent border-b w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-[12px] text-[12px]" type="text" placeholder="Item Name" aria-label="Full name" />
                  </td>
                  <td className='p-3'>
                    <select required name='name' className="capitalize border-b border-gray-200 w-full py-2 rounded px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white" id="username" placeholder="Vendor Name" >
                      <option className='text-[12px] text-gray-400' selected>Select Storage Location</option>
                      {location.map((item: any, index: number) => (
                        <option key={index} className='capitalize' value={item._id}>{item.location}</option>
                      ))}

                    </select>
                  </td>
                  <td className='p-3'>
                    <input className="appearance-none bg-transparent border-b w-24 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-[12px] text-[12px]" type="text" placeholder="Quantity" aria-label="Quantity" />
                  </td>

                  <td className='p-3'>
                    <select required name='name' className="capitalize border-b border-gray-200 w-full py-2 rounded px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white " id="username" placeholder="Vendor Name" >
                      <option className='text-[12px] text-gray-400' selected>Unit</option>
                      {unit.map((item: any, index: number) => (
                        <option key={index} className='capitalize' value={item._id}>{item.location}</option>
                      ))}

                    </select>
                  </td>
                  <td className='p-3'>
                    <input className="appearance-none bg-transparent border-b w-28 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-[12px] text-[12px]" type="text" placeholder="Purchase Price" aria-label="Purchase Price" />
                  </td>
                  <td className='p-3'>
                    <button>
                      <MdClose />
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <div className="flex flex-row mt-5">
                  <BiPlus color='#9f9f9f' size={16} className='my-auto' /> <p className='text-[14px] text-gray-400 font-light my-auto'> Add New</p>
                </div>
              </tfoot>
            </table>
          </div>



        </div>

      </form >
    </div >
  )
}

export default PurchaseBill