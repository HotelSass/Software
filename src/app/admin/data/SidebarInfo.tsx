import { BiBed, BiBowlHot, BiBuildingHouse, BiCabinet, BiChart, BiCog, BiFork, BiWine } from "react-icons/bi";

export const  SidebarInfo={
   0:{
    icon:<BiBed/>,
    title:'Rooms',
    size:24,
    color:'#2442F8',
    location:'/admin/rooms'
   }
   ,1:{
    icon:<BiFork/>,
    title:'Restaurant',
    size:24,
    color:'#2442F8',
    location:'/admin/restaurant'
   }
   ,2:{
    icon:<BiBowlHot/>,
    title:'Menu',
    size:24,
    color:'#2442F8',
    location:'/admin/menu'
   }
   ,3:{
    icon:<BiWine/>,
    title:'Bar',
    size:24,
    color:'#2442F8',
    location:'/admin/bar'
   }
   ,4:{
    icon:<BiCabinet/>,
    title:'Inventory',
    size:24,
    color:'#2442F8',
    location:'/admin/inventory'
   }
   
};
export const  SettingSidebarInfo={
   
   0:{
    icon:<BiCog/>,
    title:'Settings',
    size:24,
    color:'#2442F8',
    location:'/admin/setting'
   }
};
