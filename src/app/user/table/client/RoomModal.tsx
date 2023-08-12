import Modal from '@/components/modal'
import React from 'react'

const RoomModal = ({ data, open, setOpen }: any) => {
    function getServiceCharge() {
        let num = 0

        if (data.item) {

            for (let j=0;j<data.item.orders.length;j++) {
                const temp = data.item.orders[j]
                for (let i = 0; i < temp.length; i++) {

                    if (temp[i].serviceCharge==true) {
                        num = num + temp[i].quantity * (temp[i].price || 0) * 0.1
                    }
                }
            }
            return num 
        } else {
            return 0
        }
    }
    function getTotal() {
        let quantity = 0
        let total = 0
        if (data.item) {
            if (data.item.orders) {
                for (let i = 0; i < data.item.orders.length; i++) {
                    for (let j = 0; j < data.item.orders[i].length; j++) {
                        if (data.item.orders[i][j].roomNumber == data.item1) {
                            quantity = quantity + data.item.orders[i][j].quantity
                            total = total + data.item.orders[i][j].quantity * data.item.orders[i][j].price
                        }
                    }
                }
            }
        }
        total = total + getServiceCharge()
        return { quantity, total }
    }
    return (
        <Modal open={open} setOpen={setOpen} width={700} height={700} >
            <div className=" flex flex-col overflow-y-scroll px-4">
                <div className="text-[24px] font-thin tracking-tight">Orders</div>

                <div className="relative overflow-x-auto mt-8 flex flex-col p-4">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded">
                        <thead className=" text-[14px] = uppercase bg-gray-100 dark:bg-gray-700 text-gray-200">
                            <tr className='bg-slate-800' >
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
                            {data.item && <>
                                {data.item.orders && <>
                                    {data.item.orders.map((item: any, index: number) => (
                                        <>
                                            {item.map((item1: any, index1: number) => (
                                                <>
                                                    {item1.roomNumber == data.item1 ?
                                                        <tr className={item.length == index1 + 1 ? " bg-gray-300 border-b " : " bg-gray-300 "}>
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
                                                        : <></>
                                                    }
                                                </>
                                            ))}

                                        </>
                                    ))}
                                </>}
                            </>}
                            {getServiceCharge() != 0 &&
                                <tr className="font-semibold text-gray-100 bg-slate-600 ">
                                    <th scope="row" className="px-6 py-3 text-[14px]]">Service Charge</th>
                                    <td className="px-6 py-3"></td>

                                    <td className="px-6 py-3">{getServiceCharge()}</td>
                                </tr>
                            }
                        </tbody>
                        <tfoot>
                            <tr className="font-semibold text-gray-100 bg-slate-800">
                                <th scope="row" className="px-6 py-3 text-base">Total</th>
                                <td className="px-6 py-3">{getTotal().quantity}</td>

                                <td className="px-6 py-3">{getTotal().total}</td>
                            </tr>
                        </tfoot>
                    </table>

                </div>
            </div>
        </Modal>
    )
}


export default RoomModal