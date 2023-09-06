import React from 'react'
import serverUrl from '@/config/config';
import BankTransfer from '../components/BankTransfer';

export async function getAllItem() {
  const res = await fetch(serverUrl + "/setting/getAllVendorList", { cache: 'no-store' });
  const vendorList = await res.json();
  const res2 = await fetch(serverUrl + "/setting/getAllStorageList", { cache: 'no-store' });
  const data2= await res2.json();
  const res3 = await fetch(serverUrl + "/setting/getAllMeasurementList", { cache: 'no-store' });
  const data3= await res3.json();
  return {vendorList,data2,data3}
}

const BankTransferServer = async() => {
  const {vendorList,data2,data3} = await getAllItem()

  return (
    <BankTransfer vendorList={vendorList} location={data2} unit={data3} />
  )
}

export default BankTransferServer