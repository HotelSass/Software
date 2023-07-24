import { BiBed, BiBowlHot, BiBuildingHouse, BiCabinet, BiChart, BiFork } from "react-icons/bi";
import {MdFoodBank} from "react-icons/md"

export const  UserSidebarInfo={
  
   0:{
    icon:<BiBed/>,
    title:'Rooms',
    size:24,
    color:'#2442F8',
    location:'/user/rooms'
   }
   ,1:{
    icon:<MdFoodBank/>,
    title:'Table',
    size:24,
    color:'#2442F8',
    location:'/user/table'
   }
   ,2:{
    icon:<BiFork/>,
    title:'Restaurant',
    size:24,
    color:'#2442F8',
    location:'/user/restaurant'
   }
   ,3:{
    icon:<BiBowlHot/>,
    title:'Menu',
    size:24,
    color:'#2442F8',
    location:'/user/menu'
   }
   ,4:{
    icon:<BiCabinet/>,
    title:'Inventory',
    size:24,
    color:'#2442F8',
    location:'/user/inventory'
   }
};
