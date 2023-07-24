import serverUrl from '@/config/config';
import React from 'react'
import CategoryList from '../client/CategoryList';
import NewMenuModal from '../client/NewMenuModal';


export async function getAllCategory() {
    const res = await fetch(serverUrl + "/menu/getAllCategory",{cache:'no-store'});
    const data = await res.json();
    return data
  }
export async function NewMenuServer() {
    const value=await getAllCategory()
  return (
    <NewMenuModal categoryData={value}/>
  )
}

