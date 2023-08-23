import serverUrl from '@/config/config';
import React from 'react'
import MenuTable from '../menuTable';
import { getAllCategory } from './NewCategoryServer';


export async function getAllMenu() {
    const res = await fetch(serverUrl + "/bar/getAllBarItem",{cache:'no-store'});
    const data = await res.json();
    return data
  }
export async function MenuTableServer() {
    const value=await getAllMenu()
    const category=await getAllCategory()
  return (
    <MenuTable data={value} category={category}/>
  )
}