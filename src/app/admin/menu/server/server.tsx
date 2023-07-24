import Card from '@/components/card';
import serverUrl from '@/config/config';
import React from 'react'

export async function getAllCategory() {
  const res = await fetch(serverUrl + "/menu/getAllCategoryLength", { cache: 'no-store' });
  const data = await res.json();
  return data
}
export async function getAllItem() {
  const res = await fetch(serverUrl + "/menu/getAllMenuLength", { cache: 'no-store' });
  const data = await res.json();
  return data
}

export default async function Server(){
  const category=await getAllCategory()
  const item=await getAllItem()
  return (
    <div className='flex flex-row'>
      <Card title={"Menu Items"} number={item} />
      <Card title={"Category"} number={category} />
    </div>
  )
}

