import React from 'react'
import serverUrl from '@/config/config';
import Measurement from '../components/Measurement';
import Vendor from '../components/Vendor';
export async function getAllItem() {
  const res = await fetch(serverUrl + "/setting/getAllVendorList", { cache: 'no-store' });
  const data = await res.json();
  return data
}
export async function VendorServer() {
  const value = await getAllItem()

  return (
    <Vendor vendors={value} />
  )
}

