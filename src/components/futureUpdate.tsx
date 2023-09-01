import React from 'react'
import { BsStars } from 'react-icons/bs'

const FutureUpdate = () => {
    return (
        <div className="text-purple-600 flex flex-row">
            <BsStars size={14} className="my-auto" />
            <p className="text-[12px] font-normal my-auto ml-1">Upcoming future update</p>
        </div>
    )
}

export default FutureUpdate