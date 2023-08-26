import Modal from '@/components/modal'
import serverUrl from '@/config/config'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const TableModal = ({ tableList, selectedItems, reload }: any) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [openSecond, setOpenSecond] = useState(false)
    const [selectedTable, setSelectedTable] = useState({ tableNumber: null })
    async function orderToTable() {

        try {
            const response = await fetch(serverUrl + "/user/menu/addOrderToTable", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tableNumber: selectedTable,
                    order: selectedItems

                })

            });
            if (response.ok) {
                router.refresh()
                setOpen(false)
                setOpenSecond(false)
                setSelectedTable({ tableNumber: null })
                reload()
            } else {
            }

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <button type='button' onClick={() => { if (selectedItems.length > 0) { setOpen(true) } }} className='bg-red-700 w-full text-center text-white p-4 rounded-xl'>Bill To Table</button>

            <Modal open={open} setOpen={setOpen} width={700} height={400} >
                <div className=" flex flex-row flex-wrap">

                    {tableList.map((item: any, index: any) => {
                        return (
                            <button key={index} type='button' onClick={() => { setSelectedTable(item); setOpenSecond(true) }} className="w-24 h-24 rounded-xl m-2 bg-gray-300 flex flex-col  hover:bg-gray-500 items-center justify-center">
                                <div className="font-light text-[24px] text-center text-gray-800">
                                    {item.tableNumber}
                                </div>


                            </button>
                        )
                    })}
                    <Modal open={openSecond} setOpen={setOpenSecond} width={350} height={400} >
                        <div className=" flex flex-col p-4">
                            <div className="text-thin text-[20px] text-center">
                                Add Bill to Table No.{selectedTable.tableNumber}
                            </div>
                            <button type='button' onClick={() => orderToTable()} className=' mt-10 p-4 px-8 text-[13px] bg-red-700 text-white'>Confirm</button>
                        </div>
                    </Modal>
                </div>
            </Modal>
        </>
    )
}

export default TableModal