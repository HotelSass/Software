import Modal from '@/components/modal'
import React from 'react'
import TransferModal from './TransferModal'
import { useRouter } from 'next/navigation'
import TableCheckOut from '../../rooms/client/checkout/restaurant/page'

const TableModal = ({ open, setOpen, data, bookingList }: any) => {
    const router = useRouter()
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
    return (
        <Modal open={open} setOpen={setOpen} width={1000} height={700} >
            <div className=" flex flex-col overflow-y-scroll px-4 h-full">
                <div className="text-[24px] font-thin tracking-tight">Order</div>

                <div className="relative overflow-x-auto mt-8 flex flex-col p-4 h-[500px] overflow-y-scroll">
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
                            {data.order && <>
                                {data.order.map((item: any, index: number) => (
                                    <>
                                        {item.map((item1: any, index1: number) => (
                                            <tr key={index + index1} className={item.length == index1 + 1 ? " bg-gray-300 border-b " : " bg-gray-300 "}>
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
                            <tr className="font-semibold text-gray-100 bg-slate-800 border-b">
                                <th scope="row" className="px-6 py-3 text-base">Total</th>
                                <td className="px-6 py-3">{getTotal().quantity}</td>

                                <td className="px-6 py-3">{getTotal().total}</td>
                            </tr>
                        </tfoot>
                    </table>

                </div>

                <div className="flex flex-row py-3 mt-12">
                    <div className="flex-1 px-4">
                        <TransferModal reload={() => { setOpen(false); router.refresh() }} bookingList={bookingList} data={data} />
                    </div>
                    <div className="flex-1 px-4">
                        <TableCheckOut reload={() => { setOpen(false); router.refresh() }} data={data} />
                    </div>
                </div>


            </div>
        </Modal>
    )
}

export default TableModal