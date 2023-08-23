import serverUrl from '@/config/config';
import React from 'react'
import NewMenuModal from '../client/NewMenuModal';


export async function getAllCategory() {
    const res = await fetch(serverUrl + "/bar/getAllBarCategory",{cache:'no-store'});
    const data = await res.json();
    return data
  }
export async function NewMenuServer() {
    const value=await getAllCategory()
  return (
    <NewMenuModal categoryData={value}/>
  )
}

