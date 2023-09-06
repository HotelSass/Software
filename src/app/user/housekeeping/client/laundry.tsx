import React from 'react'

const Laundry = () => {
    return (
        <div className='bg-gray-200 rounded-lg p-6 w-full shadow'>
            <table className='w-full'>
                <thead>
                    <tr className='m-3 p-4 bg-gray-700 rounded-lg'>
                        <th className='p-4 text-left text-gray-100 font-semibold text-[12px] uppercase'>Bill No.</th>
                        <th className='p-4 text-left text-gray-100 font-semibold text-[12px] uppercase'>Quantity</th>
                        <th className='p-4 text-left text-gray-100 font-semibold text-[12px] uppercase'>Date</th>
                    </tr>
                </thead>
                <tbody className='bg-gray-300'>
                    <tr className='m-3 p-4 border-b'>
                        <td className='p-4 text-[12px] underline'>
                            123422
                        </td>
                        <td className='p-4 text-[12px]'>
                            10
                        </td>
                        <td className='p-4 text-[12px]'>
                            2020/10/05
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Laundry