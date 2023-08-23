import serverUrl from '@/config/config';
import React from 'react'
import CategoryList from '../client/CategoryList';


export async function getAllCategory() {
    const res = await fetch(serverUrl + "/bar/getAllBarCategory",{cache:'no-store'});
    const data = await res.json();
    return data
  }
export async function NewCategoryServer() {
    const value=await getAllCategory()
  return (
    <CategoryList categoryData={value}/>
  )
}

