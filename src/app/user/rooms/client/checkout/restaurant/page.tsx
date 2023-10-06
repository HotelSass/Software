'use client'
import Modal from '@/components/modal'
import serverUrl from '@/config/config';
import Image from 'next/image';
import React, { useState } from 'react'


const TableCheckOut = ({ data, reload }: any) => {
  const [openPayment, setOpenPayment] = useState(false)
  const [givenAmount, setGivenAmount] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [cash, setCash] = useState(true)
  const [platform, setPlatform] = useState('fonepay')
  const totalPayment = getTotal() ? getTotal().total : 0
  const [open, setOpen] = useState(false)
  const [discount, setDiscount] = useState(0)
  function getServiceCharge() {
    let num = 0
    if (data) {
      if (data.order) {
        const temp = data.order[0]
        for (let i = 0; i < temp.length; i++) {

          if (temp[i].serviceCharge) {
            num = num + temp[i].quantity * (temp[i].price || 0) * 0.1
          }
        }
        if (temp.length == 0) {
          return 0
        }
        return num
      } else {
        return 0
      }
    }else{
      return 0
    }
  }
  function getTotal() {

    let quantity = 0
    let total = 0
    if (data && data.order) {
      for (let i = 0; i < data.order.length; i++) {
        for (let j = 0; j < data.order[i].length; j++) {
          quantity = quantity + data.order[i][j].quantity
          total = total + data.order[i][j].quantity * data.order[i][j].price
        }
      }
    }
    total = total + getServiceCharge()
    return { quantity, total }
  }

  function getFullTotal() {
    let fullTotal = Math.abs(getTotal().total) - Math.abs(discount)
    return fullTotal
  }

  async function submitData() {
    setOpen(false)
    reload()
    try {
      const response = await fetch(serverUrl + "/user/checkout/checkoutTable", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data,
          discount,
          paymentType: "cash",
          total: getFullTotal()
        })

      });


    } catch (err) {
      console.log(err)
    }
  }
  async function submitDataOnline() {
    setOpen(false)
    reload()
    try {
      const response = await fetch(serverUrl + "/user/checkout/checkoutTable", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data,
          discount,
          paymentType: "online",
          account: platform,
          total: getFullTotal()
        })

      });
     
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <button type='button' onClick={() => { if (data.order) { if (data.order.length > 0) { setOpen(true) } } }} className='bg-red-700 w-full text-center text-white p-4 rounded-xl'>Check Out</button>
      <Modal open={open} setOpen={setOpen} width={800} height={900}>
        <Modal open={openPayment} setOpen={setOpenPayment} width={900} height={900}>
          <div className="flex flex-col pb-8">
            <div className="rounded-lg flex p-4 bg-gray-800">
              <p className='p-4 text-[20px] text-white my-auto'>
                Total Payment:
              </p>
              <p className='p-4 text-[30px] text-white ml-auto'>
                Rs. {getFullTotal()}
              </p>
            </div>
            <div className="flex flex-row mt-8">
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input checked={cash} onChange={() => setCash(!cash)} type="checkbox" value="" className="sr-only peer " />
                <div className="w-14 h-7 bg-green-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{cash ? "Cash" : "Online"}</span>
              </label>

            </div>
            <div className="flex flex-row mt-3 space-x-5">
              {!cash &&
                <div className="flex">
                  <button onClick={() => setPlatform('fonepay')} className={platform == 'fonepay' ? 'p-2 rounded-lg border-2 border-blue-700 mx-4 ml-0' : 'p-2 rounded-lg border border-gray-200 mx-4 ml-0'}>
                    <Image
                      src="/images/fonepay.png"
                      width={200}
                      height={50}
                      alt="Picture of the author"
                    />
                  </button>
                  <button onClick={() => setPlatform('gibl')} className={platform == 'gibl' ? 'p-2 rounded-lg border-2 border-blue-700 mx-4 ml-0' : 'p-2 rounded-lg border border-gray-200 mx-4 ml-0'}>
                    <Image
                      src="/images/gibl.png"
                      width={200}
                      height={50}
                      alt="Picture of the author"
                    />
                  </button>
                  <button onClick={() => setPlatform('hbl')} className={platform == 'hbl' ? 'p-2 rounded-lg border-2 border-blue-700 mx-4 ml-0' : 'p-2 rounded-lg border border-gray-200 mx-4 ml-0'}>
                    <Image
                      src="/images/hbl.png"
                      width={200}
                      height={50}
                      alt="Picture of the author"
                    />
                  </button>
                </div>
              }
            </div>
            {cash ?
              <div className="flex space-x-5 mt-10">
                <div className="rounded-lg flex-1 p-4 bg-gray-800 flex flex-col">
                  <p className='text-gray-200 text-[10px] ml-2'>Cash Given By Client</p>
                  <input type="text" value={givenAmount} onChange={(e) => setGivenAmount(e.target.value)} pattern='[0-9]*' placeholder='Amount' className='px-3 w-full h-full rounded-xl bg-gray-500 text-gray-100' />
                </div>
                <div className="rounded-lg flex p-4 bg-gray-800">
                  <p className='p-4 text-[20px] text-white'>
                    Return:
                  </p>
                  <p className='p-4 text-[20px] text-white ml-auto'>
                    Rs. {parseFloat(givenAmount) - totalPayment > 0 ? parseFloat(givenAmount) - totalPayment : 0}
                  </p>
                </div>
                <button onClick={() => { submitData() }} type='button' className="rounded-lg flex p-4 bg-red-700">
                  <p className='p-4 text-[20px] text-white'>
                    Checkout
                  </p>

                </button>
              </div>
              :
              <div className="flex space-x-5 mt-10">
                <div className="rounded-lg flex-1 p-4 bg-gray-800 flex flex-col">
                  <p className='text-gray-200 text-[10px] ml-2'>Phone Number</p>
                  <input type="text" placeholder='Phone Number' onChange={(e) => setPhoneNumber(e.target.value)} className='px-3 w-full h-full rounded-xl bg-gray-500 text-gray-100' />
                </div>
                <button onClick={() => { submitDataOnline() }} type='button' className="rounded-lg flex p-4 bg-red-700">
                  <p className='p-4 text-[20px] text-white'>
                    Checkout
                  </p>

                </button>
              </div>}
          </div>
        </Modal>
        <form onSubmit={(e) => submitData()} className=' h-full'>
          <div className="flex flex-row h-full">
            <div className="flex-1 px-10 h-full">

              <form className='flex flex-col space-y-4'>
                <div className="text-[20px] font-thin tracking-tight ml-2 my-5 ">Table Order</div>

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-[10px] rounded">
                  <thead className=" text-[14px] = uppercase bg-gray-100 dark:bg-gray-700 text-gray-200">
                    <tr className='bg-slate-800'>
                      <th scope="col" className="px-6 py-5 rounded-l-lg">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-5">

                      </th>
                      <th scope="col" className="px-6 py-5 rounded-r-lg">
                        Price
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr className={"bg-gray-300 border-b"}>
                      <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                        Food Bill Total:
                      </th>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                        Rs.
                        {getTotal().total}
                      </td>
                    </tr>
                    <tr className={"bg-gray-300 border-b"}>
                      <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                        Discount:
                      </th>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                        Rs.
                        <input type="number" min={0} className='bg-gray-300 w-14' defaultValue={discount} onChange={(e) => { if ((getTotal().total - parseInt(e.target.value)) >= 0 && parseInt(e.target.value) >= 0) setDiscount(parseInt(e.target.value)) }} />
                      </td>
                    </tr>

                  </tbody>
                  <tfoot>
                    <tr className="font-semibold text-gray-100 bg-slate-800">
                      <th scope="row" className="px-6 py-3 text-base text-[14px]">Grand Total:</th>
                      <td className="px-6 py-3 text-[14px]"></td>

                      <td className="px-6 py-3 text-[14px]">Rs.{getFullTotal() || getTotal().total} </td>
                    </tr>
                  </tfoot>
                </table>
                <button type='button' onClick={() => setOpenPayment(true)} className='bg-red-700 text-white rounded p-3 px-6 flex-1 mt-7'>Checkout</button>
              </form>
            </div>

          </div>
        </form>
      </Modal>
    </>

  )
}

export default TableCheckOut