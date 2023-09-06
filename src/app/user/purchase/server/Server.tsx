import React from 'react'
import Client from '../client/client'
import PurchaseBill from '../components/PurchaseBill'
import serverUrl from '@/config/config';

export async function getAllItem() {
  const res = await fetch(serverUrl + "/setting/getAllVendorList", { cache: 'no-store' });
  const vendorList = await res.json();
  const res2 = await fetch(serverUrl + "/setting/getAllStorageList", { cache: 'no-store' });
  const data2= await res2.json();
  const res3 = await fetch(serverUrl + "/setting/getAllMeasurementList", { cache: 'no-store' });
  const data3= await res3.json();
  return {vendorList,data2,data3}
}

const Server = async() => {
  const {vendorList,data2,data3} = await getAllItem()

  return (
    <Client vendorList={vendorList} location={data2} unit={data3} />
  )
}

export default Server