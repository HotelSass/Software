'use client'
import React, { useState } from "react";
import Layout from "../component/layout";
import serverUrl from "@/config/config";
import { useRouter } from "next/navigation";


const History = () => {
    const router = useRouter()
    const [billType, setBillType] = useState('asset purchase')
    const [bankData, setBankData] = useState({
        bankName: "",
        amount: 0,
        accountNumber: '',
        accountName: ''
    })
    const [itemArray, setItemArray] = useState([
        {
            productName: "",
            quantity: 1,
            price: 0,
            inventory: false
        },
    ]);
    const handleAddRow = () => {
        const newRow = {
            productName: "",
            quantity: 1,
            price: 0,
            inventory: false
        };
        setItemArray([...itemArray, newRow]);
    };
    const removeRow = (row: number) => {
        const temp = [...itemArray]
        const temp2 = []
        for (let i = 0; i < temp.length; i++) {
            if (i != row) {
                temp2.push(temp[i])
            }
        }
        setItemArray([...temp2])
    };

    const handleChange = (index: number, field: string, value: string | number) => {
        setItemArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[index] = {
                ...newArray[index],
                [field]: value,
            };
            return newArray;
        });
    };
    const handleChangeBank = (field: string, value: string | number) => {
        setBankData((prevBankData) => ({
            ...prevBankData,
            [field]: value,
        }));
    };



    const currentDate = new Date();
    const c_date = currentDate.getDate();
    const c_month = currentDate.getMonth();
    const c_year = currentDate.getFullYear();

    const c_month_name = currentDate.toLocaleDateString("en-US", {
        month: "short",
    });
    async function submitData(e) {
        //e.preventDefault()
        const formData = new FormData(e.target);
        const billDate = formData.get('billDate');
        const vendorName = formData.get('vendorName');

        if (billType == "asset purchase") {
            const data = {
                billDate,
                vendorName,
                billType,
                itemArray
            }
            try {
                const response = await fetch(serverUrl + "/user/finance/addPurchaseRecord", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...data
                    })

                });
                if (response.ok) {
                }
            } catch (err) {
                console.log(err)
            }

        }
        else if (billType == "bank transfer") {
            const data = {
                billDate,
                vendorName,
                billType,
                bankData
            }
            try {
                const response = await fetch(serverUrl + "/user/finance/addBankTransfer", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...data
                    })

                });
                if (response.ok) {
                    
                }

            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <Layout>
            <div className="w-full p-8 flex flex-col">
                <div className="text-[20px] font-thin tracking-tight">Outgoing Cashflow</div>
                <div className="flex flex-row border-b border-b-gray-200 pb-8">
                    <div className="flex flex-row space-x-4 flex-1">
                        <div className="text-[36px] font-thin">{c_date}</div>
                        <div className="text-[36px] font-thin">{c_month_name}</div>
                        <div className="text-[36px] font-thin">{c_year}</div>
                    </div>

                </div>

                <form onSubmit={(e) => { submitData(e) }} className="flex-1 mt-9">

                    <div className="flex flex-row space-x-5">
                        <div className="flex-1">
                            <div className="flex flex-col flex-1">
                                <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                                    Bill Date
                                </label>
                                <input
                                    name="billDate"
                                    placeholder="Client Name"
                                    type="date"
                                    id="billDate"
                                    required
                                    className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-4  border border-gray-300 rounded-lg bg-gray-50 text-ssm text-gray-700 w-full"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col flex-1">
                                <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                                    Vendor
                                </label>
                                <input
                                    name="vendorName"
                                    placeholder="Vendor Name"
                                    type="text"
                                    id="vendor"
                                    required
                                    className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col flex-1">
                                <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                                    Bill type
                                </label>
                                <select
                                    name="paymentMethod"
                                    id="paymentMethod"
                                    value={billType}
                                    onChange={(e) => { setBillType(e.target.value) }}
                                    required
                                    className="block flex-1 p-4 border border-gray-300 rounded-lg bg-gray-50 text-ssm text-gray-700 w-full "
                                >
                                    <option value="asset purchase" selected>Asset Purchase</option>
                                    <option value="bank transfer" >Bank Transfer</option>
                                </select>

                            </div>
                        </div>
                        <div className="flex-1">
                            <button type="submit" className="w-full h-full py-4 px-5 mr-2 my-auto text-ssm text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200   focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70 font-light">Post Bill</button>
                        </div>

                    </div>
                    <div className="flex flex-col mt-8">

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                            {billType == 'asset purchase' &&
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-ssm">
                                        <tr className="py-6 ">
                                            <th scope="col" className="px-2 py-3">
                                            </th>
                                            <th scope="col" className="px-6 py-6 font-light">
                                                Product
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-light">
                                                Qty
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-light">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-light">

                                            </th>
                                            <th scope="col" className="px-6 py-3 font-light">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemArray.map((item: any, index: number) => (

                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="w-2 p-4">
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    <input
                                                        name="name"
                                                        placeholder="ProductName"
                                                        type="text"
                                                        id="name"
                                                        value={itemArray[index].productName}
                                                        onChange={(e) => handleChange(index, "productName", e.target.value)}
                                                        required
                                                        className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block p-4  border border-gray-600 rounded-lg bg-gray-700 text-ssm text-gray-500 w-full font-light"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className=" items-center space-x-3">
                                                        <div>
                                                            <input type="number" required value={itemArray[index].quantity} onChange={(e) => handleChange(index, "quantity", e.target.value)} id="first_product" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-3/4" placeholder="1" required />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className=" items-center space-x-3">
                                                        <div>
                                                            <input value={itemArray[index].price} required onChange={(e) => handleChange(index, "price", e.target.value)} type="number" id="first_product" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-3/4" placeholder="1" required />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 ">
                                                    <label className="relative inline-flex items-center my-auto cursor-pointer">
                                                        <input type="checkbox" checked={itemArray[index].inventory} onChange={(e) => handleChange(index, "inventory", e.target.checked)} className="sr-only peer" />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Inventory</span>
                                                    </label>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button type="button" onClick={() => removeRow(index)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="w-2 p-4" colSpan={1}>
                                            </td>
                                            <td className="w-2 p-4" colSpan={5}>
                                                <button type="button" onClick={() => handleAddRow()} className="underline text-gray-500 text-ssm ml-4">Add row</button>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            }
                            {billType == 'bank transfer' &&
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-ssm">
                                        <tr className="py-6 ">
                                            <th scope="col" className="px-2 py-3">
                                            </th>
                                            <th scope="col" className="px-6 py-6 font-light">
                                                Bank Name
                                            </th>

                                            <th scope="col" className="px-6 py-3 font-light">
                                                Account Number
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-light">
                                                Account Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-light">
                                                Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="w-2 p-4">
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                <input
                                                    name="name"
                                                    placeholder="Bank Name"
                                                    type="text"
                                                    id="name"
                                                    value={bankData.bankName}
                                                    onChange={(e) => handleChangeBank("bankName", e.target.value)}
                                                    required
                                                    className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block p-4  border border-gray-600 rounded-lg bg-gray-700 text-ssm text-gray-500 w-full font-light"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                <input
                                                    name="name"
                                                    placeholder="Amount"
                                                    type="text"
                                                    id="name"
                                                    value={bankData.accountNumber}
                                                    onChange={(e) => handleChangeBank("accountNumber", e.target.value)}
                                                    required
                                                    className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block p-4  border border-gray-600 rounded-lg bg-gray-700 text-ssm text-gray-500 w-full font-light"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                <input
                                                    name="name"
                                                    placeholder="Amount"
                                                    type="text"
                                                    id="name"
                                                    value={bankData.accountName}
                                                    onChange={(e) => handleChangeBank("accountName", e.target.value)}
                                                    required
                                                    className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block p-4  border border-gray-600 rounded-lg bg-gray-700 text-ssm text-gray-500 w-full font-light"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className=" items-center space-x-3">
                                                    <div>
                                                        <input value={bankData.amount} onChange={(e) => handleChangeBank("amount", e.target.value)} type="number" id="first_product" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-3/4" placeholder="1" required />
                                                    </div>
                                                </div>
                                            </td>


                                        </tr>
                                    </tbody>

                                </table>
                            }
                        </div>

                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default History;
