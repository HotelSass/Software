import React from 'react'
import Client from '../client/client'
import serverUrl from '@/config/config';
export async function getAllItem() {
  const res = await fetch(serverUrl + "/setting/getAllMeasurementList", { cache: 'no-store' });
  const data = await res.json();
  console.log(data)
  return data
}
export async function Server() {
  const value = await getAllItem()

  return (
    <Client metrics={value} />
  )
}

