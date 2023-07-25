import Modal from '@/components/modal'
import serverUrl from '@/config/config';
import React, { useState } from 'react'
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const TableCheckOut = ({ data, reload }: any) => {
  const [open, setOpen] = useState(false)
  const [discount, setDiscount] = useState(0)
  function getTotal() {

    let quantity = 0
    let total = 0
    if (data.order) {
      for (let i = 0; i < data.order.length; i++) {
        for (let j = 0; j < data.order[i].length; j++) {
          quantity = quantity + data.order[i][j].quantity
          total = total + data.order[i][j].quantity * data.order[i][j].price
        }
      }
    }
    return { quantity, total }
  }

  function getFullTotal() {
    let fullTotal = getTotal().total - parseInt(discount)
    return fullTotal
  }

  async function submitData() {
    try {
      const response = await fetch(serverUrl + "/user/checkout/checkoutTable", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data,
          discount,
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

  return (
    <>
      <button type='button' onClick={() => { if (data.order.length > 0) { setOpen(true) } }} className='bg-red-700 w-full text-center text-white p-4 rounded-xl'>Check Out</button>
      <Modal open={open} setOpen={setOpen} width={800} height={screenHeight / 1.8}>
        <form onSubmit={(e) => submitData(e)} className=' h-full'>
          <div className="flex flex-row h-full">
            <div className="flex-1 px-10 h-full">

              <form className='flex flex-col space-y-4'>
                <div className="text-[20px] font-thin tracking-tight ml-2 my-5 ">Room Order</div>

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-[10px] rounded">
                  <thead className=" text-[14px] = uppercase bg-gray-100 dark:bg-gray-700 text-gray-200">
                    <tr >
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
                        <input type="number" className='bg-gray-300 w-14' defaultValue={discount} onChange={(e) => { if ((getTotal().total - e.target.value) >= 0 && e.target.value >= 0) setDiscount(e.target.value) }} />
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
                <button type='button' onClick={() => submitData()} className='bg-red-700 text-white rounded p-3 px-6 flex-1 mt-7'>Checkout</button>
              </form>
            </div>

          </div>
        </form>
      </Modal>
    </>

  )
}

export default TableCheckOut