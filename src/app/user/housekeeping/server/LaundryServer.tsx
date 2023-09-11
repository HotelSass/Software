import React from 'react'
import serverUrl from '@/config/config';
import Laundry from '../client/laundry';

export async function getAllItem() {
  const res = await fetch(serverUrl + "/user/laundry/getLaundryRecord", { cache: 'no-store' });
  const records = await res.json();
 
  return { records }
}

const LaundryServer = async () => {
  const { records} = await getAllItem()
  return (
    <Laundry records={records} />
  )
}

export default LaundryServer