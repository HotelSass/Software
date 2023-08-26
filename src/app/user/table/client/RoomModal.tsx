import Modal from '@/components/modal'
import React from 'react'
const distribution = {
    'ml30': '30 ml',
    'ml60': '60 ml',
    'ml90': '90 ml',
    'ml180': '180 ml',
    'half': 'Half',
    'full': 'Full',
}
const RoomModal = ({ data, open, setOpen }: any) => {
    function getServiceCharge() {
        let num = 0
        if (data.item) {

            for (let j = 0; j < data.item.orders.length; j++) {
                const temp = data.item.orders[j]
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
    function getTotal() {
        let quantity = 0
        let total = 0
        if (data.item) {
            data.item.orders.map((list: any) => {
                list.map((list1: any) => {
                    total = total + Math.abs(parseFloat(list1.price)) * Math.abs(parseFloat(list1.quantity))
                    quantity = quantity + list1.quantity

                })
            })
        }
        total = total + getServiceCharge()
        return { quantity, total }
    }
    return (
        <Modal open={open} setOpen={setOpen} width={800} height={500} >
            <div className=" flex flex-col overflow-y-scroll px-4 max-h-[600px]">
                <div className="text-[24px] font-thin tracking-tight">Orders</div>

                <div className="relative overflow-x-auto mt-4 flex flex-col p-4">
                    {data.item && <>

                        {data.item.orders.length != 0 ?
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded">
                                <thead className=" text-[14px] = uppercase bg-gray-100 dark:bg-gray-700 text-gray-200">
                                    <tr className='bg-slate-800' >
                                        <th scope="col" className="px-6 py-5 rounded-l-lg">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-5">
                                            Quantity
                                        </th>
                                        <th scope="col" className="px-6 py-5">
                                            Rate
                                        </th>
                                        <th scope="col" className="px-6 py-5 rounded-r-lg">
                                            Price
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {data.item.orders && <>
                                        {data.item.orders.map((item: any, index: number) => {
                                            return (
                                                <>
                                                    {item.map((item1: any, index1: number) => {
                                                        return (
                                                            <>
                                                                <tr className={item.length == index1 + 1 ? " bg-gray-300 border-b " : " bg-gray-300 "}>
                                                                    <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                                                                        {index + 1}. {index1 + 1 + " "}{item1.itemName}
                                                                    </th>
                                                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                                                                        {item1.label ? distribution[item1.label as keyof typeof distribution] : item1.quantity}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                                                                        Rs. {item1.price}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                                                                        Rs. {parseFloat(item1.price) * parseFloat(item1.quantity)}
                                                                    </td>

                                                                </tr>
                                                            </>
                                                        )

                                                    })}
                                                </>
                                            )
                                        }
                                        )}
                                    </>}
                                    {getServiceCharge() != 0 &&
                                        <tr className="font-semibold text-gray-100 bg-slate-600 ">
                                            <th scope="row" className="px-6 py-3 text-[14px]]">Service Charge</th>
                                            <td className="px-6 py-3"></td>
                                            <td className="px-6 py-3"></td>

                                            <td className="px-6 py-3">Rs. {getServiceCharge()}</td>
                                        </tr>
                                    }
                                </tbody>

                                <tfoot>
                                    <tr className="font-semibold text-gray-100 bg-slate-800">
                                        <th scope="row" className="px-6 py-3 text-base">Total</th>
                                        <td className="px-6 py-3"></td>
                                        <td className="px-6 py-3"></td>

                                        <td className="px-6 py-3">Rs. {getTotal().total}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            :
                            <div className="text-[16px] font-thin tracking-tight text-center">Nothing to show here</div>

                        }
                    </>
                    }
                </div>
            </div>
        </Modal>
    )
}


export default RoomModal