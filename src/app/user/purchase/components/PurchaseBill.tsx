import React, { useEffect, useRef, useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import serverUrl from '@/config/config';
import { useRouter } from 'next/navigation';
import { addNewVendor } from '@/app/admin/setting/function/functions';

const PurchaseBill = ({ vendorList, location, unit }: any) => {
  const formRef = useRef(null);
  const [defaultDate, setDefaultDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [total, setTotal] = useState(0)
  const [purchaseType, setPurchaseType] = useState('cash')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure()
  const [vendorPhone, setVendorPhone] = useState("")

  const [rows, setRows] = useState([{ key: Date.now().toString(), itemName: "", location: location[0].location, quantity: "", expendable: false, unit: unit[0].measurement, price: '' }]);
  const router = useRouter()



  async function submitVendor(e: any, onClose: any, router: any) {
    e.preventDefault()
    onClose()
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const address = formData.get('address');
    const phone = formData.get('phone');
    const account = formData.get('account');

    const response = await addNewVendor({ name, address, phone, account })
    if (response) {
      router.refresh()
    }
  }
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
    if (isOpen) {
      onOpenChange()
    }
    const formData = new FormData(e.target)
    const vendorId = formData.get("name")
    const billNo = formData.get("billNo")
    const billDate = formData.get("billDate")
    const paymentType = purchaseType.toLowerCase()

    setRows([{ key: Date.now().toString(), itemName: "", location: location[0].location, quantity: "", expendable: false, unit: unit[0].measurement, price: '' }])

    if (formRef.current) {
      // @ts-ignore
      formRef.current.reset(); // Reset the form
    }
    let vendorName;
    for (let i = 0; i < vendorList.length; i++) {
      if (vendorList[i]._id == vendorId) {
        vendorName = vendorList[i].name
        break
      }
    }

    try {
      const response = await fetch(serverUrl + "/user/finance/addPurchaseRecord", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vendorId, vendorName, billNo, billDate, itemArray: rows, paymentType,total
        })

      });
      if (response.ok) {
        setPurchaseType('cash')
        router.refresh()

      } else {
      }

    } catch (err) {
      console.log(err)
    }

  }

  function deleteRows(id: any) {
    let temp = rows
    const updatedRows = temp.filter(row => row.key !== id);
    setRows([...updatedRows])
  }
  function updateValue(e: any, key: string, index: number) {
    const temp: any[] = [...rows]; // Assuming rows is of type Row[]
    if (temp[index].hasOwnProperty(key)) {
      temp[index][key] = e.target.value;
      setRows([...temp])
    }
    getTotalFromPurchase(rows)
  }
  function updateChecked(e: boolean, key: string, index: number) {
    const temp = [...rows];
    temp[index]['expendable'] = e;
    setRows([...temp])

  }

  function getTotalFromPurchase(row1: any) {
    let val = 0
    row1.map((item: any) => {
      const quantity = item.quantity == "" ? 0 : parseInt(item.quantity)
      const price = item.price == "" ? 0 : parseInt(item.price)
      const value = Math.abs(quantity) * Math.abs(price)
      val = val + value
    })
    setTotal(val)
  }
  function getTotalForRow(row1: any, index: number) {
    const item = row1[index]

    const quantity = item.quantity == "" ? 0 : parseInt(item.quantity)
    const price = item.price == "" ? 0 : parseInt(item.price)
    const value = Math.abs(quantity) * Math.abs(price)
    return value
  }

  function getPhoneNumber(id: string) {
    if (id == "") {
      setVendorPhone("")
    }
    vendorList.map((item: any) => {
      if (item._id == id) {
        setVendorPhone(item.phone)
      }
    })
    return ""
  }

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    setMinDate(formattedDate);
  }, []);

  useEffect(() => {
    getTotalFromPurchase(rows)
  }, [rows])



  return (
    <div className="flex-1 flex flex-col">

      <p className='text-[20px] font-semibold mb-2'>Purchase Bill</p>
      <p className='text-[12px] text-gray-500 '>Enter the Purchase Bill Obtained From The Market</p>
      <form ref={formRef} id='tableForm' onSubmit={(e) => { onSubmit(e) }} className='flex flex-col mt-8 bg-gray-200 py-8 rounded-md px-4' action="">
        <div className="flex flex-row ">
          <div className="flex-1 px-2">
            <label className="block mb-1 text-[12px] text-gray-500 dark:text-white font-normal ml-1">Vendor Name</label>
            <select required name='name' onChange={(e) => { getPhoneNumber(e.target.value) }} className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white" id="username" placeholder="Vendor Name" >
              <option className='text-[12px] text-gray-400' value={""} selected>Select Vendor Name</option>
              {vendorList.map((item: any, index: number) => (
                <option key={index} className='capitalize' value={item._id}>
                  <p className='capitalize'>{(item.name).toUpperCase()}</p>
                </option>
              ))}
            </select>
            <div className="flex flex-col text-left">
              {vendorPhone != "" &&
                <button onClick={onOpen2} className='text-[14px] text-gray-600 ml-2 my-2 text-left'>Phone No. {vendorPhone}</button>
              }
              <button onClick={onOpen2} className='text-[12px] text-blue-600 underline ml-2 text-left '>Add New Vendor</button>
            </div>
            <Modal backdrop='blur' isOpen={isOpen2} onOpenChange={onOpenChange2} isDismissable={false}>
              <ModalContent >
                {(onClose) => (
                  <form id='newVendorForm' onSubmit={(e) => { submitVendor(e, onOpenChange2, router) }}>
                    <ModalHeader className="flex flex-col gap-1 text-[24px] text-gray-700 pt-8 pb-3">Add New Vendor</ModalHeader>
                    <ModalBody >

                      <div className="flex flex-col space-y-2">
                        <div>
                          <label className="font-normal text-ssm ml-1 text-gray-500" htmlFor="roomRate">
                            Vendor Name
                          </label>
                          <input required name='name' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px]" id="username" type="text" placeholder="Vendor Name" />
                        </div>
                        <div>
                          <label className="font-normal text-ssm ml-1 text-gray-500" htmlFor="roomRate">
                            Vendor Address
                          </label>
                          <input required name='address' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px]" id="username" type="text" placeholder="Vendor Address" />
                        </div>
                        <div>
                          <label className="font-normal text-ssm ml-1 text-gray-500" htmlFor="roomRate">
                            Phone
                          </label>
                          <input required name='phone' className=" border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px]" id="username" type="text" placeholder="Phone Number" />
                        </div>
                        <div>
                          <label className="font-normal text-ssm ml-1 text-gray-500" htmlFor="roomRate">
                            Bank Details
                          </label>
                          <input name='account' className=" border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px]" id="username" type="text" placeholder="Account Number" />
                        </div>

                      </div>

                    </ModalBody>
                    <ModalFooter>

                      <button form='newVendorForm' type='submit' className='bg-blue-600 text-white p-3 text-[12px] rounded-sm mt-4 w-44 ml-auto flex flex-row'>
                        <p className='my-auto flex-1'>Add</p>
                      </button>
                    </ModalFooter>
                  </form>
                )}
              </ModalContent>
            </Modal>
          </div>
          <div className="flex-1 px-2">
            <label className="block mb-1 text-[12px] text-gray-500 dark:text-white font-normal ml-1">Bill No.</label>
            <input required name='billNo' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white" id="username" placeholder="Enter Bill Number" />
          </div>
          <div className="flex-1 px-2">
            <label className="block mb-1 text-[12px] text-gray-500 dark:text-white font-normal ml-1">Bill Date.</label>
            <input required type='date' value={defaultDate} min={minDate} name='billDate' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white" id="username" placeholder="Enter Bill Number" />
          </div>
        </div>


        <div className="">
          <p className='text-[14px] font-normal px-4 py-6 text-gray-600'>Bill Items</p>

          <div className='bg-white rounded-lg p-4 w-full shadow'>
            <table className='w-full'>
              <thead>
                <tr className='m-3 p-4 bg-gray-100 rounded-lg'>
                  <th className=''></th>
                  <th className=''></th>
                  <th className='p-3 text-gray-500 font-semibold text-[12px] text-left uppercase'>Name</th>
                  <th className='p-3 text-left text-gray-500 font-semibold text-[12px] uppercase'>Storage Location</th>
                  <th className='p-3 text-left text-gray-500 font-semibold text-[12px] uppercase'>Quantity</th>
                  <th className='p-3 text-left text-gray-500 font-semibold text-[12px] uppercase'>Expendable</th>
                  <th className='p-3 text-left text-gray-500 font-semibold text-[12px] uppercase'>Unit</th>
                  <th className='p-3 text-left text-gray-500 font-semibold text-[12px] uppercase'>Price</th>
                  <th className='p-3 text-left text-gray-500 font-semibold text-[12px] uppercase'></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item1: any, index: number) => {

                  return (
                    <tr key={index} className='m-3 p-4 '>
                      <td className='w-2 px-2'>
                        <span onClick={() => { deleteRows(item1.key) }}  >
                          <MdClose size={20} />
                        </span>
                      </td>
                      <td>

                      </td>

                      <td className=' flex flex-row'>
                        <input name='itemName[]' value={rows[index].itemName} onChange={(e) => { updateValue(e, 'itemName', index) }} required className="appearance-none bg-transparent border-b w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none placeholder:text-[12px] text-[12px]" type="text" placeholder="Item Name" aria-label="Full name" />
                      </td>
                      <td className=''>
                        <select required name='storageLocation[]' value={rows[index].location} onChange={(e) => { updateValue(e, 'location', index) }} className="capitalize border-b border-gray-200 w-full py-2 px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white" id="username" placeholder="Vendor Name" >
                          {location.map((item: any, index: number) => (
                            <option key={index} className='capitalize' value={item.location}>{item.location}</option>
                          ))}

                        </select>
                      </td>
                      <td className='p-3'>
                        <input name='quantity[]' value={rows[index].quantity} onChange={(e) => { updateValue(e, 'quantity', index) }} required className="appearance-none bg-transparent border-b w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none placeholder:text-[12px] text-[12px]" type="text" placeholder="Quantity" aria-label="Quantity" />
                      </td>
                      <td className='p-3 items-center'>
                        <div className='w-full'>
                          <input checked={rows[index].expendable} onChange={(e) => { updateChecked(e.target.checked, 'quantity', index) }} id="checked-checkbox" type="checkbox" value="" className="ml-auto w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                      </td>

                      <td className='p-3'>
                        <select required name='unit[]' value={rows[index].unit} onChange={(e) => { updateValue(e, 'unit', index) }} className="capitalize border-b border-gray-200 w-full py-2  px-3 text-gray-700 placeholder:text-[12px] text-[12px] bg-white " id="username" placeholder="Vendor Name" >
                          {unit.map((item: any, index: number) => (
                            <option key={index} className='capitalize' value={item.measurement}>{item.measurement}</option>
                          ))}

                        </select>
                      </td>
                      <td className='p-3 flex flex-row'>
                        <input name='price[]' value={rows[index].price} onChange={(e) => { updateValue(e, 'price', index) }} required className="appearance-none bg-transparent border-b w-28 text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none placeholder:text-[12px] text-[12px] flex-1 " type="text" placeholder="Purchase Price" aria-label="Purchase Price" />

                      </td>
                      <td className='text-gray-500 font-semibold text-[12px] capitalize text-right pr-3 w-28'>
                        Rs. {getTotalForRow(rows, index)}
                      </td>

                    </tr>
                  )
                })}
                <tr className='m-3 p-4 bg-gray-200 rounded-lg'>
                  <th className='p-3 text-left text-gray-800 font-medium text-[12px] capitalize' colSpan={8}>Total</th>
                  <th className='p-3 text-gray-500 font-semibold text-[12px] capitalize text-right w-28'>Rs. {total}</th>
                </tr>
                <tr>
                  <td className='flex pl-2 pt-6'>
                    <button type='button' className='flex' onClick={() => {
                      let temp = rows
                      temp.push({ key: Date.now().toString(), itemName: "", location: "", quantity: "", expendable: false, unit: '', price: '' })
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
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Select Payment Type</ModalHeader>
                  <ModalBody>
                    <div className="flex space-x-2 pb-2">
                      <button type='button' onClick={() => setPurchaseType('cash')} className='bg-green-600 text-white p-3 text-[12px] rounded-sm mt-4 w-44 ml-auto flex flex-row'>
                        <p className='my-auto flex-1'>Cash</p>
                        {purchaseType == 'cash' &&
                          <BsCheckCircleFill color='#fff' size={18} className='my-auto' />
                        }
                      </button>
                      <button type='button' onClick={() => setPurchaseType('online')} className='bg-green-600 text-white p-3 text-[12px] rounded-sm mt-4 w-44 ml-auto flex flex-row'>
                        <p className='my-auto flex-1'>Bank</p>
                        {purchaseType == 'online' &&
                          <BsCheckCircleFill color='#fff' size={18} className='my-auto' />
                        }
                      </button>
                      <button type='button' onClick={() => setPurchaseType('credit')} className='bg-green-600 text-white p-3 text-[12px] rounded-sm mt-4 w-44 ml-auto flex flex-row'>
                        <p className='my-auto flex-1'>Credit</p>
                        {purchaseType == 'credit' &&
                          <BsCheckCircleFill color='#fff' size={18} className='my-auto' />
                        }
                      </button>
                    </div>

                  </ModalBody>
                  <ModalFooter>

                    <button form='tableForm' type='submit' className='bg-orange-600 text-white p-3 text-[12px] rounded-sm mt-4 w-44 ml-auto flex flex-row'>
                      <p className='my-auto flex-1'>Send Bill</p>
                    </button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <div className="w-full">
            <button onClick={onOpen} type='button' className='bg-green-600 text-white p-3 text-[12px] rounded-sm mt-4 w-44 ml-auto'>
              Post Bill
            </button>
          </div>


        </div>

      </form >
    </div >
  )
}

export default PurchaseBill