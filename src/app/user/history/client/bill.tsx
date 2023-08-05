'use client'
import Modal from '@/components/modal'
import serverUrl from '@/config/config';
import React, { useState } from 'react'

function dateDifference(startDateStr: string, endDateStr: string) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const timeDifferenceMs = endDate.getTime() - startDate.getTime();

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
  return { quantity, total }
}


const RoomBill = ({ open, setOpen, data }: any) => {
  const [discount, setDiscount] = useState(0)
  function getFullTotal() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    let days = dateDifference(data.checkIn, formattedDate)
    if (days == 0) days = 1
    let fullTotal = days * parseInt(data.roomRate) + getTotal(data).total - parseInt(data.advance) - discount
    return fullTotal
  }
  function getTotalRoomPrice() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    let days = dateDifference(data.checkIn, formattedDate)
    let fullTotal = days * parseInt(data.roomRate)
    return fullTotal
  }

  function getTotalResidenceDay() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    let days = dateDifference(data.checkIn, formattedDate)
    if (days == 0) return 1
    return days
  }


  return (
    <Modal open={open} setOpen={setOpen} width={1500} height={900}>
      <div className=' h-full'>
        <div className="relative overflow-x-auto mt-8 flex flex-col p-4 h-[600px] overflow-y-scroll">

          <div className="flex flex-row h-full">
            <div className="flex-1 px-10 h-full border-r border-gray-300">
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
                      Check In:
                    </label>
                    <p className="font-normal text-[17px] ml-2 capitalize">{data.checkIn}</p>
                  </div>
                </div>
                <div className="flex flex-row ">
                  <div className="flex flex-col flex-1">
                    <label className="font-light  ml-2 text-gray-400 text-[10px]" htmlFor="roomNumber">
                      Selected Room:
                    </label>
                    <div className="flex flex-row">
                      {data.hasOwnProperty('roomNumber') &&
                        <>
                          {(data.roomNumber).map((item: any, index: number) => (
                            <p key={index} className="font-normal text-[17px] ml-2 capitalize">{item},</p>
                          ))}
                        </>
                      }

                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="font-light text-gray-400 text-[10px] ml-2" htmlFor="roomNumber">
                      Check Out:
                    </label>
                    <p className="font-normal text-[17px] ml-2 capitalize">{data.checkOut}</p>
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

                    </tr>
                  </thead>
                  <tbody>
                    <tr className={"bg-gray-300 border-b"}>
                      <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                        Room Bill:
                      </th>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                        {getTotalResidenceDay()} days @ Rs. {data.roomRate}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                        Rs. {getTotalRoomPrice()}
                      </td>
                    </tr>
                    <tr className={"bg-gray-300 border-b"}>
                      <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                        Extended Stay:
                      </th>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                        {dateDifference(data.checkOut, (new Date()).toString()) < 0 ? "0 days" : dateDifference(data.checkOut, (new Date()).toString()) + " days"}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                      </td>
                    </tr>
                    <tr className={"bg-gray-300 border-b"}>
                      <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                        Food Bill:
                      </th>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                        Rs. {getTotal(data).total}
                      </td>
                    </tr>
                    <tr className={"bg-gray-300 border-b"}>
                      <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                        Advance:
                      </th>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                        Rs. {data.advance}
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
                        <input type="text" contentEditable={false} className='bg-gray-300 w-14' defaultValue={data.discount} onChange={(e) => { if (getFullTotal() - parseInt(e.target.value) >= 0 && parseInt(e.target.value) >= 0) setDiscount(parseInt(e.target.value)) }} />
                      </td>
                    </tr>

                  </tbody>
                  <tfoot>
                    <tr className="font-semibold text-gray-100 bg-slate-800">
                      <th scope="row" className="px-6 py-3 text-base text-[14px]">Grand Total:</th>
                      <td className="px-6 py-3 text-[14px]"></td>

                      <td className="px-6 py-3 text-[14px]">Rs. {getFullTotal() ? getFullTotal() : (getTotalResidenceDay() * parseInt(data.roomRate) - parseInt(data.advance) + getTotal(data).total)}</td>
                    </tr>
                  </tfoot>
                </table>

              </form>
            </div>
            <div className="flex-1 px-10">
              <div className="text-[24px] font-thin tracking-tight ml-4 mb-5">Restaurant & Room Order</div>

              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-[10px] rounded">
                <thead className=" text-[14px] = uppercase bg-gray-100 dark:bg-gray-700 text-gray-200">
                  <tr className='bg-slate-800'>
                    <th scope="col" className="px-6 py-5 rounded-l-lg">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Qty
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
                                {item1.quantity}
                              </td>
                              <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                                {item1.price}
                              </td>
                            </tr>
                          ))}
                        </>
                      ))}
                    </>}
                </tbody>
                <tfoot>
                  <tr className="font-semibold text-gray-100 bg-slate-800">
                    <th scope="row" className="px-6 py-3 text-[14px]">Total</th>
                    <td className="px-6 py-3 text-[14px]">{getTotal(data).quantity}</td>

                    <td className="px-6 py-3 text-[14px]">{getTotal(data).total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default RoomBill