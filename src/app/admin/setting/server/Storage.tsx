import React from 'react'
import serverUrl from '@/config/config';
import Measurement from '../components/Measurement';
import Vendor from '../components/Vendor';
import StorageLocation from '../components/Storage';
export async function getAllItem() {
  const res = await fetch(serverUrl + "/setting/getAllStorageList", { cache: 'no-store' });
  const data = await res.json();
  return data
}
export async function StorageServer() {
  const value = await getAllItem()

  return (
    <StorageLocation location={value} />
  )
}

