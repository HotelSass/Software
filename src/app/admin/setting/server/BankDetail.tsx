import React from 'react'
import serverUrl from '@/config/config';
import BankDetail from '../components/BankDetail';
export async function getAllItem() {
  const res = await fetch(serverUrl + "/setting/getAllBankDetail", { cache: 'no-store' });
  const data = await res.json();
  return data
}
export async function BankDetailServer() {
  const value = await getAllItem()

  return (
    <BankDetail bankDetail={value} />
  )
}

