import serverUrl from '@/config/config';
import React from 'react'
import Info from '../client/Info';
import Calender from '../components/Calender';


async function getInfo() {
    const currentDate = new Date();
    let c_date = currentDate.getDate().toString();
    let c_month = (currentDate.getMonth() + 1).toString();
    const c_year = currentDate.getFullYear();
    if (c_date.length == 1) {
        c_date = "0" + c_date
    }
    if (c_month.length == 1) {
        c_month = "0" + c_month
    }
    const date = c_year + '-' + c_month + '-' + c_date
    const res = await fetch(serverUrl + "/user/room/getAllBookingListAndRoom", { cache: 'no-store' });
    const data = await res.json();
    return data
}


async function CalenderServer() {
    const data = await getInfo()

    return (
        <Calender data={data} />
    )
}

export default CalenderServer