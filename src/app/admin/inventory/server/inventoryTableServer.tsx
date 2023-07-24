import React from 'react'
import InventoryTable from '../inventoryTable'
import serverUrl from '@/config/config';

async function getData() {
  const res = await fetch(serverUrl + "/inventory/inventoryList", { cache: 'no-store' });
  const data = await res.json();
  return data
}


export default async function InventoryTableServer(){
  const list=await getData()
  return (
    <InventoryTable data={list} />
  )
}

