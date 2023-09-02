import React from 'react'
import serverUrl from '@/config/config';
import Measurement from '../components/Measurement';
export async function getAllItem() {
  const res = await fetch(serverUrl + "/setting/getAllMeasurementList", { cache: 'no-store' });
  const data = await res.json();
  return data
}
export async function MeasurementServer() {
  const value = await getAllItem()

  return (
    <Measurement metrics={value} />
  )
}

