'use server'
import serverUrl from "@/config/config";

export async function getCardNumber() {
    const res = await fetch(serverUrl + "/room/getRoomLength",{cache:'no-store'});
    const data = await res.json();
    return data
  }
export async function getTableNumber() {
    const res = await fetch(serverUrl + "/table/getAllTableLength",{cache:'no-store'});
    const data = await res.json();
    return data
  }