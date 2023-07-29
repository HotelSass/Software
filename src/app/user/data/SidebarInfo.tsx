import { BiBed, BiBowlHot, BiBuildingHouse, BiCabinet, BiChart, BiFork,BiMoneyWithdraw,BiHistory,BiUserCheck,BiReceipt } from "react-icons/bi";
import { MdFoodBank } from "react-icons/md"

export const UserSidebarInfo = {

   0: {
      icon: <BiBed />,
      title: 'Rooms',
      size: 24,
      color: '#2442F8',
      location: '/user/rooms'
   }
   , 1: {
      icon: <MdFoodBank />,
      title: 'Table',
      size: 24,
      color: '#2442F8',
      location: '/user/table'
   }
   , 2: {
      icon: <BiFork />,
      title: 'Restaurant',
      size: 24,
      color: '#2442F8',
      location: '/user/restaurant'
   }
   , 3: {
      icon: <BiUserCheck />,
      title: 'CMS',
      size: 24,
      color: '#2442F8',
      location: '/user/cms'
   }
   , 4: {
      icon: <BiMoneyWithdraw />,
      title: 'Menu',
      size: 24,
      color: '#2442F8',
      location: '/user/finance'
   }
   , 5: {
      icon: <BiReceipt />,
      title: 'Purchase',
      size: 24,
      color: '#2442F8',
      location: '/user/purchase'
   }
   , 6: {
      icon: <BiHistory />,
      title: 'History',
      size: 24,
      color: '#2442F8',
      location: '/user/history'
   }
};
