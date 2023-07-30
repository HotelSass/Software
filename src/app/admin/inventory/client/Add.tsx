import Modal from '@/components/modal'
import serverUrl from '@/config/config';
import { useRouter } from 'next/navigation';
import React from 'react'

const Add = ({ openAdd, setOpenAdd ,data}: any) => {
    const router=useRouter()
    const submitForm = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const quantity = formData.get('quantity');
        
        try {
            const response = await fetch(serverUrl + "/inventory/addInventory", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name:data.itemName,
                    quantity:quantity
                })

            });
           if(response.ok){
            setOpenAdd(false)
           }

        } catch (err) {
            console.log(err)
        }
        router.refresh()

        event.target.reset();
    };
    return (
        <Modal width={450} open={openAdd} setOpen={setOpenAdd} height={400}>
            <form onSubmit={submitForm} className="p-2 flex flex-col space-y-4 pb-8">
                <div className="pl-2 text-[26px] font-bold text-gray-600">
                    Add Item
                </div>
                <div className="flex flex-col">
                    <label className="font-medium text-ssm ml-2" htmlFor="tableNumber">
                        Item Quantity
                    </label>
                    <input
                    required
                        placeholder="Item Quantity"
                        type="text"
                        id="quantity"
                        name='quantity'
                        className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                    />
                </div>

               
                <button
                    type="submit"
                    className="w-full mt-4 p-4 font-bold text-white bg-blue-800 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-900"
                >
                    Add Item
                </button>
            </form>
        </Modal>
    )
}

export default Add