import React, { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

const PurchaseBill = ({ vendorList, location, unit }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [defaultDate, setDefaultDate] = useState('');
  const [rows, setRows] = useState([{ key: Date.now().toString(), itemName: "", quantity: "" }]);



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

  function deleteRows(id: any) {
    let temp = rows
    const updatedRows = temp.filter(row => row.key !== id);
    setRows([...updatedRows])
  }
  function updateValue(e: any, key: string, index: number) {
    const temp = [...rows];
    if (temp[index].hasOwnProperty(key.toString())) {
      temp[index][key as keyof typeof temp[0]] = e.target.value;
      setRows([...temp])
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <button type='button' onClick={() => onOpen()} className='p-3 bg-blue-600 rounded text-white w-64 ml-auto my-auto text-[12px]'>Send to Laundry</button>
      <Modal scrollBehavior='inside' size='5xl' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 my-5 text-[24px] ">Send New Item</ModalHeader>
              <ModalBody>
                <form onSubmit={(e) => { onSubmit(e) }} className='flex flex-col  bg-gray-200 py-8 rounded-md px-4' action="">
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

                  <div className="">
                    <p className='text-[16px] font-normal px-4 py-6 text-gray-600'>Laundry Items</p>

                    <div className='bg-white rounded-lg p-4 w-full shadow'>
                      <table className='w-full'>
                        <thead>
                          <tr className='m-3 p-4 bg-gray-100 rounded-lg'>
                            <th className='p-3 text-left text-gray-500 font-semibold text-[12px] uppercase'>Name</th>
                            <th className='p-3 text-left text-gray-500 font-semibold text-[12px] uppercase'>Quantity</th>
                            <th className='p-3 text-left text-gray-500 font-semibold text-[12px] uppercase'></th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((item1: any, index: number) => {
                            return (
                              <tr key={index} className='m-3 p-4 '>
                                <td className='p-3'>
                                  <input name='itemName[]' value={rows[index].itemName} onChange={(e) => { updateValue(e, 'itemName', index) }} required className="appearance-none bg-transparent border-b w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-[12px] text-[12px]" type="text" placeholder="Item Name" aria-label="Full name" />
                                </td>

                                <td className='p-3'>
                                  <input name='quantity[]' value={rows[index].quantity} onChange={(e) => { updateValue(e, 'quantity', index) }} required className="appearance-none bg-transparent w-full border-b text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-[12px] text-[12px]" type="text" placeholder="Quantity" aria-label="Quantity" />
                                </td>
                                <td className='p-3'>
                                  <button type='button' onClick={() => { deleteRows(item1.key) }}  >
                                    <MdClose />
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                          <tr>
                            <td className='flex pl-2 pt-6'>
                              <button type='button' className='flex' onClick={() => {
                                let temp = rows
                                temp.push({ key: Date.now().toString(), itemName: "", quantity: "" })
                                setRows([...temp]);
                              }}>
                                <BiPlus className='my-auto' color='#7f7f7f' size={16} />
                                <p className='my-auto text-light text-[12px] text-gray-500'>Add New</p>
                              </button>
                            </td>
                          </tr>
                        </tbody>

                      </table>
                    </div>
                    <div className="w-full flex flex-row">
                      <div className="flex-1"></div>
                      <button type='submit' className='bg-blue-600 text-white p-3 text-[12px] mt-4 w-64 ml-auto rounded-sm'>
                        Send Item To Laundry
                      </button>
                    </div>


                  </div>

                </form >
              </ModalBody>
              <ModalFooter>
                
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div >
  )
}

export default PurchaseBill