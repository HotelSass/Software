'use client'
import Modal from '@/components/modal'
import serverUrl from '@/config/config';
import Image from 'next/image';
import React, { use, useState } from 'react'
const distribution = {
  'ml30': '30 ml',
  'ml60': '60 ml',
  'ml90': '90 ml',
  'ml180': '180 ml',
  'half': 'Half',
  'full': 'Full',
}
function dateDifference(startDateStr: string, endDateStr: string) {
  // Convert the date strings to Date objects
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  // Calculate the time difference in milliseconds
  const timeDifferenceMs = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to days
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const dateDifferenceDays = Math.floor(timeDifferenceMs / millisecondsPerDay);

  return dateDifferenceDays;
}

function getTotal(data: any) {

  let quantity = 0
  let total = 0
  if (data.orders) {
    for (let i = 0; i < data.orders.length; i++) {
      for (let j = 0; j < data.orders[i].length; j++) {
        quantity = quantity + data.orders[i][j].quantity
        total = total + data.orders[i][j].quantity * data.orders[i][j].price
      }
    }
  }
  total = total + getServiceCharge(data)
  return { quantity, total }
}

function getServiceCharge(data: any) {
  let num = 0

  if (data.orders) {

    for (let j = 0; j < data.orders.length; j++) {
      const temp = data.orders[j]
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].serviceCharge == true) {
          num = num + temp[i].quantity * (temp[i].price || 0) * 0.1
        }
      }
    }
    return num
  } else {
    return 0
  }
}
function getServiceChargeForRoom(data: any, roomNumber: number) {
  let num = 0

  if (data.orders) {

    for (let j = 0; j < data.orders.length; j++) {
      const temp = data.orders[j]
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].room == roomNumber) {
          if (temp[i].serviceCharge == true) {
            num = num + temp[i].quantity * (temp[i].price || 0) * 0.1
          }
        }
      }
    }
    return num
  } else {
    return 0
  }
}

const RoomCheckOut = ({ open, setOpen, data, reload }: any) => {
  const [openRoomDetail, setOpenRoomDetail] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [openPayment, setOpenPayment] = useState(false)
  const [givenAmount, setGivenAmount] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [openFoodDetail, setOpenFoodDetail] = useState(false)
  const [showRoomModal, setShowRoomModal] = useState(false)
  const [partialCheckOut, setPartialCheckout] = useState(false)
  const [openPartialPaymentSlip, setOpenPartialPaymentSlip] = useState(false)
  const [cash, setCash] = useState(true)
  const [showCredit, setShowCredit] = useState(false)
  const [searchForCredit, setSearchForCredit] = useState('')
  const [selectedPartialCheckout, setSelectedPartialCheckout] = useState({ room: Number, checkIn: String, roomRate: String, checkOut: String, status: String })
  const [platform, setPlatform] = useState('fonepay')
  const totalPayment = getFullTotal()

  function getFullTotal() {
    if (data.advance) {
      console.log(getTotalRoomPrice(), parseFloat(data.advance), discount, getTotal(data).total)
      let fullTotal = getTotalRoomPrice() - parseFloat(data.advance) - discount + getTotal(data).total
      return fullTotal
    } else {
      let fullTotal = getTotalRoomPrice() - discount + getTotal(data).total
      return fullTotal
    }

  }
  function getTotalRoomPrice() {
    let value = 0
    if (data.rooms) {
      data.rooms.map((item: any) => {
        if (item.status == 'inhouse' || item.status == 'checkedout') {
          value = value + getTotalResidenceDay(item.checkIn) * parseFloat(item.roomRate)
        }
      })
    }
    value = value
    return value || 0
  }
  async function onSubmitCash() {
    try {
      const response = await fetch(serverUrl + "/user/checkout/checkoutRoom", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data,
          discount,
          paymentType: "cash",
          account: null,
          total: getFullTotal()
        })

      });
      if (response.ok) {
        setOpen(false)
        reload()
      } else {
      }

    } catch (err) {
      console.log(err)
    }
  }
  async function onTransferCredit() {
    try {
      const response = await fetch(serverUrl + "/user/checkout/transferCredit", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data, discount, total: getFullTotal()

        })

      });
      if (response.ok) {
        setOpen(false)
        reload()
      } else {
      }

    } catch (err) {
      console.log(err)
    }
  }
  async function onPartialCash() {
    let temp1 = { ...data }
    let temp = { ...data }
    const t1: Object[] = []

    temp['rooms'] = [selectedPartialCheckout]
    console.log(selectedPartialCheckout)
    temp1.rooms.map((item: any) => {

      if (item.room != selectedPartialCheckout.room) {
        t1.push(item)
      }
    })
    temp1['rooms'] = t1
    let orderArray = []
    let notOrderArray = []

    if (data.orders) {
      for (let i = 0; i < data.orders.length; i++) {
        const tempArray = []
        const tempNotArray = []
        for (let j = 0; j < data.orders[i].length; j++) {
          console.log(selectedPartialCheckout.room)
          if (data.orders[i][j].roomNumber == selectedPartialCheckout.room) {
            tempArray.push(data.orders[i][j])
          } else {
            tempNotArray.push(data.orders[i][j])
          }
        }
        if (tempArray.length != 0) {
          orderArray.push(tempArray)
        }
        if (tempNotArray.length != 0) {
          notOrderArray.push(tempNotArray)
        }
      }
    }
    console.log(orderArray)
    temp['orders'] = orderArray
    temp1['orders'] = notOrderArray

    try {
      const response = await fetch(serverUrl + "/user/checkout/checkoutPartialRoom", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: temp,
          discount: 0,
          paymentType: "cash",
          account: null,
          total: fullPartialCheckOut(),
          temp1
        })

      });
      if (response.ok) {
        setOpen(false)
        reload()
      } else {
      }

    } catch (err) {
      console.log(err)
    }

  }
  async function onPartialOnline() {
    let temp1 = { ...data }
    let temp = { ...data }
    const t1: Object[] = []
    temp['rooms'] = [selectedPartialCheckout]
    temp1.rooms.map((item: any) => {
      if (item.room != selectedPartialCheckout.room) {
        t1.push(item)
      }
    })
    temp1['rooms'] = t1
    console.log(temp1)
    let orderArray = []
    let notOrderArray = []

    if (data.orders) {
      for (let i = 0; i < data.orders.length; i++) {
        const tempArray = []
        const tempNotArray = []
        for (let j = 0; j < data.orders[i].length; j++) {

          if (data.orders[i][j].roomNumber == selectedPartialCheckout.room) {
            tempArray.push(data.orders[i][j])
          } else {
            tempNotArray.push(data.orders[i][j])
          }
        }
        if (tempArray.length != 0) {
          orderArray.push(tempArray)
        }
        if (tempNotArray.length != 0) {
          notOrderArray.push(tempNotArray)
        }
      }
    }
    temp['orders'] = orderArray
    temp1['orders'] = notOrderArray
    try {
      const response = await fetch(serverUrl + "/user/checkout/checkoutPartialRoom", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: temp,
          discount: 0,
          paymentType: "online",
          account: platform,
          total: fullPartialCheckOut(),
          temp1
        })

      });
      if (response.ok) {
        setOpen(false)
        reload()
      } else {
      }

    } catch (err) {
      console.log(err)
    }
  }
  function fullPartialCheckOut() {
    return getTotalResidenceDay((selectedPartialCheckout.checkIn).toString()) * parseFloat((selectedPartialCheckout.roomRate).toString()) + getFoodTotalForRoom(parseInt((selectedPartialCheckout.room).toString())).total
  }
  async function onSubmitOnline() {
    try {
      const response = await fetch(serverUrl + "/user/checkout/checkoutRoom", {
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
      if (response.ok) {
        setOpen(false)
        reload()
      } else {
      }

    } catch (err) {
      console.log(err)
    }
  }
  function getTotalResidenceDay(checkIn: string) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    let days = dateDifference(checkIn, formattedDate)
    if (days == 0) return 1
    return Math.abs(days)
  }

  function getFoodTotalForRoom(room: number) {

    let quantity = 0
    let total = 0
    if (data.orders) {
      for (let i = 0; i < data.orders.length; i++) {
        for (let j = 0; j < data.orders[i].length; j++) {
          if (data.orders[i][j].roomNumber == room) {
            quantity = quantity + data.orders[i][j].quantity
            total = total + data.orders[i][j].quantity * data.orders[i][j].price
          }
        }
      }
    }
    total = total + getServiceChargeForRoom(data, room)
    return { quantity, total }
  }

  async function transferOrderAndCheckout() {
    try {
      const response = await fetch(serverUrl + "/user/checkout/transferOrderAndCheckout", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data,
          selectedPartialCheckout
        })

      });
      if (response.ok) {
        setOpen(false)
        reload()
      } else {
      }

    } catch (err) {
      console.log(err)
    }
  }

  function showCalculator() {
    setOpenPayment(true)
  }

  function showRoom() {
    setShowRoomModal(true)
  }

  function toggleShowCredit() {
    setShowCredit(true)
  }



  function seeIfExists() {
    const inhouse = [];
    if (data.rooms) {
      (data.rooms).map((item: any) => {
        if (item.status == 'inhouse') {
          inhouse.push(item.room)
        }
      })
      if (inhouse.length > 1) {
        return true
      }
    }
    return false
  }
  return (
    <Modal open={open} setOpen={setOpen} width={1000} height={900}>
      <Modal open={showRoomModal} setOpen={setShowRoomModal} width={800} height={600}>
        <Modal open={partialCheckOut} setOpen={setPartialCheckout} width={800} height={600}>
          <>
            <Modal open={openPartialPaymentSlip} setOpen={setOpenPartialPaymentSlip} width={900} height={900}>
              <div className="flex flex-col pb-8">
                <div className="rounded-lg flex p-4 bg-gray-800">
                  <p className='p-4 text-[20px] text-white my-auto'>
                    Total Payment:
                  </p>
                  <p className='p-4 text-[30px] text-white ml-auto'>
                    Rs. {fullPartialCheckOut()}
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
                        Rs. {parseFloat(givenAmount) - fullPartialCheckOut() > 0 ? parseFloat(givenAmount) - fullPartialCheckOut() : 0}
                      </p>
                    </div>
                    <button onClick={() => { onPartialCash() }} type='button' className="rounded-lg flex p-4 bg-red-700">
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
                    <button onClick={() => { onPartialOnline() }} type='button' className="rounded-lg flex p-4 bg-red-700">
                      <p className='p-4 text-[20px] text-white'>
                        Checkout
                      </p>

                    </button>
                  </div>}
              </div>
            </Modal>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-[10px] rounded">
              <thead className=" text-[14px] = uppercase bg-gray-100 dark:bg-gray-700 text-gray-200">
                <tr className='bg-slate-800 border-b'>
                  <th scope="col" className="px-6 py-5 rounded-l-lg">
                    Room
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Check in
                  </th>
                  <th scope="col" className="px-6 py-5 rounded-r-lg">
                    Rate
                  </th>
                  <th scope="col" className="px-6 py-5 rounded-r-lg">
                    Days
                  </th>
                  <th scope="col" className="px-6 py-5 text-center">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-5 text-center">

                  </th>

                </tr>
              </thead>
              <tbody>
                {selectedPartialCheckout && <>
                  <tr className={"bg-gray-300 border-b"}>
                    <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                      {(selectedPartialCheckout.room).toString()}
                    </th>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                      {selectedPartialCheckout.checkIn.toString()}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                      Rs. {selectedPartialCheckout.roomRate.toString()}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                      {getTotalResidenceDay(selectedPartialCheckout.checkIn.toString())} {getTotalResidenceDay(selectedPartialCheckout.checkIn.toString()) == 1 ? "day" : "days"}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] text-center">
                      Rs. {getTotalResidenceDay(selectedPartialCheckout.checkIn.toString()) * parseFloat(selectedPartialCheckout.roomRate.toString())}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] text-center">
                    </td>

                  </tr>

                </>}
                {getFoodTotalForRoom(parseInt(selectedPartialCheckout.room.toString())).total != 0 &&
                  <tr className='bg-gray-400 border-b'>
                    <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                      Food Bill
                    </th>
                    <th scope="col" className="px-6 py-5">
                    </th>
                    <th scope="col" className="px-6 py-5 rounded-r-lg">
                    </th>
                    <th scope="col" className="px-6 py-5 rounded-r-lg">
                    </th>
                    <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize text-center">
                      Rs. {getFoodTotalForRoom(parseInt(selectedPartialCheckout.room.toString())).total}
                    </th>
                    <th scope="col" className="px-6 py-5 text-center">

                    </th>

                  </tr>
                }
                <tr className='bg-gray-600 border-b'>
                  <th scope="row" className="px-6 py-4 text-gray-300 whitespace-nowrap font-light text-[14px] capitalize">
                    Grand Total
                  </th>
                  <th scope="col" className="px-6 py-5">
                  </th>
                  <th scope="col" className="px-6 py-5 rounded-r-lg">
                  </th>
                  <th scope="col" className="px-6 py-5 rounded-r-lg">
                  </th>
                  <th scope="row" className="px-6 py-4 text-gray-300 whitespace-nowrap font-light text-[14px] capitalize text-center">
                    Rs. {getTotalResidenceDay(selectedPartialCheckout.checkIn.toString()) * parseFloat(selectedPartialCheckout.roomRate.toString()) + getFoodTotalForRoom(parseInt(selectedPartialCheckout.room.toString())).total}
                  </th>
                  <th scope="col" className="px-6 py-5 text-center">

                  </th>

                </tr>
              </tbody>

            </table>

            <div className="flex flex-row my-8 gap-4">
              <button type='button' onClick={() => transferOrderAndCheckout()} className='flex-1 p-3 bg-blue-800 text-white text-center rounded-lg'>
                Transfer Order And CheckOut
              </button>
              <button onClick={() => { setOpenPartialPaymentSlip(true) }} type='button' className='flex-1 p-3 bg-red-800 text-white text-center rounded-lg'>
                Checkout
              </button>
            </div>
          </>
        </Modal>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-[10px] rounded">
          <thead className=" text-[14px] = uppercase bg-gray-100 dark:bg-gray-700 text-gray-200">
            <tr className='bg-slate-800 border-b'>
              <th scope="col" className="px-6 py-5 rounded-l-lg">
                Room
              </th>
              <th scope="col" className="px-6 py-5">
                Check in
              </th>
              <th scope="col" className="px-6 py-5 rounded-r-lg">
                Rate
              </th>
              <th scope="col" className="px-6 py-5 rounded-r-lg">
                Days
              </th>
              <th scope="col" className="px-6 py-5 text-center">
                Total
              </th>
              <th scope="col" className="px-6 py-5 text-center">

              </th>
            </tr>
          </thead>
          <tbody>
            {data.rooms && <>
              {data.rooms.map((item: any) => (
                <>
                  {(item.status == 'inhouse' || item.status == 'checkedout') &&
                    <tr className={"bg-gray-300 border-b"}>
                      <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                        {item.room}
                      </th>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                        {item.checkIn}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                        Rs. {item.roomRate}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                        {getTotalResidenceDay(item.checkIn)} {getTotalResidenceDay(item.checkIn) == 1 ? "day" : "days"}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] text-center">
                        Rs. {getTotalResidenceDay(item.checkIn) * parseFloat(item.roomRate)}
                      </td>
                      <td>
                        {item.status == 'inhouse' &&
                          <button type='button' onClick={() => { setSelectedPartialCheckout(item); setPartialCheckout(true) }} className="ml-auto px-6 py-4 text-white bg-red-600 whitespace-nowrap font-light text-[13px] text-center">
                            Check Out
                          </button>
                        }
                      </td>
                    </tr>
                  }
                </>
              ))}
            </>}
          </tbody>

        </table>
      </Modal>
      <Modal open={openFoodDetail} setOpen={setOpenFoodDetail} width={700} height={700}>
        {data.orders &&
          <>
            {data.orders.length > 0 &&
              <div className="flex-1 px-10 overflow-y-scroll h-[600px]">
                <div className="text-[24px] font-thin tracking-tight ml-4 mb-5">Restaurant & Room Order</div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-[10px] rounded">
                  <thead className=" text-[14px] = uppercase bg-gray-100 dark:bg-gray-700 text-gray-200">
                    <tr className='bg-slate-800' >
                      <th scope="col" className="px-6 py-5 rounded-l-lg">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-5">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-5 rounded-r-lg">
                        Rate
                      </th>
                      <th scope="col" className="px-6 py-5 rounded-r-lg">
                        Price
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    {data.orders &&
                      <>
                        {data.orders.map((item: any, index: number) => (
                          <>
                            {item.map((item1: any, index1: number) => (
                              <tr key={index1} className={item.length == index1 + 1 ? " bg-gray-300 border-b " : " bg-gray-300 "}>
                                <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                                  {index + 1}. {index1 + 1 + " "}{item1.itemName}
                                </th>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                                  {item1.label ? distribution[item1.label as keyof typeof distribution] : item1.quantity}

                                </td>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                                  Rs.{item1.price}
                                </td>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                                  Rs.{item1.price * item1.quantity}
                                </td>
                              </tr>
                            ))}
                          </>
                        ))}
                      </>}
                  </tbody>
                  <tfoot>
                    <tr className="font-semibold text-gray-100 bg-slate-800">
                      <th scope="row" className="px-6 py-3 text-[14px]">Service Charge</th>
                      <td className="px-6 py-3 text-[14px]"></td>
                      <td className="px-6 py-3 text-[14px]"></td>

                      <td className="px-6 py-3 text-[14px]">Rs.{getServiceCharge(data)}</td>
                    </tr>
                    <tr className="font-semibold text-gray-100 bg-slate-800">
                      <th scope="row" className="px-6 py-3 text-[14px]">Total</th>
                      <td className="px-6 py-3 text-[14px]"></td>
                      <td className="px-6 py-3 text-[14px]"></td>

                      <td className="px-6 py-3 text-[14px]">Rs.{getTotal(data).total}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            }
          </>
        }
      </Modal>
      <Modal open={openRoomDetail} setOpen={setOpenRoomDetail} width={800} height={700}>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-[10px] rounded">
          <thead className=" text-[14px] = uppercase bg-gray-100 dark:bg-gray-700 text-gray-200">
            <tr className='bg-slate-800'>
              <th scope="col" className="px-6 py-5 rounded-l-lg">
                Room
              </th>
              <th scope="col" className="px-6 py-5">
                Check in
              </th>
              <th scope="col" className="px-6 py-5 rounded-r-lg">
                Rate
              </th>
              <th scope="col" className="px-6 py-5 rounded-r-lg">
                Days
              </th>
              <th scope="col" className="px-6 py-5 text-center">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {data.rooms && <>
              {data.rooms.map((item: any) => (
                <>
                  {(item.status == 'inhouse' || item.status == 'checkedout') &&
                    <tr className={"bg-gray-300 border-b"}>
                      <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                        {item.room}
                      </th>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                        {item.checkIn}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                        Rs. {item.roomRate}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                        {getTotalResidenceDay(item.checkIn)} {getTotalResidenceDay(item.checkIn) == 1 ? "day" : "days"}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] text-center">
                        Rs. {getTotalResidenceDay(item.checkIn) * parseFloat(item.roomRate)}
                      </td>
                    </tr>
                  }
                </>
              ))}
            </>}



          </tbody>
          <tfoot>
            <tr className="font-semibold text-gray-100 bg-slate-800">
              <th scope="row" className="px-6 py-3 text-base text-[14px]">Grand Total:</th>
              <td className="px-6 py-3 text-[14px]"></td>
              <td className="px-6 py-3 text-[14px]"></td>

              <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] text-right">
              </td>
              <td className="px-6 py-3 text-[14px] text-center">Rs. {getTotalRoomPrice()}</td>

            </tr>
          </tfoot>
        </table>
      </Modal>
      <Modal open={openPayment} setOpen={setOpenPayment} width={900} height={900}>
        <div className="flex flex-col pb-8">
          <div className="rounded-lg flex p-4 bg-gray-800">
            <p className='p-4 text-[20px] text-white my-auto'>
              Total Payments:
            </p>
            <p className='p-4 text-[30px] text-white ml-auto'>
              Rs. {getFullTotal() ? getFullTotal() : (getTotalResidenceDay(data.checkIn) * parseInt(data.roomRate) - parseInt(data.advance) + getTotal(data).total)}
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
              <button onClick={() => { onSubmitCash() }} type='button' className="rounded-lg flex p-4 bg-red-700">
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
              <button onClick={() => { onSubmitOnline() }} type='button' className="rounded-lg flex p-4 bg-red-700">
                <p className='p-4 text-[20px] text-white'>
                  Checkout
                </p>

              </button>
            </div>}
        </div>
      </Modal>
      <Modal open={showCredit} setOpen={setShowCredit} width={500} height={500}>
        <div className="py-10 overflow-y-scroll flex flex-col">

          <button onClick={() => onTransferCredit()} type='button' className='p-3 bg-green-700 text-white text-center text-sm w-full rounded-md mt-auto'>Add Current Transaction To Credit</button>
          <p className='text-[14px] text-gray-700 text-light mt-2'>* Credit is added in reference to phone number</p>
        </div>
      </Modal>
      <div className=' h-full'>
        <div className="flex flex-row h-full">
          <div className="flex-1 px-10 h-full">
            <div className="text-[24px] font-thin tracking-tight ml-2 mb-5">Room Order</div>
            <form className='flex flex-col space-y-4'>
              <div className="flex flex-row ">
                <div className="flex flex-col flex-1">
                  <label className="font-light  ml-2 text-gray-400 text-[10px]" htmlFor="roomNumber">
                    Client Name:
                  </label>
                  <p className="font-normal text-[17px] ml-2 capitalize">{data.name}</p>
                </div>
                <div className="flex flex-col flex-1">
                  <label className="font-light  ml-2 text-gray-400 text-[10px]" htmlFor="roomNumber">
                    Client Address:
                  </label>
                  <p className="font-normal text-[17px] ml-2 capitalize">{data.address}</p>
                </div>
              </div>
              <div className="flex flex-row ">
                <div className="flex flex-col flex-1">
                  <label className="font-light  ml-2 text-gray-400 text-[10px]" htmlFor="roomNumber">
                    Client Phone:
                  </label>
                  <p className="font-normal text-[17px] ml-2 capitalize">{data.phone}</p>
                </div>
                <div className="flex flex-col flex-1">
                  <label className="font-light  ml-2 text-gray-400 text-[10px]" htmlFor="roomNumber">
                    Selected Room:
                  </label>
                  <div className="flex flex-row">

                    <div className="text-[12px] font-extralight mb-auto flex flex-row">
                      {data.rooms && <>
                        {(data.rooms).map((item: any, index: number) => (
                          <>
                            {item.status == 'inhouse' &&
                              <p key={index} className="font-normal text-[17px] ml-3 capitalize">{item.room}</p>
                            }
                          </>
                        ))}
                      </>}
                    </div>

                  </div>
                </div>
              </div>

              <div className="text-[20px] font-thin tracking-tight ml-2 my-5 border-t border-t-gray-400 pt-7">Room Order</div>

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
                    <th scope="col" className="px-6 py-5">

                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={"bg-gray-300 border-b"}>
                    <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                      Room Bill:
                    </th>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                      Rs. {getTotalRoomPrice()}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] text-right">
                      <button type='button' onClick={() => setOpenRoomDetail(true)} className='text-blue-800 underline '>See Detail</button>
                    </td>
                  </tr>
                  {getTotal(data).total > 0 &&
                    <tr className={"bg-gray-300 border-b"}>
                      <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                        Food Bill:
                      </th>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                        Rs. {getTotal(data).total}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] text-right">
                        <button type='button' onClick={() => setOpenFoodDetail(true)} className='text-blue-800 underline '>See Detail</button>
                      </td>
                    </tr>
                  }
                  <tr className={"bg-gray-300 border-b"}>
                    <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                      Discount:
                    </th>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                      Rs.
                      <input min={0} type="number" className='bg-gray-400 rounded-lg ml-2 py-2 px-2 w-28' defaultValue={discount} onChange={(e) => { if (getFullTotal() - parseInt(e.target.value) >= 0 && parseInt(e.target.value) >= 0) setDiscount(parseInt(e.target.value)) }} placeholder='Discount ' />
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                    </td>
                  </tr>
                  <tr className={"bg-gray-300 border-b"}>
                    <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                      Advance:
                    </th>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                      Rs. {data.advance ? data.advance : 0}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                    </td>
                  </tr>


                </tbody>
                <tfoot>
                  <tr className="font-semibold text-gray-100 bg-slate-800">
                    <th scope="row" className="px-6 py-3 text-base text-[14px]">Grand Total:</th>
                    <td className="px-6 py-3 text-[14px]"></td>

                    <td className="px-6 py-3 text-[14px]">Rs. {getFullTotal() && getFullTotal()}</td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] text-right">
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div className="flex flex-row gap-4">

                {seeIfExists() &&
                  <button type='button' onClick={() => { showRoom() }} className='bg-blue-800 text-white rounded p-3 px-6 flex-1'>Partial Checkout</button>
                }

                <button type='button' onClick={() => { toggleShowCredit() }} className='bg-orange-700 text-white rounded p-3 px-6 flex-1'>Checkout On Credit</button>
                <button type='button' onClick={() => { showCalculator() }} className='bg-red-700 text-white rounded p-3 px-6 flex-1'>Checkout</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </Modal>
  );
}

export default RoomCheckOut