import Card from '@/components/card';
import { getCardNumber, getTableNumber } from '@/utils/admin/room/page';
import React from 'react'
  
export default async function RoomCard() {   
    const number=await getTableNumber()
    return (<>
        <Card title={"Tables"} number={number} />
    </>
    )
}

