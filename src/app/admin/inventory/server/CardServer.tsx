import Card from '@/components/card';
import serverUrl from '@/config/config';
import React from 'react'
export async function getInventory() {
    const res = await fetch(serverUrl + "/inventory/inventoryListLength", { cache: 'no-store' });
    const data = await res.json();
    return data
}
export default async function CardServer() {
    const val = await getInventory()
  return (
        <Card title={"Items"} number={val} />
    )
}

