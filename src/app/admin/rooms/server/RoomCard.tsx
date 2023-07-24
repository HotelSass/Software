import Card from '@/components/card';
import { getCardNumber } from '@/utils/admin/room/page';
import React from 'react'
  
export default async function RoomCard() {   
    const number=await getCardNumber()
    return (<>
        <Card title={"Rooms"} number={number} />
    </>
    )
}

