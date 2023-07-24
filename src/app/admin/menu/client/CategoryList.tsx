'use client'
import CardSmall from '@/components/cardSmall'
import React, { useState } from 'react'
import UpdateMenuModal from './UpdateMenuModal'

const CategoryList = ({ categoryData }: any) => {
    const [open, setOpen] = useState(false)
    const [data,setData]=useState({})
    return (
        <>
            <UpdateMenuModal open={open} setOpen={setOpen} data={data} categoryData={categoryData}/>
        
            <div className='flex flex-row flex-wrap'>
                {categoryData.map((item: any, index: number) => (
                    <CardSmall setOpen={setOpen} setData={setData} number={item.items} description={item.description} title={(item.category).toUpperCase()} color='#ff0000' />
                ))}
            </div>
        </>
    )
}

export default CategoryList