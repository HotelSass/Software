import serverUrl from '@/config/config';
import React from 'react'
import Info from '../client/Info';


async function getInfo() {
    const currentDate = new Date();
    let c_date = currentDate.getDate().toString();
    let c_month = (currentDate.getMonth()+1).toString();
    const c_year = currentDate.getFullYear();
    if(c_date.length==1){
        c_date="0"+c_date
    }
    if(c_month.length==1){
        c_month="0"+c_month
    } 
    const date=c_year+'-'+c_month+'-'+c_date
    const res = await fetch(serverUrl + "/user/room/getBookingList/"+date, { cache: 'no-store' });
    const data = await res.json();
    const res2 = await fetch(serverUrl + "/user/room/getRoomList", { cache: 'no-store' });
    const data2 = await res2.json();
    const res3 = await fetch(serverUrl + "/user/room/getAllBookingArrangedWithDate", { cache: 'no-store' });
    const data3 = await res3.json();
    return {data,data2,data3}
}


async function InfoServer() {
    const {data,data2,data3} = await getInfo()
    return (
        <Info data={data} availableRooms={data2.empty} upcoming={data3} />
    )
}

export default InfoServer
